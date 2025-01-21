import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../data/reducers/usersSlice";
import { setMessage } from "../data/reducers/messageSlice";
import { clearUser } from "../data/reducers/userSlice";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("Token not found");
        dispatch(setMessage("Token not found"));
        navigate("/"); // Оновлено на головну, якщо токен не знайдено
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(setUsers(response.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access:", error);
          dispatch(clearUser());
          dispatch(setMessage("Unauthorized access, please login again"));
          navigate("/login"); // Перенаправлення на сторінку входу
        } else {
          console.error("Failed to fetch users:", error);
          dispatch(setMessage("Failed to fetch users"));
          navigate("/login"); // Перенаправлення на сторінку входу
        }
      }
    };

    fetchUsers();
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`);
      localStorage.removeItem("jwtToken");
      dispatch(clearUser());
      dispatch(setMessage("Ви успішно вийшли"));
      navigate("/"); // Перенаправляє на головну сторінку
      window.location.reload(); // Перезавантажує сторінку
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(setMessage("Помилка під час виходу"));
    }
  };

  const handleClear = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("Token not found");
      dispatch(setMessage("Token not found"));
      navigate("/"); // Перенаправлення на головну, якщо токен не знайдено
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/clear`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Database cleared successfully");
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
      console.error("Error clearing the database:", error);
      dispatch(setMessage("Failed to clear database"));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("uk-UA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(",", "");
  };

  return (
    <div className="container">
      <h1>Users</h1>
      {user && (
        <p>
          Hi, {user.name} ({user.email})!
        </p>
      )}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleClear}>Clear Database</button>
      {users.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email} -{" "}
              {formatDate(user.updatedAt)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
