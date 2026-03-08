const API_URL = "http://localhost:8000";

// Явно указываем тип возвращаемого значения для TS
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- АВТОРИЗАЦИЯ ---

export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Registration failed");
  return response.json();
};

export const loginUser = async (credentials: URLSearchParams) => {
  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: credentials,
  });
  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  localStorage.setItem("token", data.access_token);
  return data;
};

// --- ДЕДЛАЙНЫ ---

export const getDeadlines = async () => {
  const response = await fetch(`${API_URL}/deadlines`, {
    method: "GET",
    headers: getAuthHeader(), // Передаем объект напрямую
  });
  if (!response.ok) throw new Error("Failed to fetch deadlines");
  return response.json();
};

export const createDeadline = async (deadline: any) => {
  const response = await fetch(`${API_URL}/deadlines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(deadline),
  });
  if (!response.ok) throw new Error("Failed to create deadline");
  return response.json();
};
