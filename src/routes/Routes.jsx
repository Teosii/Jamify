import { Navigate } from "react-router-dom";

import ElectricGuitars from "../components/pages/ElectricGuitars";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import {Footer, Newsletter} from "../components/Footer";

export const routes = [
    {
        path: "/",
        element: [
            <HeroSection/>,
            <FeaturedProducts/>,
            <Newsletter/>,
            <Footer/>
        ],
    },
    {
        path: "/electric-guitars",
        element: <ElectricGuitars />,
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
];
