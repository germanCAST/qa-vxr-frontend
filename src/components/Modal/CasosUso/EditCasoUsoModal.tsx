import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CasoUsoConProyecto, Proyecto } from "../../../types/Proyecto";
import { HiX } from "react-icons/hi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  casoUsoConProyecto: CasoUsoConProyecto | null;
  fetchAllData: () => void;
}

const EditCasoUsoModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  casoUsoConProyecto: CasoUsoConProyecto,
  fetchAllData,
}) => {
  const [editableCasoUsoConProyecto, setEditableCasoUsoConProyecto] =
    useState<CasoUsoConProyecto>(
      CasoUsoConProyecto ?? {
        caso_uso_id: 0,
        id_proyecto: 0,
        proyecto_nombre: "",
        caso_uso_titulo: "",
        caso_uso_descripcion: "",
        caso_uso_creacion: "",
      }
    );

  const [, setcasosProyectoList] = useState<CasoUsoConProyecto[]>([]);
  const [proyectosList, setProyectoList] = useState<Proyecto[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditableCasoUsoConProyecto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null, field: string) => {
    setEditableCasoUsoConProyecto((prev) => ({
      ...prev,
      [field]: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  const onSave = async (CasoUsoConProyecto: CasoUsoConProyecto) => {
    try {
      console.log(JSON.stringify(CasoUsoConProyecto));
      // Guardar el caso de prueba (descomenta para habilitar la llamada a la API)
      const response = await fetch("/api/casos/updateCasoUso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CasoUsoConProyecto),
      });
      if (response.ok) {
        console.log("CasoUsoConProyecto guardado exitosamente");
        alert("CasoUsoConProyecto guardado exitosamente");
        fetchAllData();
      } else {
        console.error("Error al guardar:", response.statusText);
        alert(`Error al guardar: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    onSave(editableCasoUsoConProyecto);
    onClose();
  };

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        //pruebas con all proyectos
        const response = await fetch("/api/data/proyectos");
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("gettedCasosUso", JSON.stringify(data));
          setProyectoList(data);
        } else {
          console.error("Error al obtener los proyectos");
        }
      } catch (error) {
        console.error("Error al conectar con el endpoint:", error);
      }
    };
    const fetchCasosUsos = async () => {
      try {
        //pruebas con all proyectos
        const response = await fetch("/api/casos/getAllCasosUso");
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("casosUsoData", JSON.stringify(data));
          setcasosProyectoList(data);
        } else {
          console.error("Error al obtener los casos de uso");
        }
      } catch (error) {
        console.error("Error al conectar con el endpoint:", error);
      }
    };
    fetchProyectos();
    fetchCasosUsos();
  }, []);

  useEffect(() => {
    if (CasoUsoConProyecto) {
      setEditableCasoUsoConProyecto(CasoUsoConProyecto);
    }
  }, [CasoUsoConProyecto]);

  // Función para eliminar duplicados basado en el id_proyecto

  if (!isOpen || !CasoUsoConProyecto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Caso de Uso</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario de edición */}
        <div className="space-y-4">
          <div>
            <label htmlFor="caso_uso_titulo" className="block font-semibold">
              Nombre del Caso de Uso
            </label>
            <input
              type="text"
              id="caso_uso_titulo"
              name="caso_uso_titulo"
              value={editableCasoUsoConProyecto.caso_uso_titulo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>
          <div>
            <label
              htmlFor="caso_prueba_descripcion"
              className="block font-semibold"
            >
              Descripción
            </label>
            <textarea
              id="caso_uso_descripcion"
              name="caso_uso_descripcion"
              value={editableCasoUsoConProyecto.caso_uso_descripcion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          <div>
            <label htmlFor="id_proyecto" className="block font-semibold">
              Proyecto asignado
            </label>
            <select
              id="id_proyecto"
              name="id_proyecto"
              value={editableCasoUsoConProyecto.id_proyecto}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              {/* Renderizar la lista filtrada sin duplicados */}
              {proyectosList.map((proyecto) => (
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

          {/* Uso de DatePicker */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="caso_prueba_creacion"
                className="block font-semibold"
              >
                Fecha de creacion
              </label>
              <DatePicker
                selected={
                  editableCasoUsoConProyecto.caso_uso_creacion
                    ? new Date(editableCasoUsoConProyecto.caso_uso_creacion)
                    : null
                }
                onChange={(date) =>
                  handleDateChange(date, "caso_prueba_creacion")
                }
                dateFormat="dd/MM/yyyy"
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                id="caso_prueba_creacion"
                name="caso_prueba_creacion"
              />
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white font-bold rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCasoUsoModal;
