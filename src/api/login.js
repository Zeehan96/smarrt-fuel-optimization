import { invokeApi } from "./invokeApi";

export const _login_user_api = async (apiBody) => {
  return await invokeApi({
    path: "/api/login",
    method: "POST",
    postData: apiBody,
  });
};
