import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Ensure this URL is correct

export const register = async (data: { username: string, email: string, password: string, name: string }) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const verifyOTP = async (data: { email: string, otp: string }) => {
  const response = await axios.post(`${API_URL}/verify-otp`, data);
  return response.data;
};

export const login = async (data: { identifier: string, password: string }) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await axios.post(`${API_URL}/forgot-password`, data);
  return response.data;
};

export const resetPassword = async (data: { email: string, otp: string, newPassword: string }) => {
  const response = await axios.post(`${API_URL}/reset-password`, data);
  return response.data;
};

export const verifyForgotPasswordOTP = async (data: { email: string, otp: string }) => {
  const response = await axios.post(`${API_URL}/verify-forgot-password-otp`, data);
  return response.data;
};
