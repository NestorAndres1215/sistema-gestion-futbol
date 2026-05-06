
export const API_URL = "https://localhost:7269/api";


const request = async (url: string, options: RequestInit = {}) => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  const token = match ? match[2] : null;

  const headers: any = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };


  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${url}`, {
    ...options, 
    headers
  });

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return res.json();
};


export const api = {
  get: (url: string) => request(url),
  post: (url: string, body: any) =>
    request(url, {
      method: "POST",
      body: JSON.stringify(body)
    }),
  put: (url: string, body: any) =>
    request(url, {
      method: "PUT",
      body: JSON.stringify(body)
    }),
  delete: (url: string) =>
    request(url, {
      method: "DELETE"
    })
};