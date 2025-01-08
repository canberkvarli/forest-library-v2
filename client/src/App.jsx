import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Forest from "./components/Forest/Forest";
import OthersTree from "./components/Profile/OthersTree";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Forest />} />

          {/* Protected Routes */}
          <Route path="/search" element={<ProtectedRoute element={Search} />} />
          <Route path="/users/:user_id" element={<ProtectedRoute element={OthersTree} />} />
          <Route path="/users/:user_id/profile" element={<ProtectedRoute element={Profile} />} />

          {/* Catch-All Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
