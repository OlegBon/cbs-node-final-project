import axios from "axios";
import { clearUser, setUser } from "../data/reducers/userSlice";

export const verifyToken = async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    dispatch(clearUser());
    return false;
  }
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/verify-token`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setUser(response.data));
    return true;
  } catch (error) {
    dispatch(clearUser());
    return false;
  }
};
