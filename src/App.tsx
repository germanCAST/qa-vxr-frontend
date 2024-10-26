// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import "./App.css";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Calendario from "./pages/Calendario/Calendario";
import CasosPrueba from "./pages/CasosPrueba/CasosPrueba";
import CasosUso from "./pages/CasosUso/CasosUso";
import Defectos from "./pages/Defectos/Defectos";
import Usuarios from "./pages/Usuarios/Usuarios";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Router>
      <Routes>
        {/* Ruta para Login sin el Sidebar */}
        <Route path="/" element={<Login />} />

        {/* Rutas con Layout y Sidebar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/casosPrueba" element={<CasosPrueba />} />
          <Route path="/casosUso" element={<CasosUso />} />
          <Route path="/defectos" element={<Defectos />} />
          <Route path="/usuarios" element={<Usuarios />} />

          {/* Route for handling unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

function NotFound() {
  return <h1>Ruta no encontrada</h1>;
}

export default App;
