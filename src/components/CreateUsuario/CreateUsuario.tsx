import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { CompleteUser } from "../../types";

interface CreateUsuarioProps {
  onClose: () => void;
  fetchAllData: () => void;
}

const CreateUsuario: React.FC<CreateUsuarioProps> = ({
  onClose,
  fetchAllData,
}) => {
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [correoElectronico, setCorreoElectronico] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [rol, setRol] = useState<string>("user"); // Default role as "user"
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !nombreUsuario ||
      !correoElectronico ||
      !contrasena ||
      !rol ||
      !nombre ||
      !apellido
    ) {
      alert("Todos los campos son requeridos");
      return;
    }

    const nuevoUsuario: CompleteUser = {
      id: 0, // This will be assigned by the backend
      nombre_usuario: nombreUsuario,
      correo_electronico: correoElectronico,
      contrasena: contrasena,
      rol: rol,
      fecha_creacion: new Date().toLocaleDateString("es-ES"),
      nombre: nombre,
      apellido: apellido,
    };

    try {
      const response = await fetch("/api/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Usuario creado exitosamente:", data);
        alert("Usuario creado con éxito");
        onClose();
        fetchAllData();
        setNombreUsuario("");
        setCorreoElectronico("");
        setContrasena("");
        setRol("user");
        setNombre("");
        setApellido("");
      } else {
        console.error("Error al crear el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Crear Usuario</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} autoComplete="new-password">
          {/* Nombre de Usuario */}
          <div className="mb-4">
            <label
              htmlFor="nombreUsuario"
              className="block text-sm font-medium"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          {/* Correo Electrónico */}
          <div className="mb-4">
            <label
              htmlFor="correoElectronico"
              className="block text-sm font-medium"
            >
              Correo Electrónico
            </label>
            <input
              autoComplete="off"
              type="email"
              id="correoElectronico"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="contrasena" className="block font-semibold">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="contrasena"
              name="contrasena"
              autoComplete="off"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              onClick={togglePasswordVisibility}
              className="w-full p-2 pr-10 border border-gray-300 rounded mt-1 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rol" className="block font-semibold">
              Rol
            </label>
            <select
              id="rol"
              name="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              <option value="test">Tester</option>
              <option value="desarrollador">Desarrollador</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          {/* Apellido */}
          <div className="mb-4">
            <label htmlFor="apellido" className="block text-sm font-medium">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUsuario;
