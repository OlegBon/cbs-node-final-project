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
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users`,
          { withCredentials: true }
        );
        dispatch(setUsers(response.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(clearUser());
        }
        dispatch(setMessage("Failed to fetch users"));
      }
    };

    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/"); // Перенаправлення на головну сторінку, якщо користувач не залогінений
    }
  }, [user, navigate]);

  const handleClear = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/clear`,
        {},
        { withCredentials: true }
      );
      dispatch(setUsers([])); // Очищаємо список користувачів у Redux

      // Логаут користувача так само як у компоненті Logout.js
      await axios.post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(clearUser());
      dispatch(setMessage("Logged out successfully"));
    } catch (error) {
      console.error("There was an error clearing the database!", error);
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
