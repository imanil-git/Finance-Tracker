import axios from "axios";
const RootApiEp = import.meta.env.VITE_ROOT_API + "/api/v1";

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

// Adding New Transaction
export const NewPostTransaction = (data) => {
  const obj = {
    method: "post",
    url: RootApiEp + "/transactions",
    data,
    headers: {
      Authorization: getAccessJWT(),
    },
  };
  return apiProcessor(obj);
};

// Getting Transaction
export const fetchTransaction = (page = 1, limit = 10) => {
  const obj = {
    method: "get",
    url: RootApiEp + `/transactions?page=${page}&limit=${limit}`,
    headers: {
      Authorization: getAccessJWT(),
    },
  };
  return apiProcessor(obj);
};

// Updating Transaction
export const updateTransaction = (id, data) => {
  const obj = {
    method: "patch",
    url: RootApiEp + "/transactions/" + id,
    data,
    headers: {
      Authorization: getAccessJWT(),
    },
  };
  return apiProcessor(obj);
};

// Deleting Transaction
export const deleteTransactions = (data) => {
  const obj = {
    method: "delete",
    url: RootApiEp + "/transactions",
    data,
    headers: {
      Authorization: getAccessJWT(),
    },
  };
  return apiProcessor(obj);
};

// Callin AI
export const askAI = (question) => {
  const obj = {
    method: "post",
    url: RootApiEp + "/ai",
    data: { question },
    headers: {
      Authorization: getAccessJWT(),
    },
  };
  return apiProcessor(obj);
};
