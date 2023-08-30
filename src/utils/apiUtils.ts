import { VITE_API_ENDPOINT } from "../config/constants";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data:
    | { username: string; password: string } | {}
) => {
  let url;
  let payload: string;

  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key as keyof typeof data]}`)
          .join("&")}`
      : "";
    url = `${VITE_API_ENDPOINT}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${VITE_API_ENDPOINT}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  const token = localStorage.getItem("authToken");
  const auth = token ? "Token " + token : "";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" && method !== "DELETE" ? payload : null,
  });

  if (method === "DELETE") {
    return "success";
  }

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const fetchArticles = () => {
    return request("/articles", "GET", {})
}

export const fetchSingleArticle = (id:string) => {
  return request(`/articles/${id}`, "GET", {})
}

export const fetchMatchList = () => {
  return request(`/matches`, "GET", {})
}

export const fetchSingleMatch = (id: string) => {
  return request(`/matches/${id}`, "GET", {})
}
