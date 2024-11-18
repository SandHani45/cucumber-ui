import axios from "axios";

const BASE_URL = process.env.BACKEND_URL || "https://aefa-86-98-70-229.ngrok-free.app";

const tagsService = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/scan/projects`);

    return response.data;
    // const res = response.data;
    // return res.map((tag, index) => {
    //   return {
    //     tag,
    //     id: index,
    //     isActive: false,
    //   };
    // });
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export { tagsService };
