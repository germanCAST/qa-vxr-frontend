import { CasoUso } from "../../../types/index"; // Asegúrate de ajustar la importación según tu estructura de proyecto

export const getCasosUsoByID = async (
  projectId: number
): Promise<CasoUso[] | null> => {
  try {
    const response = await fetch(`/api/casos/getCasosById/${projectId}`);
    if (!response.ok) {
      throw new Error("Error al obtener los casos de uso por ID del proyecto");
    }

    const respuestaGetCasosByID = await response.json();

    // Comprobamos si la respuesta tiene datos o es nula
    if (respuestaGetCasosByID.data !== null) {
      return respuestaGetCasosByID as CasoUso[];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
