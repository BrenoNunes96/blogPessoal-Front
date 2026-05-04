/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import type Tema from "../../../models/tema";
import { atualizar, buscar, cadastrar } from "../../../Service/service";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from '../../../util/ToastAlert'// Ajuste o caminho se necessário

function FormTema() {
  const [isloading, setIsloading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [tema, setTema] = useState<Tema>({} as Tema)
  const { usuario, handleLogout } = useContext(AuthContext)

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema, [e.target.name]: e.target.value
    })
  }

  async function buscarporId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { 
          Authorization: usuario.token
        }
      })
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (usuario.token === '') {
      ToastAlerta("Você precisa estar logado", "erro")
      navigate('/')
    }
  }, [usuario.token, navigate])

  useEffect(() => {
    if (id !== undefined) {
      buscarporId(id)
    }
  }, [id])

  function retornar() {
    navigate("/tema")
  }

  async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsloading(true)

    if (id !== undefined) {
      try {
        await atualizar("/temas/atualizar", tema, setTema, {
          headers: { 
            Authorization: usuario.token
          }
        })
        ToastAlerta("Tema atualizado com sucesso", "sucesso")
        retornar()
      } catch (error: any) {
        if (error.toString().includes('401')) { 
          handleLogout()
        } else {
          ToastAlerta("Erro ao atualizar o tema", "erro")
        }
      }
    } else {
      try {
        await cadastrar("/temas/criar", tema, setTema, {
          headers: { Authorization: usuario.token }
        })
        ToastAlerta("O tema foi cadastrado com sucesso", "sucesso")
        retornar()
      } catch (error: any) {
        if (error.toString().includes("401")) { 
          handleLogout()
        } else {
          ToastAlerta("Erro ao cadastrar tema", "erro")
        }
      }
    }
    
    setIsloading(false) 
  }

  return (
    // Wrapper principal para centralizar o card na tela
    <div className="  bg-indigo-900 flex flex-col items-center justify-center min-h-[80vh] px-4">
      
      {/* Card do Formulário */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border border-slate-100">
        
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
          {id === undefined ? 'Cadastrar Novo Tema' : 'Editar Tema'}
        </h1>

        <form onSubmit={gerarNovoTema} className="flex flex-col gap-6" >
          
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="text-sm font-semibold text-slate-700">
              Descrição do Tema
            </label>
            <input
              type="text"
              placeholder="Descreva aqui seu tema"
              name='descricao'
              value={tema.descricao || ''}
              // Estilização do input com anel de foco (focus ring) combinando com o botão
              className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          {/* Container dos botões */}
          <div className="flex gap-4 mt-4">
            {/* Botão de Cancelar usando o padrão red */}
            <button
              type="button"
              onClick={retornar}
              className="w-1/2 py-3 px-4 rounded-lg text-white font-medium bg-red-500 hover:bg-red-700 active:bg-red-800 transition-colors flex justify-center items-center"
            >
              Cancelar
            </button>
            
            {/* Botão de Submit usando o padrão indigo solicitado */}
            <button
              type="submit"
              disabled={isloading}
              className="w-1/2 py-3 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors flex justify-center items-center"
            >
              {isloading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FormTema;