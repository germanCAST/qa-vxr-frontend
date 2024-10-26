import React, { useState } from "react";
import { CasoUsoConProyecto } from "../../types/Proyecto";
import { format } from "date-fns";

import { HiPencilAlt, HiTrash } from "react-icons/hi";
import LoadingModal from "../Modal/LoadingModal";

import EditCasoUsoModal from "../Modal/CasosUso/EditCasoUsoModal";
import DeleteCasoUsoModal from "../Modal/CasosUso/DeleteCasoUsoModal";

interface TableSectionCasosUso {
  casoUsoConProyecto: CasoUsoConProyecto[];
  fetchAllData: () => void;
}

const TableSectionCasosUso: React.FC<TableSectionCasosUso> = ({
  casoUsoConProyecto: CasoUsoConProyecto,
  fetchAllData,
}) => {
  const [TableSectionCasosUso, setSelectedCasoPrueba] =
    useState<CasoUsoConProyecto | null>(null);
  const [isLoading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const openEditModal = (casoUso: CasoUsoConProyecto) => {
    setSelectedCasoPrueba(casoUso);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCasoPrueba(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (casoUso: CasoUsoConProyecto) => {
    setSelectedCasoPrueba(casoUso);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedCasoPrueba(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <LoadingModal
        isOpen={isLoading}
        message="Obteniendo detalles del caso de prueba..."
      />
      <section className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Casos de Uso</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Caso de Uso</th>
                <th className="px-4 py-2 border-b text-left">Descripción</th>
                <th className="px-4 py-2 border-b text-left">Proyecto</th>
                <th className="px-4 py-2 border-b text-left">
                  Fecha de creacion
                </th>
                <th className="px-4 py-2 border-b text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {CasoUsoConProyecto.length > 0 ? (
                CasoUsoConProyecto.map((CasoUsoConProyecto) => (
                  <tr key={CasoUsoConProyecto.caso_uso_id}>
                    <td className="px-4 py-4 border-b">
                      {CasoUsoConProyecto.caso_uso_titulo}
                    </td>
                    <td
                      className="px-4 py-4 border-b max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                      title={CasoUsoConProyecto.caso_uso_descripcion}
                    >
                      {CasoUsoConProyecto.caso_uso_descripcion}
                    </td>
                    <td
                      className="px-4 py-4 border-b max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                      title={CasoUsoConProyecto.caso_uso_descripcion}
                    >
                      {CasoUsoConProyecto.proyecto_nombre}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {format(
                        new Date(CasoUsoConProyecto.caso_uso_creacion),
                        "dd/MM/yyyy"
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex space-x-5">
                        <button
                          onClick={() => openEditModal(CasoUsoConProyecto)}
                          className="flex items-center justify-center space-x-1 text-yellow-500 hover:text-yellow-700"
                        >
                          <i className="text-lg">
                            <HiPencilAlt />
                          </i>
                        </button>
                        <button
                          onClick={() => openDeleteModal(CasoUsoConProyecto)}
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
                    No hay casos de prueba disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {/* Modal para ver los detalles del caso de prueba */}
      <EditCasoUsoModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        casoUsoConProyecto={TableSectionCasosUso}
        fetchAllData={fetchAllData}
      />
      <DeleteCasoUsoModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        casoUsoConProyecto={TableSectionCasosUso}
        fetchAllData={fetchAllData}
      />
    </>
  );
};

export default TableSectionCasosUso;
