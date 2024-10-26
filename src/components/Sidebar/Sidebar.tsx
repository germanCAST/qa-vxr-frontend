import React from "react";
import { Link } from "react-router-dom";
import { Usuario } from "../../types/Usuario";

interface SidebarProps {
  user: Usuario | null;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8">Qa lite - VXR</h1>
        <nav className="space-y-6">
          <Link
            to="/dashboard"
            className="block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/calendario"
            className="block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
          >
            Calendario
          </Link>
          <Link
            to="/casosPrueba"
            className="block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
          >
            Casos de Prueba
          </Link>
          <Link
            to="/casosUso"
            className="block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
          >
            Casos de Uso
          </Link>
          <Link
            to="/defectos"
            className="block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
          >
            Defectos
          </Link>
          <Link
            to="/usuarios"
            className="block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
          >
            Usuarios
          </Link>
        </nav>
      </div>
      <div className="mt-8">
        <div className="flex items-center space-x-4">
          <div>
            <p className="font-semibold">
              {user?.name + " " + user?.lastname || "Nombre de usuario"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.type || "Tipo de usuario"}
            </p>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=random&color=fff`}
            alt="Foto de perfil"
            className="w-12 h-12 rounded-full"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
