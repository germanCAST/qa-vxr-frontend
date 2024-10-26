import React, { useEffect, useState } from "react";
import { DefectoAllResponse } from "../../../types/Proyecto";
import { HiX } from "react-icons/hi";
import { format } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defectoAllResponse: DefectoAllResponse | null;
  fetchAllData: () => void;
}

const DeleteDefectoModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  defectoAllResponse,
  fetchAllData,
}) => {
  const [editableDefecto, setEditableDefecto] =
    useState<DefectoAllResponse | null>(defectoAllResponse);

  const onConfirmDelete = async () => {
    const body = {
      defecto_id: editableDefecto?.defecto_id, // Aquí usamos el defecto_id
    };
    if (editableDefecto) {
      const responseDelete = await fetch("/api/defectos/deleteDefecto", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (responseDelete.ok) {
        alert("Defecto borrado correctamente");
        fetchAllData(); // Refrescar la data después de eliminar
      } else {
        alert("Error al eliminar el defecto");
      }
    }
    onClose();
  };

  useEffect(() => {
    if (defectoAllResponse) {
      setEditableDefecto(defectoAllResponse);
    }
  }, [defectoAllResponse]);

  if (!isOpen || !editableDefecto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Eliminar Defecto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Detalles del Defecto */}
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Nombre del Caso de Prueba:</p>
            <p>{editableDefecto?.caso_prueba_titulo}</p>
          </div>
          <div>
            <p className="font-semibold">Descripción del Defecto:</p>
            <p>{editableDefecto?.defecto_descripcion}</p>
          </div>
          <div>
            <p className="font-semibold">Prioridad del Defecto:</p>
            <p>{editableDefecto?.defecto_prioridad}</p>
          </div>
          <div>
            <p className="font-semibold">Fecha de Creación:</p>
            {editableDefecto?.defecto_fecha_creacion
              ? format(
                  new Date(editableDefecto.defecto_fecha_creacion),
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

export default DeleteDefectoModal;
