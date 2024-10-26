import React from "react";
import { FaSpinner } from "react-icons/fa";

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  message = "Cargando...",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
        <FaSpinner className="animate-spin text-blue-500" size={40} />
        <p className="text-gray-700 dark:text-gray-100 mt-4">{message}</p>
      </div>
    </div>
  );
};

export default LoadingModal;
