import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/heder";
import Profile from "./pages/profile";
import Register from "./pages/register";

// Hot Toast
import { Toaster } from 'react-hot-toast';
import Verify from "./components/verify";
import Home from "./pages/home";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/Checkout";
import LoginPage from "./pages/login";
import MyAccount from "./pages/MyAccount";
import MyOrdersPage from "./pages/MyOrders";
import Cart from "./pages/Cart";
import About from "./pages/About";
import NotFound from "./components/404";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";

export default function App() {
  return (
    <BrowserRouter>
      <div className="body min-h-screen bg-gray-100 flex flex-col">
        <Header />

        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/profile" element={<MyAccount />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/orders" element={<MyOrdersPage />} />
            <Route path="/productDetails/:id" element={<ProductDetails/>} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </main>

        {/* Global Toaster */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              fontWeight: '500'
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#f87171',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}
