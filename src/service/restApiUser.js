import API from "./api";

/**
 * Retrieves all users from the system.
 * @GET /users/GetAllUsers
 */
export const getAllUsers = () => {
  return API.get("/users/GetAllUsers");
};

/**
 * Removes a user by their unique ID.
 * @DELETE /users/DeleteUser/:id
 */
export const deleteUser = (id) => {
  return API.delete(`/users/DeleteUser/${id}`);
};

/**
 * Registers/Adds a new user to the database.
 * @POST /users/addUser
 */
export const addUser = (userData) => {
  return API.post("/users/addUser", userData);
};

/**
 * Updates an existing user's details.
 * @PUT /users/updateUser/:id
 */
export const updateUser = (id, userData) => {
  return API.put(`/users/updateUser/${id}`, userData);
};

/**
 * Fetches a single user's detailed profile.
 * @GET /users/getUserById/:id
 */
export const getUserById = (id) => {
  return API.get(`/users/getUserById/${id}`);
};

/**
 * Searches for users matching a specific keyword or term.
 * @GET /users/searchUsers/:search
 */
export const searchUsers = (search) => {
  return API.get(`/users/searchUsers/${search}`);
};

/*
export const filterUsersByRole = (role) => {
  return API.get(`/users/filterUsersByRole/${role}`);
};
*/