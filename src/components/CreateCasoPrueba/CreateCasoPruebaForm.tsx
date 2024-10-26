import React, { useEffect, useState } from "react";
import { CasoUsoConFechaCreacion, Usuario } from "../../types";
import { HiX } from "react-icons/hi";

interface CreateCasoPruebaForm {
  onClose: () => void;
  fetchAllData: () => void;
}

const CreateCasoPruebaForm: React.FC<CreateCasoPruebaForm> = ({
  onClose,
  fetchAllData,
}) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [casoPrueba_titulo, setcasoPrueba_titulo] = useState<string>("");
  const [casoPrueba_descripcion, setcasoPrueba_descripcion] =
    useState<string>("");
  const [casoUso, setcasoUso] = useState<string>("");
  const [casosUsoList, setcasosUsoList] = useState<CasoUsoConFechaCreacion[]>(
    []
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

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
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!casoPrueba_titulo || !casoPrueba_descripcion || !casoUso) {
      alert("Todos los campos son requeridos");
      return;
    }

    // Aquí puedes manejar el envío del formulario y guardar el nuevo Caso de Prueba
    const nuevoCasoPrueba = {
      casoPrueba_titulo: casoPrueba_titulo,
      casoPrueba_descripcion: casoPrueba_descripcion,
      casoPrueba_creacion: new Date().toLocaleDateString("es-ES"),
      casoPrueba_estado: "en progreso",
      id_caso_uso: casoUso,
      creado_por: user ? user.id : "",
    };

    console.log("Nuevo caso prueba creado:", nuevoCasoPrueba);
    try {
      console.log(JSON.stringify(nuevoCasoPrueba));
      //! verificar por que no se envia el body
      const response = await fetch("/api/casos/crearCasoPrueba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCasoPrueba),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Nuevo caso prueba exitosamente:", data);
        alert("Nuevo caso prueba con éxito");
        onClose();
        fetchAllData();
        //   // Limpiar el formulario después de crear el proyecto
        setcasoPrueba_titulo("");
        setcasoPrueba_descripcion("");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Crear Caso de Prueba</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Nombre del Proyecto */}
              <div className="mb-4">
                <label
                  htmlFor="projectName"
                  className="block text-sm font-mediums"
                >
                  Nombre del Caso de Prueba
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={casoPrueba_titulo}
                  onChange={(e) => setcasoPrueba_titulo(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                />
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <label
                  htmlFor="projectDescription"
                  className="block text-sm font-medium"
                >
                  Descripción de Caso de Prueba
                </label>
                <textarea
                  id="projectDescription"
                  value={casoPrueba_descripcion}
                  onChange={(e) => setcasoPrueba_descripcion(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                />
              </div>

              <div>
                <label
                  htmlFor="caso_uso_titulo"
                  className="block font-semibold"
                >
                  Caso de uso asignado
                </label>
                <select
                  id="id_caso_uso"
                  name="id_caso_uso"
                  value={casoUso}
                  onChange={(e) => setcasoUso(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                >
                  {casosUsoList.map((casoUso) => (
                    <option
                      key={casoUso.id}
                      value={casoUso.id}
                      className="text-black"
                    >
                      {casoUso.caso_uso_titulo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón de enviar */}
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
              >
                Crear Caso de Prueba
              </button>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default CreateCasoPruebaForm;
