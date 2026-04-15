import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true; // If no token, consider it expired
  try {
    const { exp } = jwtDecode(token); // Decode JWT
    return exp * 1000 < Date.now(); // Convert exp time to milliseconds and compare
  } catch (error) {
    return true; // If decoding fails, treat token as expired
  }
};