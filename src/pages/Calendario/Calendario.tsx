import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/es"; // Importar el idioma español para moment
import { Proyecto } from "../../types";
import "./css/dark-theme.css";

// Configurar moment en español
moment.locale("es", {
  weekdays: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ], // Nombres completos de los días
  weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"], // Abreviaturas de los días
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ], // Nombres completos de los meses
  monthsShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ], // Abreviaturas de los meses
  week: {
    dow: 1, // La semana comienza el lunes
  },
});

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color?: string; // color es opcional
}

const Calendario = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]); // Estado para los eventos

  // Función que asigna un estilo basado en el color del evento
  const eventStyleGetter = (
    event: CalendarEvent
  ): { style: React.CSSProperties } => {
    const backgroundColor = event.color || "#3174ad"; // Usar el color del evento o un predeterminado
    const style: React.CSSProperties = {
      backgroundColor,
      borderRadius: "2px",
      opacity: 1.0,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style,
    };
  };

  useEffect(() => {
    // Cargar los proyectos desde localStorage
    const storedProjects = localStorage.getItem("proyectosData");
    if (storedProjects) {
      const proyectosData = JSON.parse(storedProjects);

      // Lista de colores para los eventos
      const colors = [
        "#FFB900", // Amarillo Microsoft
        "#D83B01", // Naranja oscuro
        "#B7472A", // Rojo PowerPoint
        "#0078D7", // Azul Microsoft (Word/Outlook)
        "#00BCF2", // Azul claro (OneDrive)
        "#107C10", // Verde oscuro Excel
        "#2D7D9A", // Azul oscuro (Azure DevOps)
        "#5C2D91", // Morado oscuro OneNote
        "#E81123", // Rojo brillante (alertas)
        "#6B69D6", // Azul suave Teams
      ];

      // Mapear los proyectos a eventos del calendario
      const mappedEvents = proyectosData.map(
        (proyecto: Proyecto, index: number) => ({
          id: proyecto.id,
          title: proyecto.proyecto_nombre, // Ajusta según la estructura de tus datos
          start: new Date(proyecto.fecha_inicio), // Asegúrate de que sea un formato de fecha válido
          end: new Date(proyecto.fecha_fin), // Asegúrate de que sea un formato de fecha válido
          allDay: false, // Puedes personalizar si es un evento de todo el día o no
          color: colors[index % colors.length], // Asignar color rotando entre la lista
        })
      );

      setEvents(mappedEvents); // Actualiza el estado de los eventos
    }
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white">
      <Calendar
        localizer={localizer}
        events={events} // Usar los eventos cargados del estado
        startAccessor="start"
        endAccessor="end"
        className="h-full bg-gray-900 text-white"
        defaultView="month"
        views={{
          month: true, // Vista de mes
          week: true, // Vista de semana
          day: false, // Desactivar vista de día (para no mostrar horas)
        }}
        selectable={true}
        popup
        eventPropGetter={eventStyleGetter} // Aplicar el estilo personalizado
        messages={{
          next: "Sig.",
          previous: "Ant.",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "No hay eventos en este rango.",
          allDay: "Todo el día", // Texto de evento de todo el día
          showMore: (count) => `+${count} más`, // Personalizar el "+2 more"
        }}
      />
    </div>
  );
};

export default Calendario;
