import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/Routes";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import AdminDashboard from "./components/pages/AdminDashboard";

import "swiper/css";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
        <Navbar />

        <Routes>
          {/* Map through the routes array */}
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}

          {/* Admin dashboard route wrapped in ProtectedRoute */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
