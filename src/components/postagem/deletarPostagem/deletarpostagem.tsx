import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { buscar, deletar } from '../../../Service/service'
import type Postagem from '../../../models/postagem'
import { ClipLoader } from 'react-spinners'
import { ToastAlerta } from '../../../util/ToastAlert'


export default function Deletarpostagem() {
const {id} = useParams<{id:string}>()
const[isloading,setIsLoading] = useState<boolean>(false)
const navigate = useNavigate()

const {handleLogout,usuario} = useContext(AuthContext)
const[Postagens,setPostagens]= useState<Postagem>({} as Postagem)  //GUARDA UM UNICO OBJETO

async function buscarId(){
    try{
await buscar(`/postagens/${id}`,setPostagens,{              // se tiver id vai seta todos os atributos daquela postagem
    Headers:{
        Authorization:usuario.token
    }})

    }catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			}
}
}

useEffect(() => {
		if (usuario.token === '') {
			ToastAlerta('Você precisa estar logado','erro')
			navigate('/')
		}
	}, [token])

useEffect(()=>{
if(id !== undefined){
buscarId()

}
},[id])





function retornar (){

    navigate("/postagens")
}

async function deletarPostagens(){
    		setIsLoading(true)
    try{
 await deletar (`/postagens/deletar/:${id}`,{
    headers:{
        Authorization:usuario.token
    }

 })
 ToastAlerta("deletado","sucesso")
     }catch(error:any){
        if(error.toString().includes('401')){
            console.log('nao autorizado')
handleLogout()
        }

		setIsLoading(false)
		retornar()
    }
}

    return (
	<div className="container w-1/3 mx-auto">
			<h1 className="text-4xl text-center my-4">
				Deletar Postagem
			</h1>

			<p className="text-center font-semibold mb-4">
				Você tem certeza de que deseja apagar a postagem a
				seguir?
			</p>

			<div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
				<header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
					Postagem
				</header>
				<div className="p-4">
					<p className="text-xl h-full">
						{Postagens.titulo}
					</p>
					<p>{Postagens.texto}</p>
				</div>
				<div className="flex">
					<button
						className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
						onClick={retornar}
					>
						Não
					</button>
					<button
						className="w-full text-slate-100 bg-indigo-400 
                        hover:bg-indigo-600 flex items-center justify-center"
						onClick={deletarPostagens}
					>
						{isloading ? (
							<ClipLoader
								color="#ffffff"
								size={24}
							/>
						) : (
							<span>Sim</span>
						)}
					</button>
				</div>
			</div>
		</div>
  )
}
