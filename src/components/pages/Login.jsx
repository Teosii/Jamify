import React, { useState } from "react";
import { GiGuitarHead } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.includes("@") || password.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Invalid Input ⚠️",
      text: "Please enter a valid email and password (min 6 characters).",
      confirmButtonColor: "#ef4444",
    });
    return;
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    Swal.fire({
      icon: "success",
      title: `Welcome back, ${data.user.name}! 🎸`,
      timer: 2000,
      showConfirmButton: false,
    });

    // Redirect based on role
    if (data.user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/shop");
    }
  } catch (err) {
    console.error("Login error:", err);
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: err.message,
    });
  }
};


  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/guitar-bg.jpg')" }}
    >
      <div className="bg-white/95 p-8 rounded-3xl shadow-xl w-full max-w-md backdrop-blur-md">
        <div className="flex items-center justify-center mb-6">
          <GiGuitarHead className="text-red-500 text-4xl mr-2" />
          <h2 className="text-3xl font-bold text-gray-800">Jamify Log in</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none shadow-sm"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition font-semibold shadow-md"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/Signup" className="text-red-500 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
