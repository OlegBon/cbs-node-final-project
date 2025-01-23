import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Logout from "../pages/Logout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await verifyToken(dispatch);
    };
    fetchData();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<WelcomeComponent user={user} />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<div>Сторінка не знайдена</div>} />
    </Routes>
  );
};

const WelcomeComponent = ({ user }) => (
  <div>
    {user ? (
      <div className="container">
        <p>
          Ласкаво просимо, {user.name} ({user.email})!
        </p>
        <div>
          <Link to="/users">Користувачі</Link> | <Link to="/logout">Вийти</Link>
        </div>
      </div>
    ) : (
      <div className="container">
        <h3>
          Будь ласка, <Link to="/login">увійдіть</Link> або{" "}
          <Link to="/register">зареєструйтеся</Link>
        </h3>
      </div>
    )}
  </div>
);

export default AppRoutes;
