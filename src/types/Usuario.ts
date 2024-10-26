export interface Usuario {
  id: string;
  name: string;
  lastname: string;
  type: string;
}

export interface CompleteUser {
  id: number;
  nombre_usuario: string;
  correo_electronico: string;
  contrasena: string;
  rol: string;
  fecha_creacion: string;
  nombre: string;
  apellido: string;
}
