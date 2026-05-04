import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/tema"
import { buscar, deletar } from "../../../Service/service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../util/ToastAlert"

function DeletarTema() {
  const navigate = useNavigate()

  const [tema, setTema] = useState<Tema>({} as Tema)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info')
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function deletarTema() {
    setIsLoading(true)

    try {
      await deletar(`/temas/deletar/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      ToastAlerta('Tema apagado com sucesso', 'sucesso')

    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao deletar o tema.', 'erro')
        console.log(error)
      }
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate("/temas") // Ajustado para o plural acompanhando o padrão
  }

  return (
    <div className="flex flex-col bg-indigo-900 items-center justify-center min-h-[80vh] px-4">
      
      {/* Card Principal */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border border-slate-100 flex flex-col gap-6">
        
        {/* Cabeçalho de Aviso */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Deletar Tema</h1>
          <p className="text-slate-600 font-medium">
            Você tem certeza de que deseja apagar o tema a seguir? Esta ação não poderá ser desfeita.
          </p>
        </div>

        {/* Preview do Tema (Visual de Mini-Card) */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-2 shadow-sm text-center">
          <header className="font-bold text-indigo-900 text-xl border-b border-slate-200 pb-2 mb-2">
            Tema Selecionado
          </header>
          <p className="text-slate-700 text-lg font-medium break-words">
            {tema.descricao}
          </p>
        </div>

        {/* Container dos Botões */}
        <div className="flex gap-4 mt-2">
          
          {/* Botão de Cancelar (Ação Segura - Cor Indigo) */}
          <button
            className="w-1/2 py-3 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex justify-center items-center cursor-pointer"
            onClick={retornar}
            disabled={isLoading}
          >
            Não, Cancelar
          </button>

          {/* Botão de Deletar (Ação Destrutiva - Cor Vermelha) */}
          <button
            onClick={deletarTema} 
            className="w-1/2 py-3 px-4 rounded-lg text-white font-medium bg-red-500 hover:bg-red-700 active:bg-red-800 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors flex justify-center items-center cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
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

export default DeletarTema  