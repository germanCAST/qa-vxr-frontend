import React, { useState, useEffect } from "react";
import { Header, Pagination } from "../../components";

import { CompleteUser } from "../../types/Usuario";
import { Usuario } from "../../types/Usuario";
import TableSectionUsuarios from "../../components/TableSection/TableSectionUsuarios";

const Usuarios: React.FC = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [usuario, setUsuario] = useState<CompleteUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 11; // Definir cuántos ítems mostrar por página
  const fetchAllData = async () => {
    try {
      setLoading(true);

      const storedToken = localStorage.getItem("token");

      // Realiza la solicitud usando el método POST y el token en el cuerpo
      const AllUsuariosRes = await fetch("/api/auth/getCompleteAllUsuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: storedToken!.replace(/^"(.*)"$/, "$1") }),
      });

      if (AllUsuariosRes.ok) {
        const completeUser = await AllUsuariosRes.json();
        localStorage.setItem("AllUsuariosData", JSON.stringify(completeUser));
        setUsuario(completeUser);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`Error al obtener los datos de los usuarios ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) setUser(JSON.parse(storedUser));

    console.log(JSON.parse(storedUser!));

    fetchAllData();
  }, []);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(usuario.length / itemsPerPage);

  // Calcular los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuario.slice(indexOfFirstItem, indexOfLastItem);

  // Funciones para cambiar de página
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <Header
          userName={user?.name + " " + user?.lastname || "Usuario"}
          fetchAllData={fetchAllData}
        />

        {loading ? (
          <div className="text-center">Cargando datos...</div>
        ) : (
          <>
            <TableSectionUsuarios
              completeUser={currentItems}
              fetchAllData={fetchAllData}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Usuarios;
