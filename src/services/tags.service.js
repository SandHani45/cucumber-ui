import axios from "axios";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:3001";

const tagsService = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tags`);
    const res = response.data;
    return res.map((tag, index) => {
      return {
        tag,
        id: index,
        isActive: false,
      };
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export { tagsService };
