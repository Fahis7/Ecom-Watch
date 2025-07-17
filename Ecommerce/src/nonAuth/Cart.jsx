import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-ivory-50">
      <Navbar />
      <div className="w-[75%] mx-auto py-12">
        <h1 className="text-3xl font-serif mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-gold-500 font-bold">
                        ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 text-right">
              <p className="text-2xl font-semibold text-gray-800">
                Total: ₹{totalPrice}
              </p>
              <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gold-500 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
