export interface DetalleDental {
  id?: number;
  turnoId: number;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  fechaRegistro?: string;
  diente_id: number;
}
