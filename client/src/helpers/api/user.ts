import apiClient from "utils/api/apiClient";

export const signupUser = async (
  name: string,
  email: string,
  username: string,
  password: string
) => {
  const response = await apiClient.post("/admin/signup", {
    username,
    password,
    name,
    email,
  });
  return response.data;
};
export const loginUser = async (username: string, password: string) => {
  const response = await apiClient.post("/admin/signin", {
    username,
    password,
  });
  return response.data;
};
export const getUserDetails = async (token: string) => {
  const response = await apiClient.get("/user/details");
  return response.data;
};
