import React, { useEffect, useState } from "react";

export default function App() {
  const [guitars, setGuitars] = useState([]);
  const [form, setForm] = useState({ name: "", model: "", price: "", image_url: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGuitars();
  }, []);

  const fetchGuitars = async () => {
    try {
      const res = await fetch("http://localhost:5000/guitars");
      const data = await res.json();
      setGuitars(data);
    } catch (error) {
      console.error("Error fetching guitars:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`http://localhost:5000/guitars/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        setEditingId(null);
      } else {
        await fetch("http://localhost:5000/guitars", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
      }
      setForm({ name: "", model: "", price: "", image_url: "" });
      fetchGuitars();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (guitar) => {
    setForm(guitar);
    setEditingId(guitar.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/guitars/${id}`, {
        method: "DELETE",
      });
      fetchGuitars();
    } catch (error) {
      console.error("Error deleting guitar:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Guitar Management</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Guitar Name"
            className="w-full px-3 py-2 border rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Model"
            className="w-full px-3 py-2 border rounded-lg"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full px-3 py-2 border rounded-lg"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full px-3 py-2 border rounded-lg"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {editingId ? "Update Guitar" : "Add Guitar"}
          </button>
        </form>

        {/* Guitar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guitars.map((g) => (
            <div key={g.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img src={g.image_url} alt={g.name} className="h-40 object-contain" />
              <h2 className="text-lg font-bold mt-2">{g.name}</h2>
              <p className="text-gray-500">{g.model}</p>
              <p className="text-xl font-semibold mt-2">${g.price}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(g)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {guitars.length === 0 && (
            <p className="col-span-3 text-center text-gray-500">No guitars found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
