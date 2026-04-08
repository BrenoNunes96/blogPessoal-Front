import { useNavigate } from "react-router-dom";
import CardTema from "../cardTema/cardTema";
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../Service/service";
import { SyncLoader } from "react-spinners";

function ListaTemas(){
const navigate = useNavigate()
const[isLoading,setIsloading] = useState<boolean>(false)
const [temas,setTemas] = useState<Tema[]>([])   // usesate do tipo TEma ou seja os modelos do banco devem ser o mesmo do Tema
const {usuario,handleLogout} = useContext(AuthContext) 

const token = usuario.token

useEffect(()=>{
    if(token ===''){
        alert("voce precisa estar logado")
        navigate('/')
    }
},[token])


useEffect(()=>{
    // eslint-disable-next-line react-hooks/immutability
    buscarTemas()       // RENDERIZA AUTOMAETICAMENTE   A BUSCA DE TEMAS

},[temas.length])



async function buscarTemas (){
try{
setIsloading(true)
await buscar('/temas',setTemas, {    // aqui todos os temas sao retornados para setTemas
headers:{Authorization: token}

})

}catch(error:any){
    if(error.toString().includes('401')){
        handleLogout()
    }
}finally{
    setIsloading(false)
}

}




    return (                      // COMPONENTE DE VISUALIZAÇÃO DE CARD
        <>


        {isLoading &&( <div className ='flex justify-center w-full my-8'>       // se usestate isloading for true aparece 

<SyncLoader color="#312e81" size={32}/>   // SyncLoader que é o emoticon de carregamento


        </div>) }
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {
                    (!isLoading && temas.length === 0) && (
	<span className="text-3xl text-center my-8">
		Nenhum Tema foi encontrado!
	</span>
)

}
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                    {
temas.map((x)=>(<CardTema key={x.id} tema={x} />))       // CARDTEMA É RENDERIZADO COM KEY UNICA E TEMA UNICO PASSADOS POR TEMAS

                    }                  // TEMA DE CARDTEMA VEIO DO PROPRIO CARDTEMA, que é preenchido por temas que veio da api buscar com todo os temas

                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas;