import axios from "axios";

export const getDirectors = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("https://base.devitamedical.com/api/v1/director", {
      headers: { accept: "application/json", authorization: token },
    });
    return response.data.data.users;
  } catch (error) {
    console.log(error);
  }
};

const deleteDirector = async (id) => {

  const token = localStorage.getItem("token");

  try {
    
    return await axios.delete(`https://base.devitamedical.com/api/v1/director/${id}`, {
      headers: { accept: "application/json", authorization: token },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRoles = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("https://base.devitamedical.com/api/v1/role", {
      headers: { accept: "application/json", authorization: token },
    });
    return response.data.data.roles;
  } catch (error) {
    console.log(error);
  }
};
