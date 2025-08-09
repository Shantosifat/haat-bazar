# 🛍 HaatBazar

A modern full-stack **local marketplace platform** where vendors can list products, customers can purchase securely, and admins can manage the entire ecosystem.  
Built with the **MERN stack** and designed to be **fast, scalable, and user-friendly**.

---

## 🚀 Live Demo
🔗 **Live Site:** [https://kachabazaar-app.web.app/]
🔗 **GitHub Repository:** [https://github.com/Shantosifat/haat-bazar]

---



## 🛠 Technologies Used

### **Frontend**
- ⚛️ React.js
- 🎨 Tailwind CSS + DaisyUI
- 🎭 Framer Motion
- 📊 Recharts
- 🔄 React Query
- 🔐 Firebase Auth

### **Backend**
- 🟢 Node.js + Express.js
- 🍃 MongoDB
- 🔐 JWT Authentication
- 💳 Stripe Payment Gateway
- 🔑 Firebase Admin SDK

---

## ✨ Core Features
- 🔐 **Authentication & Authorization** (Firebase + JWT)
- 🛒 **Product Management** (add, update, delete, search, filter)
- 💳 **Secure Stripe Payments**
- 📢 **Vendor Advertisements**
- 📊 **Price Tracking & Analytics** (Recharts)
- 🗂 **Admin Dashboard** (manage users, vendors, products)
- 📱 **Fully Responsive UI**

---

## 📦 Dependencies

**Frontend**

"axios", "react", "react-dom", "react-router-dom", "react-query",
"tailwindcss", "daisyui", "framer-motion", "recharts",
"@stripe/react-stripe-js", "@stripe/stripe-js", "firebase"

**BAckend**

"express", "cors", "dotenv", "jsonwebtoken", "stripe",
"mongodb", "cookie-parser", "firebase-admin"

## Steps to run locally

1. Clone the repository 

2. Install frontend dependencies – cd client && npm install

3. Install backend dependencies – cd ../server && npm install

4. Create .env file for client – Add VITE_apiUrl and Firebase keys

5. Create .env file for server – Add PORT, MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY

6. Run backend – cd server && npm run dev

7. Run frontend – cd ../client && npm run dev

8. Open in browser – http://localhost:5173
