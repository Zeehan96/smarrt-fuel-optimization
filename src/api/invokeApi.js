import axios from "axios";
import { apiBaseUrl } from "../config/config";

export async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {},
}) {
  let baseUrl = apiBaseUrl.endsWith("/") ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
  let formattedPath = path.startsWith("/") ? path : "/" + path;
  if (baseUrl.endsWith("/api") && formattedPath.startsWith("/api/")) {
    formattedPath = formattedPath.substring(4);
  }

  const reqObj = {
    method,
    url: baseUrl + formattedPath,
    headers,
  };

  // Attach token for all APIs except login and register
  if (
    typeof window !== "undefined" &&
    !path.includes("/login") &&
    !path.includes("/register")
  ) {
    const token = localStorage.getItem("token");
    if (token) {
      reqObj.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  reqObj.params = queryParams;

  if (method === "POST") {
    reqObj.data = postData;
  }
  if (method === "PUT") {
    reqObj.data = postData;
  }
  if (method === "DELETE") {
    reqObj.data = postData;
  }

  let results;
  if (postData instanceof FormData) {
    delete reqObj.headers["Content-Type"];
    // It's best to let axios set the Content-Type automatically for FormData so it includes the boundary
  }

  console.log(`🚀 [API Request] ${method} -> ${reqObj.url}`, {
    method,
    url: reqObj.url,
    headers: reqObj.headers,
    queryParams: reqObj.params,
    postData: reqObj.data,
  });

  try {
    results = await axios(reqObj);
    console.log(`✅ [API Response Success] ${method} -> ${reqObj.url}:`, results.data);
    return results.data;
  } catch (error) {
    const status = error.response?.status;
    const responseData = error.response?.data;

    // Extract message — handle string, object with message/msg/error keys, or nested data
    let message = "";
    if (typeof responseData === "string") {
      message = responseData;
    } else if (responseData && typeof responseData === "object") {
      message =
        responseData.message ||
        responseData.msg ||
        responseData.error ||
        responseData.data?.message ||
        "";
    }
    if (!message) {
      message = error?.message || "";
    }

    console.error(`❌ [API Response Error] ${method} -> ${reqObj.url} [Status: ${status || "Network Error"}]:`, {
      status,
      message,
      error,
      responseData,
    });

    // 401: clear auth and redirect to login only once; never redirect if already on login (stops refresh loop)
    const isLoginPage =
      typeof window !== "undefined" &&
      (window.location.pathname === "/" ||
        window.location.pathname === "/login");
    const isLocalAuth =
      typeof window !== "undefined" &&
      localStorage.getItem("token") === "local-token";
    if (status === 401 && !isLoginPage) {
      // Don't force-logout when we're using local/static auth.
      if (isLocalAuth) {
        return {
          code: 401,
          message: message || "Unauthorized (local auth)",
        };
      }
      if (!invokeApi._redirectingOn401) {
        invokeApi._redirectingOn401 = true;
        localStorage.removeItem("token");
        localStorage.removeItem("userAdmin");
        window.location.href = "/";
      }
    }

    return {
      code: status ?? 0,
      message: typeof message === "string" ? message : "",
    };
  }
}
