import axios from "axios";
import { setUsers } from "../data/reducers/usersSlice";
import { setMessage } from "../data/reducers/messageSlice";
import { clearUser } from "../data/reducers/userSlice";

export const fetchUsers = async (dispatch, navigate) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.error("Токен не знайдено");
    dispatch(setMessage("Токен не знайдено"));
    navigate("/"); // Оновлено на головну, якщо токен не знайдено
    return;
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setUsers(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Несанкціонований доступ:", error);
      dispatch(clearUser());
      dispatch(
        setMessage("Несанкціонований доступ, будь ласка, увійдіть знову")
      );
      navigate("/login"); // Перенаправлення на сторінку входу
    } else {
      console.error("Не вдалося отримати користувачів:", error);
      dispatch(setMessage("Не вдалося отримати користувачів"));
      navigate("/login"); // Перенаправлення на сторінку входу
    }
  }
};
