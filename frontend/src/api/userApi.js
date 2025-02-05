import { axiosInstance } from "../lib/axios";

export const getUser = async (id) => {
  try {
    const res = await axiosInstance.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
