import { useParams } from "react-router-dom";
import { guitars } from "../data";

// Import Swiper React components + modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import react-icons
import { BsShieldCheck, BsTruck, BsArrowRepeat } from "react-icons/bs";
import { HiOutlineSupport } from "react-icons/hi"; // valid

const GuitarDetail = () => {
  const { id } = useParams();
  const guitar = guitars.find((g) => g.id === Number(id));

  if (!guitar) {
    return <p className="text-center text-gray-500">Guitar not found.</p>;
  }

  return (
    <div className="w-100 h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT: Image slider */}
      <div className="h-100 bg-gray-50 flex items-center justify-center">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          initialSlide={1}
          modules={[Navigation, Pagination]}
          className="w-full h-full"
        >
          {guitar.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${guitar.name} ${index + 1}`}
                className="w-100 h-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT: Guitar details */}
      <div className="flex flex-col pt-10 px-20">
        {/* Details Container */}
        <div>

        </div>
        <h2 className="text-4xl font-bold mb-4">{guitar.name}</h2>
        <p className="text-xl text-gray-600 mb-2">{guitar.type} Guitar</p>
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          {guitar.price}
        </p>

        {/* Dynamic info list above the button */}
        {guitar.features && guitar.features.length > 0 && (
          <ul className="mb-6 space-y-2 list-disc list-inside text-gray-700">
            {guitar.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}

        <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition w-fit">
          Buy Now
        </button>
      </div>

      {/* Features Section */}
      <div className="flex flex-wrap justify-between items-center py-10">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
          <BsShieldCheck className="w-10 h-10 mb-4 text-gray-700" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Fender-certified</span> high quality
            assurance.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
          <BsTruck className="w-10 h-10 mb-4 text-gray-700" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Free standard shipping</span> on all
            orders over $50.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
          <BsArrowRepeat className="w-10 h-10 mb-4 text-gray-700" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Easy returns & exchanges</span>{" "}
            within 30 days of receipt.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center text-center w-1/2 md:w-1/4 px-2">
          <HiOutlineSupport className="w-10 h-10 mb-4 text-gray-700" />
          <p className="text-sm text-gray-600">
            Get{" "}
            <span className="font-semibold">
              support from our expert gear advisors.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuitarDetail;
