import { axiosInstance } from "../lib/axios";

export const userClick = async (userId) => {
  try {
    const res = await axiosInstance.post("/click", { userId });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
