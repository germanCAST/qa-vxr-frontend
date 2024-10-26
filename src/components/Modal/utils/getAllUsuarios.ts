export const getAllUsuarios = async () => {
  try {
    const response = await fetch("/api/auth/getAllUsuarios");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener los usuarios");
      throw new Error("Error al obtener los usuarios");
    }
  } catch (error) {
    console.error("Error al conectar con el endpoint:", error);
    throw error;
  }
};
