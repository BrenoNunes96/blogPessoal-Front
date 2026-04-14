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
        headers: { // Corrigido de 'Headers' para 'headers'
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
    navigate("/temas") // Ajustado para plural acompanhando o padrão do DeletarTema
  }

  async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsloading(true)

    if (id !== undefined) {
      try {
        await atualizar("/temas/atualizar", tema, setTema, {
          headers: { // Corrigido de 'Headers' para 'headers'
            Authorization: usuario.token
          }
        })
        ToastAlerta("Tema atualizado com sucesso", "sucesso")
        retornar()
      } catch (error: any) {
        if (error.toString().includes('401')) { // Corrigido de 'tostring()' para 'toString()'
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
        if (error.toString().includes("401")) { // Corrigido de 'tostring()' para 'toString()'
          handleLogout()
        } else {
          ToastAlerta("Erro ao cadastrar tema", "erro")
        }
      }
    }
    
    setIsloading(false) // Garante que o loading para de girar independente de sucesso ou erro
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
      </h1>

      <form onSubmit={gerarNovoTema} className="w-1/2 flex flex-col gap-4" >
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Tema</label>

          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name='descricao'
            value={tema.descricao || ''} // || '' evita erro de uncontrolled input do React
            className="border-2 border-slate-700 rounded p-2"
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
          disabled={isloading} // Desabilita o clique enquanto carrega
        >
          {isloading ? <ClipLoader color="#ffffff" size={24} /> : <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>}
        </button>
      </form>
    </div>
  );
}

export default FormTema;