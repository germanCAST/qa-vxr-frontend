import React, { useEffect, useState } from "react";
import { CasoPruebaConCasoUso, Usuario } from "../../types";
import { HiX } from "react-icons/hi";

interface CreateDefectoFormProps {
  onClose: () => void;
  fetchAllData: () => void;
}

const CreateDefectoForm: React.FC<CreateDefectoFormProps> = ({
  onClose,
  fetchAllData,
}) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [descripcion, setDescripcion] = useState<string>("");
  const [estado, setEstado] = useState<string>("pendiente");
  const [prioridad, setPrioridad] = useState<string>("media");
  const [asignadoA, setAsignadoA] = useState<string>("");
  const [casoPruebaId, setCasoPruebaId] = useState<string | "">("");
  const [casosPruebaList, setcasosPruebaList] = useState<
    CasoPruebaConCasoUso[]
  >([]);
  const [usuariosList, setUsuariosList] = useState<Usuario[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!descripcion || !estado || !prioridad || !asignadoA || !casoPruebaId) {
      alert("Todos los campos son requeridos");
      return;
    }

    const nuevoDefecto = {
      descripcion,
      estado,
      prioridad,
      fecha_creacion: new Date().toLocaleDateString("es-ES"),
      creado_por: user!.id,
      asignado_a: asignadoA,
      id_caso_prueba: casoPruebaId,
    };

    try {
      const response = await fetch("/api/defectos/createDefecto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoDefecto),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Defecto creado exitosamente:", data);
        alert("Defecto creado con éxito");
        onClose();
        fetchAllData();
        setDescripcion("");
        setEstado("pendiente");
        setPrioridad("media");
        setAsignadoA("");
        setCasoPruebaId("");
      } else {
        console.error("Error al crear el defecto:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Crear Defecto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Descripción del defecto */}
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium">
              Descripción
            </label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          {/* Estado */}
          <div className="mb-4">
            <label htmlFor="estado" className="block text-sm font-medium">
              Estado
            </label>
            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="resuelto">Resuelto</option>
            </select>
          </div>

          {/* Prioridad */}
          <div className="mb-4">
            <label htmlFor="prioridad" className="block text-sm font-medium">
              Prioridad
            </label>
            <select
              id="prioridad"
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>

          <div>
            <label htmlFor="asignado_id" className=" block font-semibold">
              Asignado a
            </label>
            <select
              id="asignado_id"
              name="asignado_id"
              value={asignadoA}
              onChange={(e) => setAsignadoA(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black mb-4"
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
              value={casoPruebaId}
              onChange={(e) => setCasoPruebaId(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded mt-1 text-black"
            >
              {casosPruebaList.map((caso) => (
                <option key={caso.id} value={caso.id}>
                  {caso.caso_prueba_titulo}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Crear Defecto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDefectoForm;
