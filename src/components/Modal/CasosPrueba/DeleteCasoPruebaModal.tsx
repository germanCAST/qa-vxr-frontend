import React, { useEffect, useState } from "react";
import { CasoPruebaConCasoUso } from "../../../types/Proyecto";
import { HiX } from "react-icons/hi";
import { format } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  CasoPruebaConCasoUso: CasoPruebaConCasoUso | null;
  fetchAllData: () => void;
}

const DeleteProyectoModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  CasoPruebaConCasoUso: project,
  fetchAllData,
}) => {
  const [CasoPruebaConCasoUso, setCasoPruebaConCasoUso] =
    useState<CasoPruebaConCasoUso | null>(project);

  const onConfirmDelete = async () => {
    const body = {
      id: CasoPruebaConCasoUso?.id,
    };
    if (CasoPruebaConCasoUso) {
      const responseDelete = await fetch("/api/casos/deleteCasoPrueba", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (responseDelete.ok) {
        alert("Caso de uso borrado correctamente");
        fetchAllData(); // Refrescar la data después de eliminar
      } else {
        alert("Error al eliminar el caso de uso");
      }
    }
    onClose();
  };

  useEffect(() => {
    if (project) {
      setCasoPruebaConCasoUso(project);
    }
  }, [project]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Eliminar Proyecto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Detalles del Proyecto */}
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Nombre del Caso de Prueba:</p>
            <p>{CasoPruebaConCasoUso?.caso_prueba_titulo}</p>
          </div>
          <div>
            <p className="font-semibold">Descripción:</p>
            <p>{CasoPruebaConCasoUso?.caso_prueba_descripcion}</p>
          </div>
          <div>
            <p className="font-semibold">Estado:</p>
            <p>{CasoPruebaConCasoUso?.caso_prueba_estado}</p>
          </div>
          <div>
            <p className="font-semibold">Fecha de creacion:</p>
            {CasoPruebaConCasoUso?.caso_prueba_creacion
              ? format(
                  new Date(CasoPruebaConCasoUso.caso_prueba_creacion),
                  "dd/MM/yyyy"
                )
              : "Fecha no disponible"}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white font-bold rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmDelete}
            className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProyectoModal;
