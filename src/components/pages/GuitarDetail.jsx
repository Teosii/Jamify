// pages/GuitarDetail.tsx
import { useParams } from "react-router-dom";
import { guitars } from "../data";

const GuitarDetail = () => {
  const { id } = useParams();
  const guitar = guitars.find((g) => g.id === Number(id));

  if (!guitar) {
    return <p className="text-center text-gray-500">Guitar not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <img src={guitar.image} alt={guitar.name} className="w-full h-96 object-contain mb-6" />
      <h2 className="text-3xl font-bold mb-2">{guitar.name}</h2>
      <p className="text-lg text-gray-600 mb-4">{guitar.type} Guitar</p>
      <p className="text-xl font-semibold text-gray-800 mb-6">{guitar.price}</p>
      <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
        Buy Now
      </button>
    </div>
  );
};

export default GuitarDetail;
