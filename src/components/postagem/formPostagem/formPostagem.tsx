import  { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react'
import type Postagem from '../../../models/postagem'

import { AuthContext } from '../../../contexts/AuthContext'
import { atualizar, buscar, cadastrar } from '../../../Service/service'
import {useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { ToastAlerta } from '../../../util/ToastAlert'
import type Tema from '../../../models/tema'

export default function FormPostagem() {
    	const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' })     // tema exata do id
const[postagem,setPostagem] = useState<Postagem>( {} as Postagem)
const navigate = useNavigate()
const {handleLogout,usuario} = useContext(AuthContext)

const {id} = useParams<{id:string}>() // params puxa id da url automaticamente

const[isloading,setIsloading]=useState<boolean>( false)
const [temas,setTemas]=useState<Tema[]>([])    // mostra todos os temas que vao esta no select
const token = usuario.token

async function buscaridPostagem(id:string){

    try{
await buscar(`/postagens/${id}`,setPostagem,{       // buscar postagem de acordo com o id que params pegou
    headers:{
        Authorization:token
    }
}
)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){     
        if(error.toString().includes("401")){
          ToastAlerta('voce deve estar logado',"erro")
                handleLogout()            
        }
    }
}

	async function buscarTemaPorId(id: string) {      // busca o tema associado ao id
		try {
			await buscar(`/temas/${id}`, setTema, {
				headers: { Authorization: token },
			})
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			}
		}
	}

	// Busca todos os Temas que serão inseridos no Select
	async function buscarTemas() {
		try {
			await buscar('/temas', setTemas, {
				headers: { Authorization: token },
			})
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			}
		}
	}
useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado', "info")
			navigate('/')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])

useEffect(()=>{
    buscarTemas()   //busca todos os temas que vao ser usados em select
if(id !== undefined){     
 buscaridPostagem(id)// se id nao for indefinido quer dizer que tem id entao ela existe logo atualizara o que ja tem no post
}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[id])

	useEffect(() => {
		setPostagem({                    // atualiza postagem ja com o tema que buscamos anteriormente em buscartemaid
			...postagem,
			tema: tema,
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tema])

async function gerarnovapostagem(e:SyntheticEvent<HTMLFormElement>){
      e.preventDefault()
    if(id ===undefined){
setIsloading(true)    //const de controle
    try{

  await cadastrar("/postagens/postar",postagem,setPostagem,{
headers:{
      Authorization: token  // token do usuario 
}
})


 ToastAlerta("cadatrado com sucesso","sucesso")

// eslint-disable-next-line @typescript-eslint/no-explicit-any
}catch(error:any){
     if(error.toString().includes("401")){                   // se o error tiver a string 401 é nao autorizado sem token
            alert('voce deve estar logado')
                handleLogout()            
        }
}finally{
    setIsloading(false)
}
}else{
    try{
await atualizar("/postagens/atualizar",postagem,setPostagem,{
    headers:{
        Authorization:token
        
    }

})
 ToastAlerta("atualizado com sucesso","sucesso")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){
        if(error.toString().includes('401')){
            ToastAlerta('voce deve estar logado','erro')
            handleLogout()
            navigate('/')
        }
    }
}

}



const atualizarEstado = (e:ChangeEvent<HTMLInputElement>)=>{
setPostagem({
    ...postagem,[e.target.name]:e.target.value,
    	tema:tema,
		usuario: usuario,
                  // atualiza constante postagem com valores dos inputes, nome e valor
})

}

  // puxa data do dia


	const carregandoTema = tema.descricao === ''

  return (
  <div className="container flex flex-col items-center justify-center mx-auto mb-8">
    <h1 className="text-4xl text-center my-8 font-bold text-slate-800">
        {id === undefined ? 'Cadastrar Postagem' : 'Editar Postagem'}
    </h1>

    <form onSubmit={gerarnovapostagem} className="w-full max-w-2xl flex flex-col gap-6 bg-slate-50 p-8 rounded-2xl shadow-lg border border-slate-200">
        
        {/* Campo Título */}
        <div className="flex flex-col gap-2">
            <label htmlFor="titulo" className="font-semibold text-slate-700 px-1">Título da postagem</label>
            <input
                type="text"
                placeholder="Insira um título impactante"
                name='titulo'
                value={postagem.titulo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                className="border-2 border-slate-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
            />
        </div>

        {/* Campo Texto */}
        <div className="flex flex-col gap-2">
            <label htmlFor="texto" className="font-semibold text-slate-700 px-1">Texto da postagem</label>
            <textarea
                placeholder="Sobre o que vamos falar hoje?"
                name='texto'
                value={postagem.texto}
                rows={4}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => atualizarEstado(e)}
                className="border-2 border-slate-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white resize-none"
            />
        </div>

        {/* Campo Tema */}
        <div className="flex flex-col gap-2">
            <label htmlFor="tema" className="font-semibold text-slate-700 px-1">ID do Tema</label>
            <input 
                type="text" 
                value={postagem.tema?.id} 
                name='tema' 
                placeholder='Ex: 1' 
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                className="border-2 border-slate-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
            />
        </div>
<div className="flex flex-col gap-2">
					<p>Tema da Postagem</p>
					<select
						name="tema"
						id="tema"
						className="border p-2 border-slate-800 rounded"
						onChange={(e) =>
							buscarTemaPorId(
								e.currentTarget.value,         // pega o id de temas q sao todos e coloca id detro da funçao buscartemaporid
							)
						}
					>
						<option value="" selected disabled>
							Selecione um Tema
						</option>

						{temas.map((tema) => (
							<>
								<option value={tema.id}>
									{tema.descricao}
								</option>
							</>
						))}
					</select>
				</div>
				<button
					type="submit"
					className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
					disabled={carregandoTema}
				>
					{isloading ? (
						<ClipLoader
							color="#ffffff"
							size={24}
						/>
					) : (
						<span>
							{id === undefined
								? 'Cadastrar'
								: 'Atualizar'}
						</span>
					)}
				</button>
        {/* Botão de Ação */}
        <button
            type="submit"
            disabled={isloading}
            className="rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 
                       w-full py-3 mt-4 font-bold uppercase tracking-wider shadow-md 
                       transition-all flex justify-center items-center disabled:bg-indigo-300"
        >
            {isloading ? (
                <ClipLoader color="#ffffff" size={24} />
            ) : (
                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
            )}
        </button>
    </form>
</div>
  )
}
