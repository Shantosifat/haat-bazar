import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const setPromise = loadStripe(import.meta.env.VITE_payment_key)
const PaymentCard = () => {
    return (
        <Elements stripe={setPromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default PaymentCard;