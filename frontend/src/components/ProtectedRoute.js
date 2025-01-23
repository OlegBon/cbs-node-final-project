import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const isTokenValid = await verifyToken(dispatch);
      setLoading(!isTokenValid);
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Перевірка, чи є користувач
  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
