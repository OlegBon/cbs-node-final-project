import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../data/reducers/userSlice';
import { setMessage } from '../data/reducers/messageSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true });
        dispatch(clearUser());
        dispatch(setMessage('Logged out successfully'));
        navigate('/');
      } catch (error) {
        dispatch(setMessage('Logout failed'));
      }
    };
    logoutUser();
  }, [dispatch, navigate]);

  return <div className="container">Logging out...</div>;
};

export default Logout;
