import { invokeApi } from "./invokeApi";

export const _logout_user_api = async () => {
  return await invokeApi({
    path: "/api/logout",
    method: "POST",
  });
};
