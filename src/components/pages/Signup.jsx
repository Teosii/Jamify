// src/components/pages/Signup.jsx
import React, { useState } from "react";
import { GiGuitarHead } from "react-icons/gi";
import { FaGoogle, FaFacebook, FaEnvelope } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@") || password.length < 6) {
      setError("⚠️ Invalid email or password. Please try again!");
      return;
    }
    if (password !== confirmPassword) {
      setError("⚠️ Passwords do not match!");
      return;
    }
    setError("");

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || data.message || "Signup failed.");
        return;
      }

      // Save token and user (auto-login)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/"); // redirect to home
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
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
          <h2 className="text-3xl font-bold text-gray-800">Jamify Sign Up</h2>
        </div>

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg border border-red-300 shadow">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-xl hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-xl hover:bg-gray-100 transition">
            <FaFacebook className="text-blue-600" /> Continue with Facebook
          </button>
          <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-xl hover:bg-gray-100 transition">
            <FaEnvelope className="text-gray-700" /> Continue with Email
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none shadow-sm"
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none shadow-sm"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition font-semibold shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/Login" className="text-red-500 font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

