import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Forest from "./components/Forest/Forest";
import OthersTree from "./components/Profile/OthersTree";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";
import { fetchTrees, fetchUsers } from "./actions/treeActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {

  const dispatch = useDispatch();
  const treesLoaded = useSelector(state => Object.keys(state.entities.trees.trees).length > 0);
  const usersLoaded = useSelector(state => Object.keys(state.entities.trees.users).length > 0);

  useEffect(() => {
    if (!treesLoaded) {
      dispatch(fetchTrees());
    }
    if (!usersLoaded) {
      dispatch(fetchUsers());
    }
  }, [dispatch, treesLoaded, usersLoaded]);
  
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
