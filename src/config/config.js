const getApiBaseUrl = () => {
  const envUrl =
    typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL
      : "";

  if (envUrl && envUrl.trim() !== "") {
    return envUrl;
  }
  if (typeof window !== "undefined" && window.location && window.location.hostname && window.location.hostname !== "localhost") {
    return `http://${window.location.hostname}:3000/api`;
  }
  return "http://192.168.1.7:3000/api";
};

export const config = {
  API_BASE_URL: "",
  PIC_BASE_URL: "",
  EDITOR_KEY: "",
  PROJECT_MODE: "development",
  ENVIRONMENT: "dev",
};

export const apiBaseUrl = getApiBaseUrl();
export const s3BaseUrl = "";
export const editorKey = "";
export const projectMode = "development";

