import { invokeApi } from "./invokeApi";

export const _register_user_api = async (apiBody) => {
  return await invokeApi({
    path: "/api/register",
    method: "POST",
    postData: apiBody,
  });
};
