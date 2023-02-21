import axios from "axios";

export const getPacientes = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("https://base.devitamedical.com/api/v1/paciente", {
      headers: { accept: "application/json", authorization: token },
    });
    return response.data.data.pacientes;
  } catch (error) {
    console.log(error);
  }
};
