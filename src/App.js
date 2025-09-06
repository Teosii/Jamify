import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/Routes";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
        <Navbar />
         
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}
