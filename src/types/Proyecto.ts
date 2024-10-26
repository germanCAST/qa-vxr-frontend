export interface Defecto {
  id: number;
  descripcion: string;
  estado: string;
  prioridad: string;
}

export interface CasoPrueba {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  defectos: Defecto[];
}

export interface CasoUso {
  id: number;
  titulo: string;
  descripcion: string;
  casosPrueba: CasoPrueba[];
}

export interface CasoUsoConFechaCreacion {
  id: number;
  caso_uso_id: number;
  caso_uso_titulo: string;
  caso_uso_descripcion: string;
  caso_uso_creacion: string;
}

export interface CasoUsoConProyecto {
  caso_uso_id: number;
  id_proyecto: number;
  proyecto_nombre: string;
  caso_uso_titulo: string;
  caso_uso_descripcion: string;
  caso_uso_creacion: string;
}

export interface CasoPruebaConCasoUso {
  id: number;
  id_caso_uso: number;
  creado_por: number;
  creador_nombre: string;
  creador_apellido: string;
  caso_uso_titulo: string;
  caso_prueba_titulo: string;
  caso_prueba_descripcion: string;
  caso_prueba_creacion: string;
  caso_prueba_estado: string;
}

export interface Proyecto {
  id: number;
  proyecto_nombre: string;
  proyecto_descripcion: string;
  estado: string;
  fecha_inicio: string;
  fecha_fin: string;
  creado_por: string;
  creado_por_id: string;
  casosUso: CasoUso[];
}

export interface DefectoAllResponse {
  defecto_id: number;
  defecto_descripcion: string;
  defecto_estado: string;
  defecto_prioridad: string;
  defecto_fecha_creacion: string;
  defecto_fecha_actualizacion: string;
  creador_id: number;
  creador_nombre: string;
  creador_apellido: string;
  asignado_id: number;
  asignado_nombre: string;
  asignado_apellido: string;
  caso_prueba_id: number;
  caso_prueba_titulo: string;
}
