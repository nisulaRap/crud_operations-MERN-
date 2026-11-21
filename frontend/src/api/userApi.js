import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/users",
    headers: { "Content-Type": "application/json" },
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message || "Something went wrong. Please try again.";
        return Promise.reject(new Error(message));
    }
);

export const getAllUsers = () => API.get("/");
export const getUserById = (id) => API.get(`/${id}`);
export const createUser = (userData) => API.post("/create", userData);
export const updateUser = (id, userData) => API.put(`/update/${id}`, userData);
export const deleteUser = (id) => API.delete(`/delete/${id}`);

