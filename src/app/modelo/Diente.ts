export interface DetalleDental {
  id: number;
  turnoId: number;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  fechaRegistro: string;
}

export interface Diente {
  id: number;
  numero: string;
  nombre: string;
  cuadrante: string;
  dniPaciente: string;
  detalles: DetalleDental[];
}

