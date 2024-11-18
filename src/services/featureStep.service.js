import axios from "axios";
import stepMock from './../mock/stepsMock.json'
const BASE_URL = process.env.BACKEND_URL || "https://aefa-86-98-70-229.ngrok-free.app";
const featureStepService = async (body={}) => {
  try {
    const response = await axios.post(`${BASE_URL}/scan/project`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",  
    });
    const res = response.data.data;
    return res
  } catch (error) {
    console.error("Error fetching feature Step :", error);
    throw error;
  }
};

export { featureStepService };
