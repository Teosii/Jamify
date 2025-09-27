import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  ShoppingCart,
  ArrowLeft,
  Trash2,
  Minus,
  Plus,
  Guitar,
} from "lucide-react";

const MySwal = withReactContent(Swal);

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // --- Theme setup ---
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // --- Load cart from cookie ---
  useEffect(() => {
    const savedCart = Cookies.get("guitarCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Ensure price is a number
        parsedCart.forEach(item => {
          item.price = Number(item.price);
          if (!item.quantity) item.quantity = 1;
        });
        setCartItems(parsedCart);
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // --- Save cart back to cookie ---
  const saveCart = (items) => {
    setCartItems(items);
    Cookies.set("guitarCart", JSON.stringify(items), { expires: 7 });
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = [...cartItems];
    updated[index].quantity = newQuantity;
    saveCart(updated);
  };

  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    saveCart(updated);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    MySwal.fire({
      icon: "success",
      title: <h2 className="text-2xl font-bold">Order Placed! 🎸</h2>,
      html: (
        <div className="text-left p-4">
          <p className="text-lg">
            Your payment of{" "}
            <span className="font-bold text-green-600 dark:text-green-400">
              ${subtotal.toFixed(2)}
            </span>{" "}
            was successful.
          </p>
        </div>
      ),
      confirmButtonText: "Return to Home",
      confirmButtonColor: "#4c1d95",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        saveCart([]); // Clear cart after checkout
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
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
              <p className="text-secondary mb-6">
                Looks like you haven't added any guitars to your cart yet.
              </p>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Guitar className="mr-2" /> Browse Guitars
              </a>
            </div>
          ) : (
            <>
              <div className="divide-y divide-secondary/20 dark:divide-secondary/40">
                {cartItems.map((item, index) => (
                  <div key={index} className="p-6 flex flex-col md:flex-row gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full md:w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 />
                        </button>
                      </div>
                      <p className="text-secondary mb-4">{item.type}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-secondary/30 rounded-lg">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            disabled={item.quantity === 1}
                            className="px-3 py-1 text-secondary hover:bg-secondary/10 disabled:opacity-50"
                          >
                            <Minus />
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="px-3 py-1 text-secondary hover:bg-secondary/10"
                          >
                            <Plus />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            ${Number(item.price).toFixed(2)}
                          </p>
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
                    className="flex-1 px-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold shadow-lg"
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
