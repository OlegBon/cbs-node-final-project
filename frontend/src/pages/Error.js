import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="container">
      <h1>404 - Сторінка не знайдена</h1>
      <p>Вибачте, сторінка, яку ви шукаєте, не існує.</p>
      <Link to="/">Повернутися на головну</Link>
    </div>
  );
};

export default Error;
