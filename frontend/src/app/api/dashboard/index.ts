import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

export const createPost = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/posts`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

interface ProfileData {
  name: string;
  email: string;
  age?: number; // Example optional field
}

export const updateProfile = async (data: ProfileData) => {
  const response = await axios.put(`${API_URL}/profile`, data);
  return response.data;
};
