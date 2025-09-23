import { Navigate } from "react-router-dom";

import ElectricGuitars from "../components/pages/ElectricGuitars";
import AcousticGuitars from "../components/pages/AcousticGuitars";
import GuitarDetail from "../components/pages/GuitarDetail";
import Basses from "../components/pages/Basses";
import LearnPage from "../components/pages/LearnPage"
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import { Footer, Newsletter } from "../components/Footer";
import Login from "../components/pages/Login";
import Signup from "../components/pages/Signup";
import ShoppingCart from "../components/pages/ShoppingCart";

export const routes = [
  {
    path: "/",
    element: [
      <>
      <HeroSection />,
      <FeaturedProducts />,
      <Newsletter />,
      <Footer />,
      </>
    ],
  },
  {
    path: "/electric-guitars",
    element: <ElectricGuitars />,
  },
    {
    path: "/guitars/:id",
    element: <GuitarDetail />,
  },
  {
    path: "/acoustic-guitars",
    element: <AcousticGuitars />,
  },
  {
    path: "/basses",
    element: <Basses />,
  },
  {
    path: "/learn",
    element: <LearnPage/>,
  },
    {
    path: "/shoppingCart",
    element: <ShoppingCart/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Signup",
    element: <Signup/>
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
];
