# 🛒 GadgetGrid - E-Commerce Platform

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

GadgetGrid is a modern, full-stack e-commerce web application built for seamless gadget shopping. It features a stunning user interface, robust authentication, an advanced admin dashboard, and a fully functional shopping cart and checkout system.

## ✨ Key Features

### 🛍️ For Users
- **Modern UI/UX**: Built with Tailwind CSS and Next.js App Router for blazing fast performance.
- **Product Browsing & Filtering**: Browse products by category, view detailed specifications, and read reviews.
- **Shopping Cart**: Real-time cart management with context-based state.
- **Secure Authentication**: User login and registration powered by NextAuth.
- **User Dashboard**: Track orders, view order history, and monitor spending.

### ⚙️ For Admins
- **Admin Dashboard**: Comprehensive overview of total sales, active users, and recent orders.
- **Product Management**: Add, edit, and delete products easily from the dashboard.
- **Order Management**: View and update order statuses.
- **Sales Analytics**: Visual representation of monthly sales using Recharts.

## 🛠️ Technologies Used

- **Frontend**: Next.js 15+, React 19, Tailwind CSS v4, Lucide React (Icons)
- **Backend**: Next.js API Routes, NextAuth (Authentication)
- **Database**: MongoDB, Mongoose
- **Others**: Recharts (Data Visualization), Sonner (Toast Notifications)

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/sanoyon211/GadgetGrid.git
cd GadgetGrid
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
```
> **Note**: You can generate a random secret key using `openssl rand -base64 32`.

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.


