import React, { useState } from "react";
import { CasoPruebaConCasoUso } from "../../types/Proyecto";
import { format } from "date-fns";
import { EstadoTag } from "../index";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import LoadingModal from "../Modal/LoadingModal";
import EditCasoPruebaModal from "../Modal/CasosPrueba/EditCasoPruebaModal";
import DeleteProyectoModal from "../Modal/CasosPrueba/DeleteCasoPruebaModal";

interface TableSectionCasosPruebaProps {
  CasoPruebaConCasoUso: CasoPruebaConCasoUso[];
  fetchAllData: () => void;
}

const TableSectionCasosPrueba: React.FC<TableSectionCasosPruebaProps> = ({
  CasoPruebaConCasoUso: CasoPruebaConCasoUso,
  fetchAllData,
}) => {
  const [selectedCasoPrueba, setSelectedCasoPrueba] =
    useState<CasoPruebaConCasoUso | null>(null);
  const [isLoading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const openEditModal = (casoPrueba: CasoPruebaConCasoUso) => {
    setSelectedCasoPrueba(casoPrueba);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCasoPrueba(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (casoPrueba: CasoPruebaConCasoUso) => {
    setSelectedCasoPrueba(casoPrueba);
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
        <h3 className="text-lg font-bold mb-4">Casos de Prueba</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Caso de Prueba</th>
                <th className="px-4 py-2 border-b text-left">Descripción</th>
                <th className="px-4 py-2 border-b text-left">Estado</th>
                <th className="px-4 py-2 border-b text-left">Creado por</th>
                <th className="px-4 py-2 border-b text-left">
                  Fecha de inicio
                </th>
                <th className="px-4 py-2 border-b text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {CasoPruebaConCasoUso.length > 0 ? (
                CasoPruebaConCasoUso.map((CasoPConCasoUso) => (
                  <tr key={CasoPConCasoUso.id}>
                    <td className="px-4 py-4 border-b">
                      {CasoPConCasoUso.caso_prueba_titulo}
                    </td>
                    <td
                      className="px-4 py-4 border-b max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                      title={CasoPConCasoUso.caso_prueba_descripcion}
                    >
                      {CasoPConCasoUso.caso_prueba_descripcion}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <EstadoTag estado={CasoPConCasoUso.caso_prueba_estado} />
                    </td>
                    <td className="px-4 py-2 border-b">
                      {CasoPConCasoUso.creador_nombre +
                        " " +
                        CasoPConCasoUso.creador_apellido}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {format(
                        new Date(CasoPConCasoUso.caso_prueba_creacion),
                        "dd/MM/yyyy"
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex space-x-5">
                        <button
                          onClick={() => openEditModal(CasoPConCasoUso)}
                          className="flex items-center justify-center space-x-1 text-yellow-500 hover:text-yellow-700"
                        >
                          <i className="text-lg">
                            <HiPencilAlt />
                          </i>
                        </button>
                        <button
                          onClick={() => openDeleteModal(CasoPConCasoUso)}
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
      <EditCasoPruebaModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        casoPruebaConCasoUso={selectedCasoPrueba}
        fetchAllData={fetchAllData}
      />
      <DeleteProyectoModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        CasoPruebaConCasoUso={selectedCasoPrueba}
        fetchAllData={fetchAllData}
      />
    </>
  );
};

export default TableSectionCasosPrueba;
