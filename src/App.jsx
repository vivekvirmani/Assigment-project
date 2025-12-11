import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./components/Auth/AuthProvider";
import Login from "./components/Auth/Login";
import ProductList from "./components/Products/ProductList";

export default function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/products" /> : <Login />}
      />

      {/* Protected Route */}
      <Route
        path="/products"
        element={isLoggedIn ? <ProductList /> : <Navigate to="/" />}
      />

      {/* Fallback for invalid routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
