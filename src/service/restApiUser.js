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