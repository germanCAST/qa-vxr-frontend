import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import {
  CasoPruebaConCasoUso,
  DefectoAllResponse,
} from "../../../types/Proyecto";
import { HiX } from "react-icons/hi";
import { Usuario } from "../../../types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defectoAllResponse: DefectoAllResponse | null;
  fetchAllData: () => void;
}

const EditDefectoModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  defectoAllResponse,
  fetchAllData,
}) => {
  const [editableDefecto, setEditableDefecto] = useState<DefectoAllResponse>(
    defectoAllResponse ?? {
      defecto_id: 0,
      defecto_descripcion: "",
      defecto_estado: "",
      defecto_prioridad: "",
      defecto_fecha_creacion: "",
      defecto_fecha_actualizacion: "",
      creador_id: 0,
      creador_nombre: "",
      creador_apellido: "",
      asignado_id: 0,
      asignado_nombre: "",
      asignado_apellido: "",
      caso_prueba_id: 0,
      caso_prueba_titulo: "",
    }
  );

  const [casosPruebaList, setcasosPruebaList] = useState<
    CasoPruebaConCasoUso[]
  >([]);
  const [usuariosList, setUsuariosList] = useState<Usuario[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditableDefecto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async (defecto: DefectoAllResponse) => {
    try {
      const response = await fetch("/api/defectos/updateDefecto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(defecto),
      });
      if (response.ok) {
        alert("Defecto editado exitosamente");
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
    onSave(editableDefecto);
    onClose();
  };

  useEffect(() => {
    const fetchCasosPrueba = async () => {
      try {
        const response = await fetch("/api/casos/getAllCasosPrueba");
        if (response.ok) {
          const data = await response.json();
          setcasosPruebaList(data);
        } else {
          console.error("Error al obtener los proyectos");
        }
      } catch (error) {
        console.error("Error al conectar con el endpoint:", error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await fetch("/api/auth/getAllUsuarios"); // Cambia la ruta según tu API
        if (response.ok) {
          const data = await response.json();
          setUsuariosList(data);
        } else {
          console.error("Error al obtener los usuarios");
        }
      } catch (error) {
        console.error("Error al conectar con el endpoint:", error);
      }
    };

    fetchCasosPrueba();

    fetchUsuarios();
  }, []);

  useEffect(() => {
    if (defectoAllResponse) {
      setEditableDefecto(defectoAllResponse);
    }
  }, [defectoAllResponse]);

  if (!isOpen || !defectoAllResponse) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Defecto</h2>
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
            <label
              htmlFor="defecto_descripcion"
              className="block font-semibold"
            >
              Descripción del Defecto
            </label>
            <textarea
              id="defecto_descripcion"
              name="defecto_descripcion"
              value={editableDefecto.defecto_descripcion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          <div>
            <label htmlFor="defecto_prioridad" className="block font-semibold">
              Prioridad del Defecto
            </label>
            <select
              id="defecto_prioridad"
              name="defecto_prioridad"
              value={editableDefecto.defecto_prioridad}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>

          <div>
            <label htmlFor="defecto_estado" className="block font-semibold">
              Estado del Defecto
            </label>
            <select
              id="defecto_estado"
              name="defecto_estado"
              value={editableDefecto.defecto_estado}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              <option value="abierto">Abierto</option>
              <option value="en progreso">En Progreso</option>
              <option value="resuelto">Resuelto</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </div>

          <div>
            <label htmlFor="creador_id" className="block font-semibold">
              Creador
            </label>
            <select
              id="creador_id"
              name="creador_id"
              value={editableDefecto.creador_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              {usuariosList.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.name} {usuario.lastname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="asignado_id" className="block font-semibold">
              Asignado a
            </label>
            <select
              id="asignado_id"
              name="asignado_id"
              value={editableDefecto.asignado_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              {usuariosList.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.name} {usuario.lastname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="caso_prueba_id" className="block font-semibold">
              Caso de Prueba Relacionado
            </label>
            <select
              id="caso_prueba_id"
              name="caso_prueba_id"
              value={editableDefecto.caso_prueba_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              {casosPruebaList.map((caso) => (
                <option key={caso.id} value={caso.id}>
                  {caso.caso_prueba_titulo}
                </option>
              ))}
            </select>
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

export default EditDefectoModal;
