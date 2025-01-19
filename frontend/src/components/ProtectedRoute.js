import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { setUser, clearUser } from "../data/reducers/userSlice";

const ProtectedRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/session`,
          { withCredentials: true }
        );
        dispatch(setUser(response.data));
      } catch (error) {
        dispatch(clearUser());
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
