import axios from "axios";
import { setUser } from "../data/reducers/userSlice";
import { setMessage } from "../data/reducers/messageSlice";

export const registerUser = async (
  name,
  email,
  password,
  dispatch,
  navigate
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      { name, email, password }
    );
    console.log("Відповідь на реєстрацію:", response.data); // Додамо логування
    localStorage.setItem("jwtToken", response.data.token);
    dispatch(setUser({ name, email }));
    dispatch(setMessage("Користувача успішно зареєстровано"));
    navigate("/users");
  } catch (error) {
    console.error("Помилка реєстрації:", error); // Додамо логування
    dispatch(setMessage("Не вдалося зареєструватись"));
  }
};
