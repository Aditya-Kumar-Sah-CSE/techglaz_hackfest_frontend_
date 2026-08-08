const defaultApiBaseUrl ="http://localhost:5000/api";

const configuredApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl;

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/$/, "").endsWith("/api")
  ? configuredApiBaseUrl.replace(/\/$/, "")
  : `${configuredApiBaseUrl.replace(/\/$/, "")}/api`;

export const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

function getAuthToken() {
  return (
    localStorage.getItem("guardianai-token") || localStorage.getItem("token")
  );
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

export async function apiRequest(path, options = {}) {
  const { body, auth = false, headers = {}, ...requestOptions } = options;
  const requestHeaders = {
    "ngrok-skip-browser-warning": "69420",
    ...headers,
  };

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getAuthToken();
    if (token) requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: requestHeaders,
    body:
      body === undefined || body instanceof FormData
        ? body
        : JSON.stringify(body),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data?.message || data?.error || "API request failed.";
    throw new Error(message);
  }

  return data;
}

export function unwrapList(data, key) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.[key])) return data.data[key];
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

export function unwrapObject(data, key) {
  if (data?.[key] && typeof data[key] === "object") return data[key];
  if (data?.data?.[key] && typeof data.data[key] === "object") {
    return data.data[key];
  }
  if (data?.data && typeof data.data === "object") return data.data;
  return data && typeof data === "object" ? data : {};
}
