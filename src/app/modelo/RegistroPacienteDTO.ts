// src/app/modelo/registroPacienteDTO.ts
export class RegistroPacienteDTO {
  constructor(
    public nombre: string,
    public apellido: string,
    public direccion: string,
    public dni: string,
    public telefono: string,
    public username: string, // email
    public password: string,


  ) {}
}
