import axios from "axios";
import stepMock from './../mock/stepsMock.json'
const featureStepService = async () => {
  try {
    // const response = await axios.get(`${BASE_URL}/tags`);
    // const res = response.data;
    return stepMock.data
  } catch (error) {
    console.error("Error fetching feature Step :", error);
    throw error;
  }
};

export { featureStepService };
