import React, { useState } from "react";
import { GiGuitarHead } from "react-icons/gi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@") || password.length < 6) {
      setError("⚠️ Invalid email or password. Please try again!");
      return;
    }

    setError("");
    console.log("Logging in with:", { email, password });
    
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

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg border border-red-300 shadow">
            {error}
          </div>
        )}

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
          <a href="/Signup" className="text-red-500 font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

