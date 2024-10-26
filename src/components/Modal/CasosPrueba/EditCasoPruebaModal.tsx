import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CasoPruebaConCasoUso,
  CasoUsoConFechaCreacion,
} from "../../../types/Proyecto";
import { Usuario } from "../../../types";
import { HiX } from "react-icons/hi";
import { getAllUsuarios } from "../utils/getAllUsuarios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  casoPruebaConCasoUso: CasoPruebaConCasoUso | null;
  fetchAllData: () => void;
}

const EditCasoPruebaModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  casoPruebaConCasoUso,
  fetchAllData,
}) => {
  const [editableCasoPruebaConCasoUso, setEditableCasoPruebaConCasoUso] =
    useState<CasoPruebaConCasoUso>(
      casoPruebaConCasoUso ?? {
        id: 0,
        id_caso_uso: 0,
        creado_por: 0,
        creador_nombre: "",
        creador_apellido: "",
        caso_uso_titulo: "",
        caso_prueba_titulo: "",
        caso_prueba_descripcion: "",
        caso_prueba_creacion: "",
        caso_prueba_estado: "",
      }
    );
  const [usuariosList, setUsuarios] = useState<Usuario[]>([]);
  const [casosUsoList, setcasosUsoList] = useState<CasoUsoConFechaCreacion[]>(
    []
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditableCasoPruebaConCasoUso((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null, field: string) => {
    setEditableCasoPruebaConCasoUso((prev) => ({
      ...prev,
      [field]: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  const onSave = async (CasoPruebaConCasoUso: CasoPruebaConCasoUso) => {
    try {
      console.log(JSON.stringify(CasoPruebaConCasoUso));
      // Guardar el caso de prueba (descomenta para habilitar la llamada a la API)
      const response = await fetch("/api/casos/updateCasoPrueba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CasoPruebaConCasoUso),
      });
      if (response.ok) {
        console.log("CasoPruebaConCasoUso guardado exitosamente");
        alert("CasoPruebaConCasoUso guardado exitosamente");
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
    onSave(editableCasoPruebaConCasoUso);
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
    const fetchCasosUsos = async () => {
      try {
        const response = await fetch("/api/casos/getAllCasosUso");
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("casosUsoData", JSON.stringify(data));
          setcasosUsoList(data);
        } else {
          console.error("Error al obtener los casos de uso");
        }
      } catch (error) {
        console.error("Error al conectar con el endpoint:", error);
      }
    };
    fetchCasosUsos();
    fetchUsuarios();
  }, []);

  useEffect(() => {
    if (casoPruebaConCasoUso) {
      setEditableCasoPruebaConCasoUso(casoPruebaConCasoUso);
    }
  }, [casoPruebaConCasoUso]);

  if (!isOpen || !casoPruebaConCasoUso) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Caso de Prueba</h2>
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
            <label htmlFor="caso_prueba_titulo" className="block font-semibold">
              Nombre del Caso de Prueba
            </label>
            <input
              type="text"
              id="caso_prueba_titulo"
              name="caso_prueba_titulo"
              value={editableCasoPruebaConCasoUso.caso_prueba_titulo}
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
              id="caso_prueba_descripcion"
              name="caso_prueba_descripcion"
              value={editableCasoPruebaConCasoUso.caso_prueba_descripcion}
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
              value={editableCasoPruebaConCasoUso.creado_por}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              {usuariosList.map((usuario) => (
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

          <div>
            <label htmlFor="id_caso_uso" className="block font-semibold">
              Caso de uso asignado
            </label>
            <select
              id="id_caso_uso"
              name="id_caso_uso"
              value={editableCasoPruebaConCasoUso.id_caso_uso}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              {casosUsoList.map((casoUso) => (
                <option
                  key={casoUso.caso_uso_id}
                  value={casoUso.caso_uso_id}
                  className="text-black"
                >
                  {casoUso.caso_uso_titulo}
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
                  editableCasoPruebaConCasoUso.caso_prueba_creacion
                    ? new Date(
                        editableCasoPruebaConCasoUso.caso_prueba_creacion
                      )
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

        <div>
          <label htmlFor="estado" className="block font-semibold">
            Estado del caso de prueba
          </label>
          <select
            id="escaso_prueba_estadotado"
            name="caso_prueba_estado"
            value={editableCasoPruebaConCasoUso.caso_prueba_estado}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
          >
            <option value="en progreso" className="text-black">
              En progreso
            </option>
            <option value="pendiente" className="text-black">
              Pendiente
            </option>
            <option value="completado" className="text-black">
              Completado
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

export default EditCasoPruebaModal;
