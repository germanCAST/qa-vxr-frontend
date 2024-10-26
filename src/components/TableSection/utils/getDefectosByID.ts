import { Defecto } from "../../../types/index"; // Asegúrate de ajustar la importación según tu estructura de proyecto

export const getDefectosByID = async (
  projectId: number
): Promise<Defecto[] | null> => {
  try {
    const response = await fetch(`/api/defectos/getDefectosById/${projectId}`);
    if (!response.ok) {
      throw new Error("Error al obtener los casos de uso por ID del proyecto");
    }

    const respuestaGetCasosByID = await response.json();

    // Comprobamos si la respuesta tiene datos o es nula
    if (respuestaGetCasosByID.data !== null) {
      return respuestaGetCasosByID as Defecto[];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
