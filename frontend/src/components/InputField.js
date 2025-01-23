import React from "react";

const InputField = ({ type, value, onChange, placeholder, required }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default InputField;
