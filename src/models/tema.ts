import type Postagem from "./postagem"

export default interface Tema{
id:number,
descricao:string,
postagem?:Postagem[]|null;


}