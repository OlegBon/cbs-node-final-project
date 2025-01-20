import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearUser } from "../data/reducers/userSlice";
import { setMessage } from "../data/reducers/messageSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Виконуємо запит до серверу
        await axios.post(`${process.env.REACT_APP_API_URL}/logout`);
        // Видаляємо токен з локального сховища
        localStorage.removeItem("jwtToken");
        // Очищаємо стан користувача
        dispatch(clearUser());
        dispatch(setMessage("Ви успішно вийшли."));
        // Перенаправляємо на головну сторінку
        navigate("/");
      } catch (error) {
        dispatch(setMessage("Помилка під час виходу."));
      }
    };

    logoutUser();
  }, [dispatch, navigate]);

  return <div className="container">Вихід виконується...</div>;
};

export default Logout;
