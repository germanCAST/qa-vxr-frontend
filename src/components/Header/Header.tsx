import React from "react";
import CreateProjectForm from "../CreateProject/CreateProjectForm";
import CreateCasoPruebaForm from "../CreateCasoPrueba/CreateCasoPruebaForm"; // Asegúrate de crear estos componentes
import CreateDefectoForm from "../CreateDefecto/CreateDefectoForm"; // Asegúrate de crear estos componentes
import CreateCasoUsoForm from "../CreateCasoUso/CreateCasoUsoForm"; // Asegúrate de crear estos componentes
import {
  ClipboardIcon,
  ExclamationCircleIcon,
  DocumentTextIcon,
  FolderIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import CreateUsuario from "../CreateUsuario/CreateUsuario";

interface HeaderProps {
  userName: string;
  fetchAllData: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, fetchAllData }) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = React.useState(false);
  const [isCasoPruebaModalOpen, setIsCasoPruebaModalOpen] =
    React.useState(false);
  const [isDefectoModalOpen, setIsDefectoModalOpen] = React.useState(false);
  const [isCasoUsoModalOpen, setIsCasoUsoModalOpen] = React.useState(false);
  const [isUsuarioModalOpen, setIsUsuarioModalOpen] = React.useState(false);

  const handleOpenProjectModal = () => {
    setIsProjectModalOpen(true);
  };

  const handleOpenCasoPruebaModal = () => {
    setIsCasoPruebaModalOpen(true);
  };

  const handleOpenDefectoModal = () => {
    setIsDefectoModalOpen(true);
  };

  const handleOpenCasoUsoModal = () => {
    setIsCasoUsoModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
  };

  const handleCloseCasoPruebaModal = () => {
    setIsCasoPruebaModalOpen(false);
  };

  const handleCloseDefectoModal = () => {
    setIsDefectoModalOpen(false);
  };

  const handleCloseCasoUsoModal = () => {
    setIsCasoUsoModalOpen(false);
  };

  const handleOpenUsuarioModal = () => {
    setIsUsuarioModalOpen(true);
  };

  const handleCloseUsuarioModal = () => {
    setIsUsuarioModalOpen(false);
  };

  return (
    <header className="flex justify-between items-center w-full">
      <h2 className="text-2xl font-bold">Hola, {userName || "Usuario"}</h2>

      {/* Botones */}
      <div className="flex space-x-4">
        {/* Botón Crear Proyecto */}
        <button
          onClick={handleOpenProjectModal}
          className="flex items-center space-x-4 px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm"
        >
          <span className="ml-2">Crear Proyecto</span>
          <ClipboardIcon className="space-x-4 h-5 w-5 text-gray-500 mr-2" />
        </button>

        {/* Botón Crear Caso Prueba */}
        <button
          onClick={handleOpenCasoPruebaModal}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm"
        >
          <span className="ml-2">Crear Caso Prueba</span>
          <ExclamationCircleIcon className="h-5 w-5 text-gray-500 mr-2" />
        </button>

        {/* Botón Crear Caso Uso */}
        <button
          onClick={handleOpenCasoUsoModal}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm"
        >
          <span className="ml-2">Crear Caso Uso</span>
          <FolderIcon className="h-5 w-5 text-gray-500 mr-2" />
        </button>

        {/* Botón Crear Defecto */}
        <button
          onClick={handleOpenDefectoModal}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm"
        >
          <span className="ml-2">Crear Defecto</span>

          <DocumentTextIcon className="h-5 w-5 text-gray-500 mr-2" />
        </button>

        {/* Botón Crear Usuario */}
        <button
          onClick={handleOpenUsuarioModal}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm"
        >
          <span className="ml-2">Crear Usuario</span>
          <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
        </button>
      </div>

      {/* Modales */}
      {isProjectModalOpen && (
        <CreateProjectForm
          onClose={handleCloseProjectModal}
          fetchAllData={fetchAllData}
        />
      )}

      {isUsuarioModalOpen && (
        <CreateUsuario
          onClose={handleCloseUsuarioModal}
          fetchAllData={fetchAllData}
        />
      )}

      {isCasoPruebaModalOpen && (
        <CreateCasoPruebaForm
          onClose={handleCloseCasoPruebaModal}
          fetchAllData={fetchAllData}
        />
      )}

      {isDefectoModalOpen && (
        <CreateDefectoForm
          onClose={handleCloseDefectoModal}
          fetchAllData={fetchAllData}
        />
      )}

      {isCasoUsoModalOpen && (
        <CreateCasoUsoForm
          onClose={handleCloseCasoUsoModal}
          fetchAllData={fetchAllData}
        />
      )}
    </header>
  );
};

export default Header;
