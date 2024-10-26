import React from "react";

interface CardsSectionProps {
  totalProyectos: number;
  totalUsuarios: number;
  totalCasos: number;
}

const CardsSection: React.FC<CardsSectionProps> = ({
  totalProyectos,
  totalUsuarios,
  totalCasos,
}) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Proyectos</h3>
        <p className="text-3xl font-bold">{totalProyectos}</p>
        <p className="text-green-500 mt-1">+16% este mes</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Colaboradores</h3>
        <p className="text-3xl font-bold">{totalUsuarios}</p>
        <p className="text-red-500 mt-1">-1% este mes</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Casos</h3>
        <p className="text-3xl font-bold">{totalCasos}</p>
      </div>
    </section>
  );
};

export default CardsSection;
