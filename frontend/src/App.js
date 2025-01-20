import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, clearUser } from "./data/reducers/userSlice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.log("Token not found");
        dispatch(clearUser());
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/verify-token`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(setUser(response.data));
      } catch (error) {
        console.log("Token verification failed:", error);
        dispatch(clearUser());
      }
    };

    checkToken();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={
          <div>
            {user ? (
              <>
                <div className="container">
                  <p>
                    Welcome, {user.name} ({user.email})!
                  </p>
                  <div>
                    <Link to="/users">Users</Link> |{" "}
                    <Link to="/logout">Logout</Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container">
                  <h3>
                    Please <Link to="/login">Login</Link> or{" "}
                    <Link to="/register">Register</Link>.
                  </h3>
                </div>
              </>
            )}
          </div>
        }
      />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

export default App;
