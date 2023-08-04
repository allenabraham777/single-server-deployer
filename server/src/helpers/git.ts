import axios from "axios";

export const checkRepoStatus = async (url: string) => {
  try {
    await axios.get(`${url}/info/refs?service=git-upload-pack`);
    return true;
  } catch (error) {
    return false;
  }
};
