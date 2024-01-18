import axios from "axios";

const baseUrl = "http://localhost:3000";

export const callAPI = async (
  endpoint,
  method,
  headers = {},
  params = {},
  data = {}
) => {
  const options = {
    url: baseUrl + endpoint,
    method,
    headers,
    params,
    data,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      return { error: "Server error" };
    } else if (error.request) {
      console.error("No response received from the server");
      return { error: "No response from server" };
    } else {
      console.error("Error setting up the request:", error.message);
      return { error: "Request setup error" };
    }
  }
};
