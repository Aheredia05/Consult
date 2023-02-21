import axios from "axios";

export const deleteCita = async (id) => {

  const token = localStorage.getItem("token");

  try {
    return await axios.delete(`https://base.devitamedical.com/api/v1/cita/${id}`, {
      headers: { accept: "application/json", authorization: token },
    });
  } catch (error) {
    console.log(error);
  }
};
