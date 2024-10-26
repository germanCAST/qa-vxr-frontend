import React, { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { CompleteUser } from "../../../types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  completeUser: CompleteUser | null;
  fetchAllData: () => void;
}

const EditUserModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  completeUser,
  fetchAllData,
}) => {
  const [editableUser, setEditableUser] = useState<CompleteUser>(
    completeUser ?? {
      id: 0,
      nombre_usuario: "",
      correo_electronico: "",
      contrasena: "",
      rol: "",
      fecha_creacion: "",
      nombre: "",
      apellido: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async (user: CompleteUser) => {
    try {
      const response = await fetch("/api/auth/updateUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert("Cambios existosos");
        fetchAllData();
      } else {
        console.error("Error guardando cambios:", response.statusText);
        alert(`Error guardando: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    onSave(editableUser);
    onClose();
  };

  useEffect(() => {
    if (completeUser) {
      setEditableUser(completeUser);
    }
  }, [completeUser]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isOpen || !completeUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="nombre_usuario" className="block font-semibold">
              Username
            </label>
            <input
              type="text"
              id="nombre_usuario"
              name="nombre_usuario"
              value={editableUser.nombre_usuario}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          <div>
            <label htmlFor="correo_electronico" className="block font-semibold">
              Email
            </label>
            <input
              type="email"
              id="correo_electronico"
              name="correo_electronico"
              value={editableUser.correo_electronico}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          <div className="relative">
            <label htmlFor="contrasena" className="block font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="contrasena"
              name="contrasena"
              value={editableUser.contrasena}
              onChange={handleChange}
              onClick={togglePasswordVisibility}
              className="w-full p-2 pr-10 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          <div>
            <label htmlFor="rol" className="block font-semibold">
              Rol
            </label>
            <select
              id="rol"
              name="rol"
              value={editableUser.rol}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            >
              <option value="test">Tester</option>
              <option value="desarrollador">Desarrollador</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label htmlFor="nombre" className="block font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={editableUser.nombre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          <div>
            <label htmlFor="apellido" className="block font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={editableUser.apellido}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>

          <div>
            <label htmlFor="fecha_creacion" className="block font-semibold">
              Creation Date
            </label>
            <input
              type="date"
              id="fecha_creacion"
              name="fecha_creacion"
              value={editableUser.fecha_creacion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white font-bold rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
