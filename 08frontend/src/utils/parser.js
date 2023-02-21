const lang = (message) => {
  const es = {
    "The username must not be greater than 20 characters.":
      "El nombre de usuario no debe tener mas de 20 caracteres",
  };

  return es[message] || message;
};

export const errorMessage = (error) => {
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  if (error?.response?.data?.errors) {
    let line = "";

    for (const [key, value] of Object.entries(error.response.data.errors)) {
      const field = value;

      for (const message of field) {
        line += `${message} \n`;
      }
    }

    return line;
  }

  return "Error desconocido";
};
