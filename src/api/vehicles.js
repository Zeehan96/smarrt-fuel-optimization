import { invokeApi } from "./invokeApi";

export const getVehiclesApi = async () => {
  return await invokeApi({
    path: "/api/vehicles",
    method: "GET",
  });
};

export const getVehicleByIdApi = async (id) => {
  return await invokeApi({
    path: `/api/vehicles/${id}`,
    method: "GET",
  });
};

export const createVehicleApi = async (data) => {
  return await invokeApi({
    path: "/api/vehicles",
    method: "POST",
    postData: data,
  });
};

export const updateVehicleApi = async (id, data) => {
  return await invokeApi({
    path: `/api/vehicles/${id}`,
    method: "PUT",
    postData: data,
  });
};

export const deleteVehicleApi = async (id) => {
  return await invokeApi({
    path: `/api/vehicles/${id}`,
    method: "DELETE",
  });
};
