import apiClient from "utils/api/apiClient";

export const getAllProjects = async () => {
  const response = await apiClient.get("/project/all");
  return response.data;
};
