// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./common/pages/auth/Login";
import Register from "./common/pages/auth/Registration";
import Home from "./nonAuth/landing/Home";
import Products from "./nonAuth/Products";
import ProductDetails from "./nonAuth/landing/ProductDetails";
import MainLayout from "./layout/MainLayout";
import Cart from "./nonAuth/Cart";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Routes without Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Routes with Navbar/Footer wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
