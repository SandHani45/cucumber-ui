import axios from "axios";
import stepMock from './../mock/stepsMock.json'
const BASE_URL = process.env.BACKEND_URL || "https://aefa-86-98-70-229.ngrok-free.app";
const tagRunnerService = async ({tag}) => {
    return fetch(`${BASE_URL}/run/tag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tag: tag,
      }),
    })
      .then((res) => {
        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        return reader.read().then(function processtext({ done, value }) {
          // if (done) {
          //   setLoading(false);
          //   return;
          // }
          const chunk = decoder.decode(value, { stream: true });
          // if (chunk === "closed") {
          //   setLoading(false);
          //   return;
          // }
          // setLogs((prevLogs) => prevLogs + chunk);
          return reader.read().then(processtext);
        });
      })
      .catch((error) => {
        console.error("Error fetching feature Step :", error);
        throw error;
      });
  };


  // try {
  //   const response = await axios.post(`${BASE_URL}/run/tag`,{
  //       tag: tag
  //     });

  //   const res = response.data;
  //   return res
  //   return {
  //       tag: '@ui',
  //       started: true
  //   }
  // } catch (error) {
  //   console.error("Error fetching feature Step :", error);
  //   throw error;
  // }


export { tagRunnerService };
