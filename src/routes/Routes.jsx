import { Navigate } from "react-router-dom";

import ElectricGuitars from "../components/pages/ElectricGuitars";
import AcousticGuitars from "../components/pages/AcousticGuitars";
import GuitarDetail from "../components/pages/GuitarDetail";
import Basses from "../components/pages/Basses";
import Learn from "../components/pages/Learn";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import { Footer, Newsletter } from "../components/Footer";

export const routes = [
  {
    path: "/",
    element: [
      <HeroSection />,
      <FeaturedProducts />,
      <Newsletter />,
      <Footer />,
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
    element: <Learn/>,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
