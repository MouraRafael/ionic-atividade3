import { Endereco } from "./endereco.model";
import { Materia } from "./materia.model";

export class Usuario {
  id!:string;
  username!:string;
  senha!:string;
  nome!:string
  email!:string;
  cpf!:number;

  materias!: Materia[];
  endereco!:Endereco;

}
