export class Materia{
  nome!:string;

  notas!:number[]
  media:number = this.calculaMedia()

  observacoes!:string


  calculaMedia():number{
    let resultado:number=0;

    this.notas.forEach(element => {
      resultado+=element
    });

    return resultado;
  }

}
