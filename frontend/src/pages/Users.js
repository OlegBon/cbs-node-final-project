import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../utils/fetchUsers";
import { clearUser } from "../data/reducers/userSlice";
import { setMessage } from "../data/reducers/messageSlice";
import UserList from "../components/UserList";
import axios from "axios";
import { setUsers } from "../data/reducers/usersSlice";

const Users = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(dispatch, navigate);
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
      localStorage.removeItem("jwtToken");
      dispatch(clearUser());
      dispatch(setMessage("Ви успішно вийшли"));
      navigate("/"); // Перенаправляє на головну сторінку
      window.location.reload(); // Перезавантажує сторінку
    } catch (error) {
      console.error("Помилка виходу:", error);
      dispatch(setMessage("Помилка під час виходу"));
    }
  };

  const handleClear = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("Токен не знайдено");
      dispatch(setMessage("Токен не знайдено"));
      navigate("/"); // Перенаправлення на головну, якщо токен не знайдено
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/clear`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Базу даних успішно очищено");
      dispatch(setUsers([])); // Очищаємо список користувачів у Redux

      // Видаляємо токен із локального зберігання
      localStorage.removeItem("jwtToken");

      // Примусовий рефреш
      if (response.data.redirectTo) {
        navigate(response.data.redirectTo);
        window.location.reload(); // Примусове оновлення сторінки
      } else {
        navigate("/");
        window.location.reload(); // Примусове оновлення сторінки
      }
    } catch (error) {
      console.error("Помилка очищення бази даних:", error);
      dispatch(setMessage("Не вдалося очистити базу даних"));
    }
  };

  return (
    <div className="container">
      <h1>Користувачі</h1>
      {user && (
        <p>
          Вітаємо, {user.name} ({user.email})!
        </p>
      )}
      <button onClick={handleLogout}>Вийти</button>
      <button onClick={handleClear}>Очистити базу даних</button>
      <UserList users={users} />{" "}
      {/* Використання UserList для відображення списку користувачів */}
    </div>
  );
};

export default Users;
