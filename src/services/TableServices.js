// src/services/TableService.js
const API = process.env.REACT_APP_API_URL;

export const fetchTables = async (token) => {
  const res = await fetch(`${API}/admin/tables`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const createTable = async (data, token) => {
  const res = await fetch(`${API}/admin/tables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateTable = async (id, data, token) => {
  const res = await fetch(`${API}/admin/tables/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};
