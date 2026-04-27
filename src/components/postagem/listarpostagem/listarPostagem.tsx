import  { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { buscar } from '../../../Service/service'

import type Postagem from '../../../models/postagem'
import Cardpostagem from '../cardPostagem/cardpostagem'
import { ToastAlerta } from '../../../util/ToastAlert'

export default function ListarPostagem() {

    const[Postagem,setPostagens] = useState<Postagem[]>([])
    const { usuario,handleLogout} = useContext(AuthContext)


const token = usuario.token

async function listagemdePostagem(){
    
try{
     
await buscar("/postagens",setPostagens,{
headers:{
    Authorization:token
}

})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
}catch(error:any){
    if(error.toString().includes("401")){
    handleLogout()
    ToastAlerta('voce deve estar logado','erro')
    }
}
}


useEffect(()=>{

listagemdePostagem()

// eslint-disable-next-line react-hooks/exhaustive-deps
},[Postagem.length])







  return (
    <div>

 <div>{Postagem.map((x)=>(<Cardpostagem key={x.id} postagem={x}/>))}</div>
      
    </div>
  )
}
