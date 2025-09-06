import React from "react";
import { Link } from "react-router-dom";
import { guitars } from "../data";

const AcousticGuitars = () => {
  const acousticGuitars = guitars.filter((g) => g.type === "Acoustic");

  return (
    <section className="bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Acoustic Guitars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {acousticGuitars.map((guitar) => (
            <Link
              key={guitar.id}
              to={`/guitars/${guitar.id}`}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={guitar.image}
                alt={guitar.name}
                className="h-64 object-contain mb-4"
              />

              <h3 className="text-md font-medium text-gray-800 text-center">
                {guitar.name}
              </h3>

              {/* Price */}
              {guitar.price && (
                <p className="text-lg font-bold text-black-500 mt-2">
                  {guitar.price}
                </p>
              )}

              {/* Tag */}
              {guitar.tag && (
                <span className="mt-2 inline-block text-xs bg-purple-600 text-white px-3 py-1 rounded-full">
                  {guitar.tag}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcousticGuitars;
