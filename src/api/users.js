import { invokeApi } from "./invokeApi";

// 1. LIST all users with pagination and search
export const _get_users_api = async (page = 1, limit = 10, search = "") => {
  return await invokeApi({
    path: "/api/users",
    method: "GET",
    queryParams: { page, limit, search },
  });
};

// 2. ADD a new user (Admin)
export const _add_user = async (apiBody) => {
  return await invokeApi({
    path: "/api/users",
    method: "POST",
    postData: apiBody,
  });
};

// 3. EDIT an existing user
export const _update_user = async (id, apiBody) => {
  return await invokeApi({
    path: `/api/users/${id}`,
    method: "PUT",
    postData: apiBody,
  });
};

// 4. DELETE a user
export const _delete_user = async (id) => {
  return await invokeApi({
    path: `/api/users/${id}`,
    method: "DELETE",
  });
};
