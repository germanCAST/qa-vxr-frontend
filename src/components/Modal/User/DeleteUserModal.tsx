import React, { useEffect, useState } from "react";
import { CompleteUser } from "../../../types/Usuario";
import { HiX } from "react-icons/hi";
import { format } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  completeUser: CompleteUser | null;
  fetchAllData: () => void;
}

const DeleteUserModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  completeUser: CompleteUser,
  fetchAllData,
}) => {
  const [editableUser, setEditableUser] = useState<CompleteUser | null>(
    CompleteUser
  );

  const onConfirmDelete = async () => {
    const body = {
      id: editableUser?.id, // Usamos el id del usuario para identificarlo
    };
    if (editableUser) {
      const responseDelete = await fetch("/api/auth/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (responseDelete.ok) {
        alert("Usuario borrado correctamente");
        fetchAllData(); // Refrescar la lista de usuarios después de eliminar
      } else {
        alert("Error al eliminar el usuario");
      }
    }
    onClose();
  };

  useEffect(() => {
    if (CompleteUser) {
      setEditableUser(CompleteUser);
    }
  }, [CompleteUser]);

  if (!isOpen || !editableUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Eliminar Usuario</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Detalles del Usuario */}
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Nombre del Usuario:</p>
            <p>{`${editableUser?.nombre} ${editableUser?.apellido}`}</p>
          </div>
          <div>
            <p className="font-semibold">Correo Electrónico:</p>
            <p>{editableUser?.correo_electronico}</p>
          </div>
          <div>
            <p className="font-semibold">Rol:</p>
            <p>{editableUser?.rol}</p>
          </div>
          <div>
            <p className="font-semibold">Fecha de Creación:</p>
            {editableUser?.fecha_creacion
              ? format(new Date(editableUser.fecha_creacion), "dd/MM/yyyy")
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

export default DeleteUserModal;
