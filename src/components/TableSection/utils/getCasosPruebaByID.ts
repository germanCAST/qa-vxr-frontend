import { CasoPrueba } from "../../../types/index"; // Asegúrate de ajustar la importación según tu estructura de proyecto

export const getCasosPruebaByID = async (
  projectId: number
): Promise<CasoPrueba[] | null> => {
  try {
    const response = await fetch(`/api/casos/getCasosPruebaById/${projectId}`);
    if (!response.ok) {
      throw new Error("Error al obtener los casos de uso por ID del proyecto");
    }

    const respuestaGetCasosByID = await response.json();

    // Comprobamos si la respuesta tiene datos o es nula
    if (respuestaGetCasosByID.data !== null) {
      return respuestaGetCasosByID as CasoPrueba[];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
