import type Tema from "./tema"
import type Usuario from "./usuario"
export default interface Postagem{
id:number,
titulo:string,
texto:string,
data:string,
Tema:Tema |null,
Usiario: Usuario | null

}