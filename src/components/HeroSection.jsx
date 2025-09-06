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
  const colors = ["bg-orange-800", "bg-amber-100", "bg-red-800", "bg-blue-800"];

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
        {/* Left */}
        <div className="md:w-1/2 space-y-6 z-10">
          <p className="uppercase text-gray-500 tracking-wider text-sm font-medium">
            American Original Series
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            <span className="text-red-600">50's</span> Stratocaster
          </h1>
          <p className="text-gray-600 max-w-md">
          The Fender® Stratocaster® was light years ahead of its contemporaries when it was introduced in 1954, instantly becoming a timeless classic with its ergonomically contoured double-cutaway body, versatile triple pickup configuration and inventive spring-loaded tremolo bridge.
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
            src="https://www.fender.com/cdn-cgi/image/format=auto,resize=height=auto,width=1500/https://www.fmicassets.com/Damroot/eCommPNG/10075/0266240500_fen_ins_frt_1_rr.png"
            alt="Standard Stratocaster" 
            className="max-w-md md:max-w-lg guitar-shadow floating"
          />

          {/* Feature Labels */}
          <div className="absolute top-[15%] left-[60%] feature-label">
            <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs font-medium text-gray-700">
                4 Colors Available
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
