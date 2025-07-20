import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export default function PublicRoute() {
  const { isAuthenticated, loading, isAdmin } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin/users" : "/products"} replace />;
  }
  
  return <Outlet />;
} 