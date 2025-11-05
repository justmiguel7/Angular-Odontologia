import { Tratamiento } from './Tratamiento';


export interface HistorialClinico {
  idhistorial?: number;
  dnipaciente: string;
  dniodontologo: string;
  idturno: number;
  idtratamientos: number[];
  motivodeconsulta: string;
  fechadeconsulta: string;
  diagnostico: string;
  observaciones: string;
  alergias: string;
  antecedentesmedicos: string;
  totalCosto?: number;

    tratamientos?: Tratamiento[];  // los datos completos

}
