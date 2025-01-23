import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../data/reducers/userSlice";
import { setMessage } from "../data/reducers/messageSlice";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

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
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password }
      );
      localStorage.setItem("jwtToken", response.data.token);
      dispatch(setUser({ name: response.data.name, email }));
      dispatch(setMessage("Успішний вхід"));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(setMessage("Невірний email або пароль"));
      } else {
        dispatch(setMessage("Не вдалося увійти"));
      }
    }
  };

  return (
    <div>
      <div className="container">
        <Link to="/">На головну</Link>
      </div>
      <form className="container" onSubmit={handleSubmit}>
        <InputField
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
          required
        />
        <InputField
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Пароль"
          required
        />
        <button type="submit">Увійти</button>
      </form>
      <div className="container">{message && <p>{message}</p>}</div>
    </div>
  );
};

export default Login;
