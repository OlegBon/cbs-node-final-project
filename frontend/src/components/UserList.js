import React from "react";

const UserList = ({ users }) => {
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

  return users.length ? (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong> - {user.email} -{" "}
          {formatDate(user.updatedAt)}
        </li>
      ))}
    </ul>
  ) : (
    <p>Користувачі не знайдені.</p>
  );
};

export default UserList;
