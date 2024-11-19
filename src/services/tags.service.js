import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "https://0aba-86-98-70-229.ngrok-free.app";

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
