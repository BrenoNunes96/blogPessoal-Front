import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { buscar, deletar } from '../../../Service/service'
import type Postagem from '../../../models/postagem'
import { ClipLoader } from 'react-spinners'
import { ToastAlerta } from '../../../util/ToastAlert'

export default function Deletarpostagem() {
  const { id } = useParams<{ id: string }>()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const { handleLogout, usuario } = useContext(AuthContext)
  
  // Alterado para o singular (postagem), pois guarda apenas UM objeto
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  async function buscarId() {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: usuario.token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (usuario.token === '') {
      ToastAlerta('Você precisa estar logado', 'erro')
      navigate('/')
    }
  }, [usuario.token, navigate])

  useEffect(() => {
    if (id !== undefined) {
      buscarId()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  function retornar() {
    navigate("/home") // Presumindo que você quer que volte para a home ou /postagens
  }

  async function deletarPostagem() {
    setIsLoading(true)
    try {
      await deletar(`/postagens/deletar/${id}`, {
        headers: {
          Authorization: usuario.token
        }
      })
      ToastAlerta("Postagem deletada com sucesso", "sucesso")
      navigate("/home")
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta("Erro ao deletar postagem", "erro")
      }
    } finally {
      // O finally garante que o loading pare de girar, dando erro ou sucesso
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      
      {/* Card Principal */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border border-slate-100 flex flex-col gap-6">
        
        {/* Cabeçalho de Aviso */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Deletar Postagem</h1>
          <p className="text-slate-600 font-medium">
            Você tem certeza de que deseja apagar a postagem a seguir? Esta ação não poderá ser desfeita.
          </p>
        </div>

        {/* Preview da Postagem (Visual de Mini-Card) */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-2 shadow-sm">
          <header className="font-bold text-indigo-900 text-xl border-b border-slate-200 pb-2 mb-2">
            {postagem.titulo}
          </header>
          <p className="text-slate-700 italic break-words line-clamp-4">
            {postagem.texto}
          </p>
        </div>

        {/* Container dos Botões */}
        <div className="flex gap-4 mt-2">
          
          {/* Botão de Cancelar (Ação Segura - Cor Indigo) */}
          <button
            className="w-1/2 py-3 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex justify-center items-center cursor-pointer"
            onClick={retornar}
            disabled={isloading}
          >
            Não, Cancelar
          </button>
          
          {/* Botão de Deletar (Ação Destrutiva - Cor Vermelha) */}
          <button
            className="w-1/2 py-3 px-4 rounded-lg text-white font-medium bg-red-500 hover:bg-red-700 active:bg-red-800 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors flex justify-center items-center cursor-pointer"
            onClick={deletarPostagem}
            disabled={isloading}
          >
            {isloading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim, Deletar</span>
            )}
          </button>
          
        </div>
      </div>
      
    </div>
  )
}	