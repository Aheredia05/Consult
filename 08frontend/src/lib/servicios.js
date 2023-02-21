import axios from "axios";

export const getServicios = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("https://base.devitamedical.com/api/v1/servicio", {
      headers: { accept: "application/json", authorization: token },
    });
    return response.data.data.servicios;
  } catch (error) {
    console.log(error);
  }
};

export const getServicio = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `https://base.devitamedical.com/api/v1/servicio/${id}`,
      { headers: { accept: "application/json", authorization: token } }
    );
    const servicio = { ...response.data.data.servicio, id };
    return servicio;
  } catch (error) {
    console.log(error);
  }
};
