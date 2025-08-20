import React, { useState } from "react";
import {
  FaSearch,
  FaBars,
  FaShoppingCart,
  FaPlusCircle,
  FaSlidersH,
  FaTree,
  FaRulerVertical,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const HeroSection = () => {
  const [selectedColor, setSelectedColor] = useState("white");
  const colors = ["white", "bg-red-200", "bg-amber-100", "bg-gray-800"];

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
        {/* Left */}
        <div className="md:w-1/2 space-y-6 z-10">
          <p className="uppercase text-gray-500 tracking-wider text-sm font-medium">
            American Original Series
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            <span className="text-red-600">60's</span> Jazzmaster
          </h1>
          <p className="text-gray-600 max-w-md">
            The Fender Jazzmaster combines vintage style with modern
            playability. Experience the iconic offset waist design and versatile
            dual-circuit electronics.
          </p>

          <div className="flex space-x-4 pt-2">
            <button className="bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-200">
              Shop Now
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              Learn More
            </button>
          </div>

          <div className="flex space-x-2 pt-8">
            <span className="w-8 h-[2px] bg-red-600"></span>
            <span className="w-8 h-[2px] bg-gray-300 hover:bg-gray-400 cursor-pointer"></span>
            <span className="w-8 h-[2px] bg-gray-300 hover:bg-gray-400 cursor-pointer"></span>
          </div>

          {/* Colors */}
          <div className="pt-8">
            <p className="text-sm text-gray-500 mb-2">AVAILABLE COLORS</p>
            <div className="flex space-x-3">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className={`color-option w-8 h-8 rounded-full cursor-pointer border-2 ${
                    selectedColor === color
                      ? "border-red-600"
                      : "border-transparent"
                  } ${color}`}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="md:w-1/2 relative flex justify-center mt-16 md:mt-0 guitar-container">
          <img
            src="data:image/jpeg;base64,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"
            alt="Fender Jazzmaster"
            className="max-w-md md:max-w-lg guitar-shadow floating"
          />

          {/* Feature Labels */}
          <div className="absolute top-[15%] left-[60%] feature-label">
            <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs font-medium text-gray-700">
                3 Colors Available
              </span>
            </div>
          </div>

          <div className="absolute top-[35%] left-[70%] feature-label">
            <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <FaSlidersH className="text-red-500 text-xs" />
              <span className="text-xs font-medium text-gray-700">
                Rhythm Circuit
              </span>
            </div>
          </div>

          <div className="absolute bottom-[35%] left-[55%] feature-label">
            <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <FaTree className="text-red-500 text-xs" />
              <span className="text-xs font-medium text-gray-700">
                Alder Body
              </span>
            </div>
          </div>

          <div className="absolute bottom-[20%] right-[10%] feature-label">
            <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <FaRulerVertical className="text-red-500 text-xs" />
              <span className="text-xs font-medium text-gray-700">
                25.5" Scale
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-red-100 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
};
export default HeroSection;
