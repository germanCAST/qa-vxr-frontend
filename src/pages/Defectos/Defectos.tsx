import React, { useState, useEffect } from "react";
import { Header, Pagination } from "../../components";

import { DefectoAllResponse } from "../../types/Proyecto";
import { Usuario } from "../../types/Usuario";
import TableSectionDefecto from "../../components/TableSection/TableSectionDefecto";

const Defectos: React.FC = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [DefectoAllResponse, setDefectoAllResponse] = useState<
    DefectoAllResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 11; // Definir cuántos ítems mostrar por página
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [casosUsoRes] = await Promise.all([
        fetch("/api/defectos/getAllDefectos"),
      ]);

      if (casosUsoRes.ok) {
        const casosUsoData = await casosUsoRes.json();
        localStorage.setItem(
          "casosUsoConProyectoData",
          JSON.stringify(casosUsoData)
        );
        setDefectoAllResponse(casosUsoData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
  const totalPages = Math.ceil(DefectoAllResponse.length / itemsPerPage);

  // Calcular los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = DefectoAllResponse.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
            <TableSectionDefecto
              defectoAllResponse={currentItems}
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

export default Defectos;
