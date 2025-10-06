import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ShoppingCart, ArrowLeft, Trash2, Minus, Plus, Guitar } from "lucide-react";

const MySwal = withReactContent(Swal);

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // track logged-in user

  // --- Fetch current user ---
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/me", { withCredentials: true });
      setUser(res.data.user);
    } catch {
      setUser(null); // not logged in
    }
  };

  const fetchCart = async () => {
    if (!user) return; // prevent fetching cart if not logged in
    try {
      const res = await axios.get("http://localhost:5000/cart", { withCredentials: true });
      const mapped = res.data.cart.map((item) => {
        let img = "";
        if (Array.isArray(item.images)) img = item.images[0];
        else if (typeof item.images === "string") img = JSON.parse(item.images)[0];
        return { ...item, image: img };
      });
      setCartItems(mapped);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [user]);

  const updateQuantity = async (cartId, change) => {
    if (!user) return; // prevent action if not logged in
    const existingItem = cartItems.find((item) => item.id === cartId);
    if (!existingItem) return;
    const newQty = existingItem.quantity + change;
    if (newQty < 1) return;
    setCartItems((prev) => prev.map((item) => (item.id === cartId ? { ...item, quantity: newQty } : item)));
    try {
      await axios.put(`http://localhost:5000/cart/${cartId}`, { quantity: newQty }, { withCredentials: true });
    } catch {
      fetchCart(); // rollback
    }
  };

  const removeItem = async (cartId) => {
    if (!user) return;
    try {
      await axios.delete(`http://localhost:5000/cart/${cartId}`, { withCredentials: true });
      setCartItems((prev) => prev.filter((item) => item.id !== cartId));
    } catch (err) {
      console.error("Error removing item:", err);
      MySwal.fire({ icon: "error", title: "Could not remove item" });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      MySwal.fire({ icon: "warning", title: "Please log in to checkout" });
      return;
    }
    MySwal.fire({
      icon: "success",
      title: <h2 className="text-2xl font-bold">Order Placed! 🎸</h2>,
      html: (
        <div className="text-left p-4">
          <p className="text-lg">
            Your payment of <span className="font-bold text-green-600">${subtotal.toFixed(2)}</span> was successful.
          </p>
        </div>
      ),
      confirmButtonText: "Return to Home",
      confirmButtonColor: "#4c1d95",
      allowOutsideClick: false,
    }).then(() => {
      cartItems.forEach((item) => removeItem(item.id));
      window.location.href = "/";
    });
  };

  if (loading) return <p className="text-center mt-20">Loading cart...</p>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {!user && (
          <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow">
            You are not logged in. Please <a href="/login" className="text-yellow-600 underline">log in</a> to buy guitars.
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
          <a href="/" className="text-primary hover:underline flex items-center">
            <ArrowLeft className="mr-2" /> Continue Shopping
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-secondary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-secondary mb-6">Looks like you haven't added any guitars to your cart yet.</p>
              <a href="/" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                <Guitar className="mr-2" /> Browse Guitars
              </a>
            </div>
          ) : (
            <>
              <div className="divide-y divide-secondary/20 dark:divide-secondary/40">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col md:flex-row gap-6">
                    <img src={item.image} alt={item.name} className="w-full md:w-32 h-32 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className={`text-red-500 hover:text-red-700 ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={!user}
                        >
                          <Trash2 />
                        </button>
                      </div>
                      <p className="text-secondary mb-4">{item.type}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-secondary/30 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, -1)} disabled={!user || item.quantity === 1}><Minus /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} disabled={!user}><Plus /></button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">${Number(item.price).toFixed(2)}</p>
                          <p className="text-secondary">
                            Total: ${(Number(item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-secondary/20 dark:border-secondary/40">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Subtotal</span>
                  <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleCheckout}
                    disabled={!user}
                    className={`flex-1 px-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold shadow-lg ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Proceed to Checkout Now
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShoppingCartPage;
