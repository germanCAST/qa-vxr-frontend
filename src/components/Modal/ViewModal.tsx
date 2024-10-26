import React from "react";
import { HiX } from "react-icons/hi";

import { calculateProgress } from "./utils/calculateProgress";
import ProgressBar from "@ramonak/react-progress-bar";
import { CasoPrueba, CasoUso, Defecto, Proyecto } from "../../types/Proyecto";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Proyecto | null;
  casosDeUso: CasoUso[] | null;
  casosDePrueba: CasoPrueba[] | null;
  defectos: Defecto[] | null;
}

const ViewModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  project: proyecto,
  casosDeUso: casosDeUso,
  casosDePrueba: casosDePrueba,
  defectos: defectos,
}) => {
  if (!isOpen || !proyecto) return null;
  const progress = calculateProgress(proyecto.fecha_inicio, proyecto.fecha_fin);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{proyecto.proyecto_nombre}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>
        <p className="py-4">
          <strong>Tiempo del Proyecto</strong>{" "}
          <p className="py-2">
            <ProgressBar
              completed={Math.floor(progress)}
              bgColor="#3b82f6"
              height="15px"
              labelAlignment="center"
              labelColor="#ffffff"
              labelSize="14px"
            />
          </p>
        </p>
        <p className="py-4">
          <strong>Descripción</strong>
          <div>{proyecto.proyecto_descripcion}</div>
        </p>
        <p className="py-4">
          <strong>Creado por</strong>
          <div>{proyecto.creado_por}</div>
        </p>

        <div className="space-y-4">
          {/* Sección de Casos de Uso */}
          <div className="py-2">
            <h3 className="font-semibold text-lg mb-2">Casos de Uso</h3>
            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              {casosDeUso && casosDeUso.length > 0 ? (
                <table className="min-w-full bg-white dark:bg-gray-800 border-collapse">
                  <thead className="sticky top-0 bg-white dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">
                        Caso de Uso
                      </th>
                      <th className="px-4 py-2 border-b text-left">
                        Descripción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {casosDeUso.map((caso) => (
                      <tr key={caso.id}>
                        <td className="px-4 py-2 border-b">{caso.titulo}</td>
                        <td className="px-4 py-2 border-b">
                          {caso.descripcion}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-4 py-2">
                  No hay casos de uso para este proyecto.
                </p>
              )}
            </div>
          </div>

          {/* Sección de Casos de Prueba */}
          <div className="py-2">
            <h3 className="font-semibold text-lg mb-2">Casos de Prueba</h3>
            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              {casosDePrueba && casosDePrueba.length > 0 ? (
                <table className="min-w-full bg-white dark:bg-gray-800 border-collapse">
                  <thead className="sticky top-0 bg-white dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Prueba</th>
                      <th className="px-4 py-2 border-b text-left">
                        Descripción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {casosDePrueba.map((casoPrueba) => (
                      <tr key={casoPrueba.id}>
                        <td className="px-4 py-2 border-b">
                          {casoPrueba.titulo}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {casoPrueba.descripcion}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-4 py-2">
                  No hay casos de prueba para este proyecto.
                </p>
              )}
            </div>
          </div>

          {/* Sección de Defectos */}
          <div className="py-2">
            <h3 className="font-semibold text-lg mb-2">Defectos</h3>
            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              {defectos && defectos.length > 0 ? (
                <table className="min-w-full bg-white dark:bg-gray-800 border-collapse">
                  <thead className="sticky top-0 bg-white dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Defecto</th>
                      <th className="px-4 py-2 border-b text-left">
                        Prioridad
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {defectos.map((defecto) => (
                      <tr key={defecto.id}>
                        <td className="px-4 py-2 border-b">
                          {defecto.descripcion}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {defecto.prioridad}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-4 py-2">No hay defectos en este proyecto.</p>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ViewModal;
