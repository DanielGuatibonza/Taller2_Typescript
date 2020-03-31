export class Student {
    nombreCompleto : string;
    informacion : [number, number, number, string, number];
  
    constructor(nombreCompleto : string, informacion : [number, number, number, string, number]) {
      this.nombreCompleto = nombreCompleto;
      this.informacion = informacion;
    }
}