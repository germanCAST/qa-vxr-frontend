import React, { useState } from "react";
import { DefectoAllResponse } from "../../types/Proyecto";
import { format } from "date-fns";

import { HiPencilAlt, HiTrash } from "react-icons/hi";
import LoadingModal from "../Modal/LoadingModal";

import EditDefectoModal from "../Modal/Defectos/EditDefectoModal";
import DeleteDefectoModal from "../Modal/Defectos/DeleteDefectoModal";

interface TableSectionDefecto {
  defectoAllResponse: DefectoAllResponse[];
  fetchAllData: () => void;
}

const TableSectionDefecto: React.FC<TableSectionDefecto> = ({
  defectoAllResponse: DefectoAllResponse,
  fetchAllData,
}) => {
  const [TableSectionCasosUso, setSelectedCasoPrueba] =
    useState<DefectoAllResponse | null>(null);
  const [isLoading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const openEditModal = (casoUso: DefectoAllResponse) => {
    setSelectedCasoPrueba(casoUso);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCasoPrueba(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (casoUso: DefectoAllResponse) => {
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
        <h3 className="text-lg font-bold mb-4">Defectos detectados</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">ID</th>
                <th className="px-4 py-2 border-b text-left">Descripción</th>
                <th className="px-4 py-2 border-b text-left">Detectado por</th>
                <th className="px-4 py-2 border-b text-left">
                  Fecha de deteccion
                </th>
                <th className="px-4 py-2 border-b text-left">
                  Fecha de actualizacion
                </th>
                <th className="px-4 py-2 border-b text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {DefectoAllResponse.length > 0 ? (
                DefectoAllResponse.map((CasoUsoConProyecto) => (
                  <tr key={CasoUsoConProyecto.defecto_id}>
                    <td className="px-4 py-4 border-b">
                      {"" + CasoUsoConProyecto.defecto_id}
                    </td>
                    <td
                      className="px-4 py-4 border-b max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                      title={CasoUsoConProyecto.defecto_descripcion}
                    >
                      {CasoUsoConProyecto.defecto_descripcion}
                    </td>
                    <td
                      className="px-4 py-4 border-b max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                      title={
                        CasoUsoConProyecto.creador_nombre +
                        " " +
                        CasoUsoConProyecto.creador_apellido
                      }
                    >
                      {CasoUsoConProyecto.creador_nombre +
                        " " +
                        CasoUsoConProyecto.creador_apellido}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {format(
                        new Date(CasoUsoConProyecto.defecto_fecha_creacion),
                        "dd/MM/yyyy"
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {format(
                        new Date(
                          CasoUsoConProyecto.defecto_fecha_actualizacion
                        ),
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
      <EditDefectoModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        defectoAllResponse={TableSectionCasosUso}
        fetchAllData={fetchAllData}
      />
      <DeleteDefectoModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        defectoAllResponse={TableSectionCasosUso}
        fetchAllData={fetchAllData}
      />
    </>
  );
};

export default TableSectionDefecto;
