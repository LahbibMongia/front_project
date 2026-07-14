import axios from "axios";
const API_URL = "http://localhost:5000/users";

//http://localhost:5000

//http:localhost:5000/Users gestion des utilisateurs
//http:localhost:5000/reservations gestion des reservations

export async function getAllUsers() {
    return await axios.get(`${API_URL}/GetAllUsers`);  
}

export async function deleteUser(id) {
    return await axios.delete(`${API_URL}/DeleteUser/${id}`);  
}

export async function addUser(userData) {
    return await axios.post(`${API_URL}/addUser`, userData);  
}

export async function updateUser(id, userData) {
    return await axios.put(`${API_URL}/updateUser/${id}`, userData);  
}

export async function getUserById(id) {
    return await axios.get(`${API_URL}/getUserById/${id}`);  
}

export async function searchUsers(search) {
    return await axios.get(`${API_URL}/searchUsers/${search}`);  
}

/*export async function filterUsersByRole(role) {
    return await axios.get(`${API_URL}/filterUsersByRole/${role}`);  
}*/
