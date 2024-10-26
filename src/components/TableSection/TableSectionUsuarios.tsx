import React, { useState } from "react";
import { CompleteUser } from "../../types/Usuario";
import { format } from "date-fns";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import LoadingModal from "../Modal/LoadingModal";
import DeleteUserModal from "../Modal/User/DeleteUserModal";
import EditUserModal from "../Modal/User/EditUserModal";

interface TableSectionUsuariosProps {
  completeUser: CompleteUser[];
  fetchAllData: () => void;
}

const TableSectionUsuarios: React.FC<TableSectionUsuariosProps> = ({
  completeUser: completeUser,
  fetchAllData,
}) => {
  const [selectedUser, setSelectedUser] = useState<CompleteUser | null>(null);
  const [isLoading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const openEditModal = (user: CompleteUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (user: CompleteUser) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <LoadingModal
        isOpen={isLoading}
        message="Obteniendo detalles del usuario..."
      />
      <section className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Usuarios</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Usuario</th>
                <th className="px-4 py-2 border-b text-left">Correo</th>
                <th className="px-4 py-2 border-b text-left">Rol</th>
                <th className="px-4 py-2 border-b text-left">Nombre</th>
                <th className="px-4 py-2 border-b text-left">
                  Fecha de creación
                </th>
                <th className="px-4 py-2 border-b text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {completeUser.length > 0 ? (
                completeUser.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-4 border-b">
                      {user.nombre_usuario}
                    </td>
                    <td className="px-4 py-4 border-b">
                      {user.correo_electronico}
                    </td>
                    <td className="px-4 py-4 border-b">{user.rol}</td>
                    <td className="px-4 py-4 border-b">
                      {user.nombre + " " + user.apellido}
                    </td>
                    <td className="px-4 py-4 border-b">
                      {format(new Date(user.fecha_creacion), "dd/MM/yyyy")}
                    </td>
                    <td className="px-4 py-4 border-b">
                      <div className="flex space-x-5">
                        <button
                          onClick={() => openEditModal(user)}
                          className="flex items-center justify-center space-x-1 text-yellow-500 hover:text-yellow-700"
                        >
                          <i className="text-lg">
                            <HiPencilAlt />
                          </i>
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="flex items-center justify-center space-x-1 text-red-500 hover:text-red-700"
                        >
                          <i className="text-lg">
                            <HiTrash />
                          </i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center">
                    No hay usuarios disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {/* Modal para editar detalles del usuario */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        completeUser={selectedUser}
        fetchAllData={fetchAllData}
      />
      {/* Modal para eliminar el usuario */}
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        completeUser={selectedUser}
        fetchAllData={fetchAllData}
      />
    </>
  );
};

export default TableSectionUsuarios;
