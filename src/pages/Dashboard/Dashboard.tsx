import React, { useState, useEffect } from "react";
import {
  Header,
  CardsSection,
  Pagination,
  TableSection,
} from "../../components";

import { Proyecto } from "../../types/Proyecto";
import { Usuario } from "../../types/Usuario";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [totalProyectos, setTotalProyectos] = useState<number>(0);
  const [totalUsuarios, setTotalUsuarios] = useState<number>(0);
  const [totalCasos, setTotalCasos] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // Definir cuántos ítems mostrar por página
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [proyectosRes, countRes, usersRes, casosRes] = await Promise.all([
        fetch("/api/data/proyectos"),
        fetch("/api/data/proyectos/count"),
        fetch("/api/auth/count"),
        fetch("/api/casos/count"),
      ]);

      if (proyectosRes.ok) {
        const proyectosData = await proyectosRes.json();
        localStorage.setItem("proyectosData", JSON.stringify(proyectosData));
        setProyectos(proyectosData);
      }

      if (countRes.ok) {
        const countData = await countRes.json();
        setTotalProyectos(countData.total);
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setTotalUsuarios(usersData.total);
      }

      if (casosRes.ok) {
        const casosData = await casosRes.json();
        setTotalCasos(casosData.total_casos);
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
  const totalPages = Math.ceil(proyectos.length / itemsPerPage);

  // Calcular los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = proyectos.slice(indexOfFirstItem, indexOfLastItem);

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
        <CardsSection
          totalProyectos={totalProyectos}
          totalUsuarios={totalUsuarios}
          totalCasos={totalCasos}
        />
        {loading ? (
          <div className="text-center">Cargando datos...</div>
        ) : (
          <>
            <TableSection
              proyectos={currentItems}
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

export default Dashboard;
