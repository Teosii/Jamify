import React, { useState } from "react";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    strings: 6,
    price: 0,
    description: "",
    features: [],
    summary: "",
  });

  // Generic handleChange for most inputs
  const handleChange = (e, index = null) => {
    const { name, value, type } = e.target;

    // handle features array
    if (name === "features" && index !== null) {
      const newFeatures = [...formData.features];
      newFeatures[index] = value;
      setFormData({ ...formData, features: newFeatures });
    } else {
      // convert number inputs
      setFormData({
        ...formData,
        [name]: type === "number" ? Number(value) : value,
      });
    }
  };

  // add new feature field
  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.name || !formData.brand || !formData.type || !formData.price) {
      return alert("Please fill all required fields!");
    }

    try {
      const res = await fetch("http://localhost:5000/guitars", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add guitar");
      }

      alert("Guitar added successfully!");

      // reset form
      setFormData({
        name: "",
        brand: "",
        type: "",
        strings: 6,
        price: 0,
        description: "",
        features: [],
        summary: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Add a New Guitar
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Guitar Name / Model *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Brand *</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select type</option>
              <option value="electric">Electric</option>
              <option value="acoustic">Acoustic</option>
              <option value="bass">Bass</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Strings</label>
            <input
              type="number"
              name="strings"
              value={formData.strings}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              min="4"
              max="12"
            />
          </div>

          <div>
            <label className="block mb-2">Features</label>
            {formData.features.map((feature, idx) => (
              <input
                key={idx}
                type="text"
                name="features"
                value={feature}
                onChange={(e) => handleChange(e, idx)}
                className="w-full border p-2 rounded mb-2"
                placeholder="e.g., Maple neck, Humbucker pickups"
              />
            ))}
            <button
              type="button"
              onClick={addFeatureField}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Add Feature
            </button>
          </div>

          <div>
            <label className="block mb-2">Summary</label>
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Short summary of the guitar"
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full border p-2 rounded"
              placeholder="Describe the guitar features in detail"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Add Guitar
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminDashboard;
