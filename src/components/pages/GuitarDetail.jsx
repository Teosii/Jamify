import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { guitars } from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Footer } from "../Footer";
import formatPrice from "../../utils/formatPrice";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BsShieldCheck, BsTruck, BsArrowRepeat } from "react-icons/bs";
import { HiOutlineSupport } from "react-icons/hi";

const GuitarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const guitar = guitars.find((g) => g.id === Number(id));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status via /me endpoint
    fetch("http://localhost:5000/me", {
      method: "GET",
      credentials: "include", // send cookies
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          Swal.fire({
            icon: "warning",
            title: "Login required",
            text: "Please log in to view guitar details.",
            confirmButtonText: "Go to Login",
          }).then(() => navigate("/login"));
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Could not verify login status.",
        });
      });
  }, [navigate]);

  if (!guitar)
    return <p className="text-center text-gray-500">Guitar not found.</p>;

  const recommended = guitars.filter(
    (g) => g.type === guitar.type && g.id !== guitar.id
  );

  const handleBuyNow = () => {
    const savedCart = Cookies.get("guitarCart");
    let cart = [];

    if (savedCart) {
      try {
        cart = JSON.parse(savedCart); // parse existing cart
      } catch {
        cart = [];
      }
    }

    const existingIndex = cart.findIndex((item) => item.id === guitar.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: guitar.id,
        name: guitar.name,
        type: guitar.type,
        price: Number(guitar.price), // ensure price is a number
        image: guitar.images[0],
        quantity: 1,
      });
    }

    Cookies.set("guitarCart", JSON.stringify(cart), { expires: 7 }); // ✅ save to cookie

    Swal.fire({
      icon: "success",
      title: "Added to cart!",
      text: `${guitar.name} has been added to your cart.`,
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/shoppingCart");
  };

  return (
    <>
      <div className="w-100 h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="h-100 bg-gray-50 flex items-center justify-center">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="w-full h-full"
          >
            {guitar.images.slice(1).map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`${guitar.name} ${index + 2}`}
                  className="w-100 h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col pt-20 px-20">
          <h2 className="text-4xl font-bold mb-5">{guitar.name}</h2>
          <p className="text-xl text-gray-600 mb-2">{guitar.type} Guitar</p>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            {formatPrice(guitar.price)}
          </p>

          {guitar.features && (
            <ul className="mb-6 space-y-2 list-disc list-inside text-gray-700">
              {guitar.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}

          <button
            onClick={handleBuyNow}
            className="px-8 py-4 rounded-lg transition w-fit font-semibold bg-black text-white hover:bg-gray-800"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="px-5 md:px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {guitar.summary && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Summary</h3>
            <p className="text-gray-700 leading-relaxed whitespace-normal break-words max-w-2xl">
              {guitar.summary}
            </p>
          </div>
        )}

        <div>
          <h3 className="text-2xl font-bold mb-5">Shipping & Returns</h3>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-1">Shipping</h4>
            <p className="text-gray-600">
              Free shipping on orders{" "}
              <span className="font-medium">$1500+</span>.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-1">Returns</h4>
            <p className="text-gray-600">
              Return or exchange your purchase within{" "}
              <span className="font-medium">30 days</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 py-10">
        <h3 className="text-2xl font-bold mb-6">You May Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommended.map((rec) => (
            <Link
              to={`/guitars/${rec.id}`}
              key={rec.id}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition block"
            >
              <img
                src={rec.images?.[0] || "/fallback.jpg"}
                alt={rec.name}
                className="w-full h-60 object-contain mb-4"
              />
              <h4 className="font-semibold text-lg">{rec.name}</h4>
              <p className="text-sm text-gray-500">{rec.type} Guitar</p>
              <p className="text-md font-bold text-gray-800 mt-2">
                {formatPrice(rec.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center py-20">
        <div className="flex flex-col items-center text-center w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
          <BsShieldCheck className="w-10 h-10 mb-4 text-gray-700" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Fender-certified</span> high quality
            assurance.
          </p>
        </div>
        <div className="flex flex-col items-center text-center w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
          <BsTruck className="w-10 h-10 mb-4 text-gray-700" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Free standard shipping</span> on all
            orders over $0.
          </p>
        </div>
        <div className="flex flex-col items-center text-center w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
          <BsArrowRepeat className="w-10 h-10 mb-4 text-gray-700" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Easy returns & exchanges</span>{" "}
            within 30 days.
          </p>
        </div>
        <div className="flex flex-col items-center text-center w-1/2 md:w-1/4 px-2">
          <HiOutlineSupport className="w-10 h-10 mb-4 text-gray-700" />
          <p className="text-sm text-gray-600">
            Get{" "}
            <span className="font-semibold">
              support from our expert gear advisors
            </span>
            .
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GuitarDetail;
