import axios from "axios";
const RootApiEp = "http://localhost:8000/api/v1";

const getAccessJWT = () => {
  return localStorage.getItem("accessJWT");
};

const apiProcessor = async ({ method, url, data, headers }) => {
  try {
    const reponse = await axios({
      method,
      url,
      data,
      headers,
    });
    return reponse.data;
  } catch (error) {
    console.log({ error });
    return {
      status: "error",
      message: error?.response?.data?.error || error.message,
    };
  }
};

//Signup user
export const NewPostUser = (data) => {
  const obj = {
    method: "post",
    url: RootApiEp + "/users",
    data,
  };
  return apiProcessor(obj);
};

//Login user
export const loginUser = (data) => {
  const obj = {
    method: "post",
    url: RootApiEp + "/users/login",
    data,
  };
  return apiProcessor(obj);
};

// get user profile
export const getUser = () => {
  const obj = {
    method: "get",
    url: RootApiEp + "/users",
    headers: {
      Authorization: getAccessJWT(),
    },
  };
  return apiProcessor(obj);
};
