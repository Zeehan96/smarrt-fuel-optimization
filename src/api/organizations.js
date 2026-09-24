import { invokeApi } from "./invokeApi";

// 1. LIST all organizations with pagination and search
export const _get_organizations_api = async (page = 1, limit = 10, search = "") => {
  return await invokeApi({
    path: "/api/organizations",
    method: "GET",
    queryParams: { page, limit, search },
  });
};

// 2. ADD a new organization (Admin)
export const _add_organization = async (apiBody) => {
  return await invokeApi({
    path: "/api/organizations",
    method: "POST",
    postData: apiBody,
  });
};

// 3. EDIT an existing organization
export const _update_organization = async (id, apiBody) => {
  return await invokeApi({
    path: `/api/organizations/${id}`,
    method: "PUT",
    postData: apiBody,
  });
};

// 4. DELETE an organization
export const _delete_organization = async (id) => {
  return await invokeApi({
    path: `/api/organizations/${id}`,
    method: "DELETE",
  });
};
