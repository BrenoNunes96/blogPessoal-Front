import type Tema from "./tema"
import type Usuario from "./usuario"
export default interface Postagem{
id:number,
titulo:string,
texto:string,
data:Date,
tema:Tema |null,
usuario: Usuario | null

}