import "./App.css";
import Login from "./common/pages/auth/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./common/pages/auth/Registration";
import Home from "./nonAuth/landing/Home";
import Products from "./nonAuth/Products";
import ProductDetails from "./nonAuth/landing/ProductDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
