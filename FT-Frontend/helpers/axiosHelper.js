import axios from "axios";
const RootApiEp = "http://localhost:8000/api/v1";

const apiProcessor = async ({ method, url, data }) => {
  try {
    const reponse = await axios({
      method,
      url,
      data,
    });
    return reponse.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const NewPostUser = (data) => {
  const obj = {
    method: "post",
    url: RootApiEp + "/users",
    data,
  };
  return apiProcessor(obj);
};
