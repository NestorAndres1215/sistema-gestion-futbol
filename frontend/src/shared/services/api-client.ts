
export const API_URL = "https://localhost:7269/api";

const request = async (url: string, options: RequestInit = {}) => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  const token = match ? match[2] : null;

  const isFormData = options.body instanceof FormData;

  const headers: any = {
    ...(options.headers || {})
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers
  });

  if (!res.ok) {

    const errorData = await res.json();
    throw {
      message: errorData.Message
    };
  }

  return res.json();
};


export const api = {
  get: (url: string) => request(url),

  post: (
    url: string,
    body: any,
    options: RequestInit = {}
  ) =>
    request(url, {
      method: "POST",
      body: body instanceof FormData
        ? body
        : JSON.stringify(body),
      ...options
    }),

  put: (
    url: string,
    body: any,
    options: RequestInit = {}
  ) =>
    request(url, {
      method: "PUT",
      body: body instanceof FormData
        ? body
        : JSON.stringify(body),
      ...options
    }),

  delete: (url: string) =>
    request(url, {
      method: "DELETE"
    })
};