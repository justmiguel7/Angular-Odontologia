export class Turno {
  constructor(
    public dnipaciente: string,
    public dniodontologo: string,
    public fechaYHora: Date,
    public estado: string,
    public idturno?: number // <- este es opcional
  ) {}
}
