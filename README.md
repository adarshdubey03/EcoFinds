EcoFinds 🌿

Problem Statement

EcoFinds – Sustainable Second-Hand Marketplace

EcoFinds is a modern, eco-friendly marketplace built with Next.js. Users can browse, buy, and sell eco-friendly products with a clean, responsive UI and client-side state management.

## 🎥 Demo Video

Watch the walkthrough: [EcoFinds Demo (Loom)](https://www.loom.com/share/89eb30f1297e4eea8735da54cb55c942)


🚀 Features

User authentication (Login/Signup)

Browse eco-friendly products with search

Add and manage your own products

Cart system with item quantity tracking

Purchases dashboard

Responsive mobile-first design with dynamic Navbar

🛠 Tech Stack

Frontend: Next.js 14, React, TypeScript

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Styling & Animations: TailwindCSS, Framer Motion, Google Fonts (Geist & Geist Mono)

Icons: Lucide-React

State Management: React Context API (CartContext, AuthContext)

💻 Setup

Clone the repo

git clone https://github.com/adarshdubey03/ecofinds.git

cd ecofinds


Install dependencies

npm install


Create a .env.local file in the root directory and add the following:

MONGODB_URI=your-mongodb-connection-string

JWT_SECRET=your-jwt-secret


Replace your-mongodb-connection-string with your MongoDB Atlas URI or MongoDB Compass URI.

Replace your-jwt-secret with a secure random string. You can generate one with Node.js or OpenSSL:

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OR OpenSSL
openssl rand -base64 32


Run the development server

npm run dev


Open your browser

http://localhost:3000


👥 Team Members

Adarsh Dubey – Frontend & Backend

Rohit Prajapat – Frontend

Yashvi Agarwal – Frontend

Hiteshwari Patel – Frontend
