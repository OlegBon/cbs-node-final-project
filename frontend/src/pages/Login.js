import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../data/reducers/userSlice";
import { setMessage } from "../data/reducers/messageSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) => state.message);

  useEffect(() => {
    // Очищення повідомлення при заході на сторінку логіну
    dispatch(setMessage(""));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { email, password }
      );
      localStorage.setItem("jwtToken", response.data.token);
      dispatch(setUser({ name: response.data.name, email }));
      dispatch(setMessage("Login successful"));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(setMessage("Invalid email or password"));
      } else {
        dispatch(setMessage("Login failed"));
      }
    }
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="container">{message && <p>{message}</p>}</div>
    </div>
  );
};

export default Login;
