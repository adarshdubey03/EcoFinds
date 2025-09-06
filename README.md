EcoFinds 🌿

EcoFinds is a modern, eco-friendly marketplace built with Next.js. Users can browse, buy, and sell eco-friendly products with a clean, responsive UI and client-side state management.

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


Create a .env.local file in the root directory and add:

MONGODB_URI=your-mongodb-connection-string


Replace your-mongodb-connection-string with your MongoDB Atlas URI.

Generate a secret with:

openssl rand -base64 32


Run the development server

npm run dev


Open http://localhost:3000
 in your browser.

👥 Team Members

Adarsh Dubey – Frontend & Backend

Rohit Prajapat – Frontend

Yashvi Agarwal – Frontend

Hiteshwari Patel – Frontend
