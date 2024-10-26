import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Proyecto } from "../../types/Proyecto";
import { Usuario } from "../../types";
import { HiX } from "react-icons/hi";
import { getAllUsuarios } from "./utils/getAllUsuarios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Proyecto | null;
  fetchAllData: () => void;
}

interface editableProject {
  id: number;
  proyecto_nombre: string;
  proyecto_descripcion: string;
  estado: string;
  fecha_inicio: string;
  fecha_fin: string;
}

const EditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  project,
  fetchAllData,
}) => {
  const [editableProject, setEditableProject] = useState<Proyecto>(
    project ?? {
      id: 0,
      proyecto_nombre: "",
      proyecto_descripcion: "",
      estado: "",
      fecha_inicio: "",
      fecha_fin: "",
      creado_por: "",
      creado_por_id: "",
      casosUso: [],
    }
  );
  const [usuariosList, setUsuarios] = useState<Usuario[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditableProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null, field: string) => {
    setEditableProject((prev) => ({
      ...prev,
      [field]: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  const onSave = async (editableProject: editableProject) => {
    try {
      console.log(editableProject);
      const response = await fetch("/api/data/proyectos/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableProject),
      });
      if (response.ok) {
        console.log("Proyecto guardado exitosamente");
        alert("Proyecto guardado exitosamente");
        fetchAllData();
      } else {
        console.error("Error al guardar el proyecto:", response.statusText);
        alert(`Error al guardar el proyecto: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editableProject);
    }
    onClose();
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await getAllUsuarios();
        if (response) {
          const data = await response;
          setUsuarios(data);
        } else {
          console.error("Error al obtener los usuarios");
        }
      } catch (error) {
        console.error("Error al conectar con el endpoint:", error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    if (project) {
      setEditableProject(project);
    }
  }, [project]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Proyecto</h2>
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
            <label htmlFor="proyecto_nombre" className="block font-semibold">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              id="proyecto_nombre"
              name="proyecto_nombre"
              value={editableProject.proyecto_nombre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>
          <div>
            <label
              htmlFor="proyecto_descripcion"
              className="block font-semibold"
            >
              Descripción
            </label>
            <textarea
              id="proyecto_descripcion"
              name="proyecto_descripcion"
              value={editableProject.proyecto_descripcion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>
          <div>
            <label htmlFor="creado_por" className="block font-semibold">
              Creado por
            </label>
            <select
              id="creado_por"
              name="creado_por"
              value={editableProject.creado_por_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              {usuariosList
                .filter(
                  (usuario) =>
                    usuario.name + usuario.lastname !==
                    editableProject.creado_por
                )
                .map((usuario) => (
                  <option
                    key={usuario.id}
                    value={usuario.id}
                    className="text-black"
                  >
                    {usuario.name + " " + usuario.lastname}
                  </option>
                ))}
            </select>
          </div>

          {/* Uso de DatePicker */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="fecha_inicio" className="block font-semibold">
                Fecha de inicio
              </label>
              <DatePicker
                selected={
                  editableProject.fecha_inicio
                    ? new Date(editableProject.fecha_inicio)
                    : null
                }
                onChange={(date) => handleDateChange(date, "fecha_inicio")}
                dateFormat="dd/MM/yyyy"
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                id="fecha_inicio"
                name="fecha_inicio"
              />
            </div>
            <div>
              <label htmlFor="fecha_fin" className="block font-semibold">
                Fecha de fin
              </label>
              <DatePicker
                selected={
                  editableProject.fecha_fin
                    ? new Date(editableProject.fecha_fin)
                    : null
                }
                onChange={(date) => handleDateChange(date, "fecha_fin")}
                dateFormat="dd/MM/yyyy"
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                id="fecha_fin"
                name="fecha_fin"
                wrapperClassName="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="estado" className="block font-semibold">
            Estado del proyecto
          </label>
          <select
            id="estado"
            name="estado"
            value={editableProject.estado}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
          >
            <option value="en progreso" className="text-black">
              En progreso
            </option>
            <option value="abierto" className="text-black">
              Abierto
            </option>
            <option value="resuelto" className="text-black">
              Resuelto
            </option>
            <option value="cerrado" className="text-black">
              Cerrado
            </option>
          </select>
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

export default EditModal;
