import React, { useEffect, useState } from "react";
import { Proyecto } from "../../types/Proyecto";
import { HiX } from "react-icons/hi";
import { format } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Proyecto | null;
  fetchAllData: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  project,
  fetchAllData,
}) => {
  const [currentProject, setCurrentProject] = useState<Proyecto | null>(
    project
  );

  const onConfirmDelete = async () => {
    const body = {
      id: currentProject?.id,
    };
    if (currentProject) {
      const responseDelete = await fetch("/api/data/proyectos/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Asegúrate de especificar el Content-Type
        },
        body: JSON.stringify(body),
      });

      if (responseDelete.ok) {
        alert("Proyecto borrado correctamente");
      }
      fetchAllData();
    }
    onClose();
  };

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
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
            <p className="font-semibold">Nombre del Proyecto:</p>
            <p>{currentProject?.proyecto_nombre}</p>
          </div>
          <div>
            <p className="font-semibold">Descripción:</p>
            <p>{currentProject?.proyecto_descripcion}</p>
          </div>
          <div>
            <p className="font-semibold">Estado:</p>
            <p>{currentProject?.estado}</p>
          </div>
          <div>
            <p className="font-semibold">Fecha de inicio:</p>
            {currentProject?.fecha_inicio
              ? format(new Date(currentProject.fecha_inicio), "dd/MM/yyyy")
              : "Fecha no disponible"}
          </div>

          <div>
            <p className="font-semibold">Fecha de fin:</p>
            {currentProject?.fecha_inicio
              ? format(new Date(currentProject.fecha_fin), "dd/MM/yyyy")
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

export default DeleteModal;