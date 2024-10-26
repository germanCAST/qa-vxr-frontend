import React, { useEffect, useState } from "react";
import { Proyecto, Usuario } from "../../types";
import { HiX } from "react-icons/hi";

interface CreateCasoUsoForm {
  onClose: () => void;
  fetchAllData: () => void;
}

const CreateCasoUsoForm: React.FC<CreateCasoUsoForm> = ({
  onClose,
  fetchAllData,
}) => {
  const [, setUser] = useState<Usuario | null>(null);
  const [casoUsoTitulo, setCasoUsoTitulo] = useState<string>(""); // Cambio a título de Caso de Uso
  const [casoUsoDescripcion, setCasoUsoDescripcion] = useState<string>(""); // Cambio a descripción de Caso de Uso
  const [proyectoList, setProyectoList] = useState<Proyecto[]>([]); // Cambié el tipo de lista a "any[]"
  const [proyectoId, setProyectoId] = useState<string>(""); // Cambié el tipo de lista a "any[]"
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchProyectos = async () => {
      try {
        const response = await fetch("/api/data/proyectos");
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("gettedProyectos", JSON.stringify(data));
          setProyectoList(data); // Cambié esto para llenar correctamente la lista de proyectos
        } else {
          console.error("Error al obtener los proyectos");
        }
      } catch (error) {
        console.error("Error al conectar con el endpoint:", error);
      }
    };
    fetchProyectos();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!casoUsoTitulo || !casoUsoDescripcion || !proyectoId) {
      alert("Todos los campos son requeridos");
      return;
    }

    const nuevoCasoUso = {
      id_proyecto: proyectoId,
      titulo_caso_uso: casoUsoTitulo,
      descripcion_caso_uso: casoUsoDescripcion,
      creacion_caso_uso: new Date().toLocaleDateString("es-ES"),
    };

    try {
      const response = await fetch("/api/casos/crearCasoUso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCasoUso),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Caso de Uso creado exitosamente:", data);
        alert("Caso de Uso creado con éxito");
        onClose();
        fetchAllData();
        setCasoUsoTitulo("");
        setCasoUsoDescripcion("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Crear Caso de Uso</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="casoUsoTitulo"
              className="block text-sm font-medium"
            >
              Nombre del Caso de Uso
            </label>
            <input
              type="text"
              id="casoUsoTitulo"
              value={casoUsoTitulo}
              onChange={(e) => setCasoUsoTitulo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="casoUsoDescripcion"
              className="block text-sm font-medium"
            >
              Descripción
            </label>
            <textarea
              id="casoUsoDescripcion"
              value={casoUsoDescripcion}
              onChange={(e) => setCasoUsoDescripcion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          {/* Seleccionar Proyecto */}
          <div className="mb-4">
            <label htmlFor="id_proyecto" className="block text-sm font-medium">
              Proyecto asignado
            </label>
            <select
              id="id_proyecto"
              name="id_proyecto"
              onChange={(e) => setProyectoId(e.target.value)} // Aquí deberías actualizar el proyecto asignado
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              {/* Renderizar la lista filtrada sin duplicados */}
              {proyectoList.map((proyecto) => (
                <option
                  key={proyecto.id}
                  value={proyecto.id}
                  className="text-black"
                >
                  {proyecto.proyecto_nombre}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Crear Caso de Uso
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCasoUsoForm;
