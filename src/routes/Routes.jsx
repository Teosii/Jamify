import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/pages/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

import ElectricGuitars from "../components/pages/ElectricGuitars";
import AcousticGuitars from "../components/pages/AcousticGuitars";
import GuitarDetail from "../components/pages/GuitarDetail";
import Basses from "../components/pages/Basses";
import LearnPage from "../components/pages/LearnPage";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import { Footer, Newsletter } from "../components/Footer";
import Login from "../components/pages/Login";
import Signup from "../components/pages/Signup";
import ShoppingCart from "../components/pages/ShoppingCart";
import AdminDashboard from "../components/pages/AdminDashboard";

// Wrapper to use the useAuth hook in the routes
const AdminRouteWrapper = ({ children }) => {
  const { user, loading } = useAuth();
  return (
    <ProtectedRoute user={user} requiredRole="admin" loading={loading}>
      {children}
    </ProtectedRoute>
  );
};

export const routes = [
  {
    path: "/",
    element: (
      <>
        <HeroSection />
        <FeaturedProducts />
        <Newsletter />
        <Footer />
      </>
    ),
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
    element: <LearnPage />,
  },
  {
    path: "/shoppingCart",
    element: <ShoppingCart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
