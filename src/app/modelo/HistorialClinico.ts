export class HistorialClinico{

  constructor(public idhistorial : number ,public idpaciente : number, public idodontologo : number, public idtratamiento : number, public motivodeconsulta : string, public fechadeconsulta : Date, public diagnostico : string, public observaciones : string, public alergias : String, public antecedentesmedicos : String){

  }
}

