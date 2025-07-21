import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../pages/Shared/Loading";
import UseAuth from "../../hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { id: productId } = useParams();
  //   console.log(productId);
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const queryClient = useQueryClient();

  const location = useLocation();
  const forceRefresh = location.state?.forceRefresh;

  const { isPending, data: productData = {} } = useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist/${productId}`);
      return res.data;
    },
  });
  console.log(productData);
  const amount = productData.pricePerUnit;
  const amountinCents = amount * 100;
  if (isPending) {
    return <Loading></Loading>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    // step-1: validate the card(card thik ase ki na)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      setError("");
      console.log("payment method", paymentMethod);
      //step-2: create payment intent for db
      const res = await axiosSecure.post("/create-payment-intent", {
        amountinCents,
        currency: "৳",
      });

      // Confirm the payment on the client
      const clientSecret = res.data.clientSecret;

      // step-3: confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else {
        // Payment succeeded
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          toast.success("payment success");
          console.log(result);
          // step-4 :mark paid, also create payment history
          const paymentData = {
            productId,
            email: user.email,
            amount,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types,
          };
          const transactionId = result.paymentIntent.id;
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            const updatedOrder = paymentRes.data.updatedOrder;
            // ✅ Update cached data
            queryClient.setQueryData(["my-orders", user.email], (oldData) => {
              if (!oldData) return [];
              return oldData.map((order) =>
                order._id === updatedOrder._id ? updatedOrder : order
              );
            });
            await Swal.fire({
              icon: "success",
              title: "Payment Successful",
              html: `
    <p>Your payment has been recorded successfully!</p>
    <p><strong>Transaction ID:</strong> ${transactionId}</p>
  `,
              confirmButtonText: "Go to My orders",
            });
            // redirect to my parcels
            navigate("/dashboard/orders", { state: { forceRefresh: true } });
          }
        }
      }
      console.log(" res from intent", res);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-6 rounded-xl mt-10 max-w-md shadow-md w-full mx-auto"
      >
        <CardElement className="border p-3 rounded" />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!stripe}
        >
          Pay ৳{amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default PaymentForm;
