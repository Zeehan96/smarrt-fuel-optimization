import { invokeApi } from "./invokeApi";

// 1. Plan Trip (Calculate Estimate)
// Does not save to database, just returns estimated fuel and recommendations.
export const _plan_trip_api = async (apiBody) => {
  return await invokeApi({
    path: "/api/trips/plan",
    method: "POST",
    postData: apiBody,
  });
};

// 2. Save Trip
// Saves the finalized trip to the database for the user.
export const _save_trip_api = async (apiBody) => {
  return await invokeApi({
    path: "/api/trips",
    method: "POST",
    postData: apiBody,
  });
};

// 3. Get User Trips (History)
// Fetches the trip history for a specific user with pagination.
export const _get_user_trips_api = async (userId, page = 1, limit = 10) => {
  return await invokeApi({
    path: `/api/trips/user/${userId}`,
    method: "GET",
    queryParams: { page, limit },
  });
};
