import { API_BASE_URL } from "./apiClient";

async function requestAuth(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
    body: JSON.stringify(payload),
  });
  
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data?.message || data?.error || "Authentication request failed.";
    throw new Error(message);
  }

  return data;
}

export function loginUser({ email, password }) {
  return requestAuth("/auth/login", { email, password });
}

export function registerUser({ name, email, password, role }) {
  return requestAuth("/auth/register", { name, email, password, role });
}
