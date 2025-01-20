import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { clearUser, setUser } from "../data/reducers/userSlice";

const ProtectedRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        dispatch(clearUser());
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/verify-token`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setUser(response.data));
      } catch (error) {
        dispatch(clearUser());
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [dispatch]);

  if (loading) {
    return <div className="container">Перевірка доступу...</div>;
  }

  // Перевірка, чи є користувач
  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
