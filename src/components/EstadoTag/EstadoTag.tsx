import React from "react";

interface EstadoTagProps {
  estado: string;
}

const EstadoTag: React.FC<EstadoTagProps> = ({ estado }) => {
  const getEstadoClass = () => {
    switch (estado) {
      case "cerrado":
        return "bg-red-100 text-red-600";
      case "en progreso":
        return "bg-yellow-100 text-yellow-600";
      case "resuelto":
        return "bg-blue-100 text-blue-600";
      case "abierto":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full ${getEstadoClass()}`}>
      {estado}
    </span>
  );
};

export default EstadoTag;
