import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../data/reducers/messageSlice";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { registerUser } from "../utils/registerUser";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Очищення повідомлення при заході на сторінку реєстрації
    dispatch(setMessage(""));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, dispatch, navigate);
  };

  return (
    <>
      <div className="container">
        <Link to="/">На головну</Link>
      </div>
      <form className="container" onSubmit={handleSubmit}>
        <InputField
          type="text"
          value={name}
          onChange={setName}
          placeholder="Ім'я"
          required
        />
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
        <button type="submit">Зареєструватись</button>
      </form>
    </>
  );
};

export default Register;
