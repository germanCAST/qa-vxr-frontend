import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components";
import { Usuario } from "../../types/Usuario";

const Layout: React.FC = () => {
  const storedUser = localStorage.getItem("user");
  const user: Usuario | null = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="min-h-screen w-full flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar user={user} />
      <main className="flex-1">
        <Outlet /> {}
      </main>
    </div>
  );
};

export default Layout;
