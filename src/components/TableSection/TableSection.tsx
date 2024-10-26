import React, { useState } from "react";
import { CasoPrueba, CasoUso, Defecto, Proyecto } from "../../types/Proyecto";
import { format } from "date-fns";
import { EditModal, EstadoTag, ViewModal } from "../index";
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";
import LoadingModal from "../Modal/LoadingModal";
import { getCasosUsoByID } from "./utils/getCasosUsoByID";
import { getCasosPruebaByID } from "./utils/getCasosPruebaByID";
import { getDefectosByID } from "./utils/getDefectosByID";
import DeleteModal from "../Modal/DeleteModal";

interface TableSectionProps {
  proyectos: Proyecto[];
  fetchAllData: () => void;
}

const TableSection: React.FC<TableSectionProps> = ({
  proyectos,
  fetchAllData,
}) => {
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);
  const [selectedProjectCasosUso, setSelectedProjectCasosUso] = useState<
    CasoUso[] | null
  >(null);
  const [selectedProjectCasosPrueba, setSelectedProjectCasosPrueba] = useState<
    CasoPrueba[] | null
  >(null);
  const [selectedProjectDefectos, setSelectedProjectDefectos] = useState<
    Defecto[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const openViewModal = async (project: Proyecto) => {
    try {
      setIsLoading(true);

      const ProjectCasosUso = await getCasosUsoByID(project.id);
      const ProjectCasosPrueba = await getCasosPruebaByID(project.id);
      const ProjectDefectos = await getDefectosByID(project.id);

      if (ProjectCasosUso !== null) {
        setSelectedProjectCasosUso(ProjectCasosUso);
      } else {
        setSelectedProjectCasosUso(null);
      }

      if (ProjectCasosPrueba !== null) {
        setSelectedProjectCasosPrueba(ProjectCasosPrueba);
      } else {
        setSelectedProjectCasosPrueba(null);
      }

      if (ProjectDefectos !== null) {
        setSelectedProjectDefectos(ProjectDefectos);
      } else {
        setSelectedProjectDefectos(null);
      }

      setSelectedProject(project);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const closeViewModal = () => {
    setSelectedProject(null);
    setIsViewModalOpen(false);
  };

  const openEditModal = (project: Proyecto) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProject(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (project: Proyecto) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedProject(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <LoadingModal
        isOpen={isLoading}
        message="Obteniendo detalles del proyecto..."
      />
      <section className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Proyectos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Proyecto</th>
                <th className="px-4 py-2 border-b text-left">Descripcion</th>
                <th className="px-4 py-2 border-b text-left">Estado</th>
                <th className="px-4 py-2 border-b text-left">Creado por</th>
                <th className="px-4 py-2 border-b text-left">
                  Fecha de inicio
                </th>
                <th className="px-4 py-2 border-b text-left">
                  Fecha de finalización
                </th>
                <th className="px-4 py-2 border-b text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.length > 0 ? (
                proyectos.map((proyecto) => (
                  <tr key={proyecto.id}>
                    <td className="px-4 py-4 border-b">
                      {proyecto.proyecto_nombre}
                    </td>
                    <td
                      className="px-4 py-4 border-b max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                      title={proyecto.proyecto_descripcion}
                    >
                      {proyecto.proyecto_descripcion}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <EstadoTag estado={proyecto.estado} />
                    </td>
                    <td className="px-4 py-2 border-b">
                      {proyecto.creado_por}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {format(new Date(proyecto.fecha_inicio), "dd/MM/yyyy")}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {format(new Date(proyecto.fecha_fin), "dd/MM/yyyy")}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex space-x-5">
                        <button
                          onClick={() => openViewModal(proyecto)}
                          className="flex items-center justify-center space-x-1 text-blue-500 hover:text-blue-700"
                        >
                          <i className="text-lg">
                            <HiEye />
                          </i>
                        </button>
                        <button
                          onClick={() => openEditModal(proyecto)}
                          className="flex items-center justify-center space-x-1 text-yellow-500 hover:text-yellow-700"
                        >
                          <i className="text-lg">
                            <HiPencilAlt />
                          </i>
                        </button>
                        <button
                          onClick={() => openDeleteModal(proyecto)}
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
                    No hay proyectos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {/* Modal para ver los detalles del proyecto */}
      <ViewModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        project={selectedProject}
        casosDeUso={selectedProjectCasosUso ?? null}
        casosDePrueba={selectedProjectCasosPrueba ?? null}
        defectos={selectedProjectDefectos ?? null}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        project={selectedProject}
        fetchAllData={fetchAllData}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        project={selectedProject}
        fetchAllData={fetchAllData}
      />
    </>
  );
};

export default TableSection;
