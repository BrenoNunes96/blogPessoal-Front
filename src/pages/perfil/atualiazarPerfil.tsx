import { type ChangeEvent, type SyntheticEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Usuario from "../../models/usuario"
import { atualizar, buscar } from "../../Service/service"
import { ToastAlerta } from "../../util/ToastAlert"

function AtualizarPerfil() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<Usuario>({} as Usuario)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")

  const { usuario, handleLogout, isLogout } = useContext(AuthContext)
  const token = usuario.token
  const id: string = usuario.id.toString()

  async function buscarUsuarioPorId() {
    try {
      await buscar(`/usuarios/${id}`, setUser, {
        headers: {
          Authorization: token,
        },
      })
      setUser((user) => ({ ...user, senha: "" }))
      setConfirmarSenha("")
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      } else {
        ToastAlerta("Usuário não encontrado!", "erro")
        retornar()
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      if (!isLogout) {
        ToastAlerta("Você precisa estar logado!", "info")
      }
      navigate("/")
    }
  }, [token, isLogout, navigate])

  useEffect(() => {
    setUser({} as Usuario)
    setConfirmarSenha("")
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      buscarUsuarioPorId()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  function retornar() {
    navigate("/perfil")
  }

  function sucesso() {
    handleLogout()
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  async function atualizarUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (confirmarSenha === user.senha && user.senha.length >= 8) {
      try {
        await atualizar(`/usuarios/atualizar`, user, setUser, {
          headers: {
            Authorization: token,
          },
        })
        ToastAlerta("Usuário atualizado com sucesso! \n Efetue o Login Novamente!", "sucesso")
        sucesso()
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout()
        } else {
          ToastAlerta("Erro ao atualizar o usuário!", "erro")
          retornar()
        }
      }
    } else {
      ToastAlerta("Dados inconsistentes. Verifique as senhas e tente novamente.", "erro")
      setUser({ ...user, senha: "" })
      setConfirmarSenha("")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-[85vh] bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          
          <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* Seção da foto (Esquerda) */}
            <div className="bg-indigo-600 p-8 lg:p-12 flex flex-col items-center justify-center col-span-1">
              <div className="relative mb-6">
                <img
                  src={user.foto || "https://ik.imagekit.io/fsnhaprtb/default-avatar.png"} // Fallback caso não tenha foto ainda
                  alt={user.nome}
                  className="w-48 h-48 object-cover rounded-full border-4 border-indigo-200 shadow-2xl bg-white"
                />
              </div>
              <h2 className="text-white text-3xl font-bold mt-2 text-center break-words w-full">
                {user.nome || "Carregando..."}
              </h2>
              <p className="text-indigo-200 font-medium text-base mt-2 truncate w-full text-center">
                {user.usuario}
              </p>
            </div>

            {/* Seção do formulário (Direita) */}
            <div className="p-8 lg:p-12 col-span-2 flex flex-col justify-center">
              
              <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-extrabold text-slate-900">Editar Perfil</h1>
                <p className="text-slate-500 font-medium mt-1">Atualize suas informações pessoais e credenciais de acesso.</p>
              </div>

              <form onSubmit={atualizarUsuario} className="flex flex-col gap-5">
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="nome" className="text-sm font-semibold text-slate-700">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Digite seu nome completo"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    value={user.nome || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="usuario" className="text-sm font-semibold text-slate-700">
                    Usuário (E-mail)
                  </label>
                  <input
                    type="email"
                    id="usuario"
                    name="usuario"
                    placeholder="Seu endereço de e-mail"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-200 text-slate-500 cursor-not-allowed focus:outline-none"
                    disabled
                    value={user.usuario || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="foto" className="text-sm font-semibold text-slate-700">
                    URL da Foto de Perfil
                  </label>
                  <input
                    type="url"
                    id="foto"
                    name="foto"
                    placeholder="Cole o link da sua foto"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    value={user.foto || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    required
                  />
                </div>

                {/* Grid para alinhar as senhas lado a lado em telas maiores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="senha" className="text-sm font-semibold text-slate-700">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="Mínimo de 8 caracteres"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      value={user.senha || ""}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirmarSenha" className="text-sm font-semibold text-slate-700">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      id="confirmarSenha"
                      name="confirmarSenha"
                      placeholder="Repita a senha"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      value={confirmarSenha}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                {/* Divisor */}
                <div className="border-t border-slate-200 mt-2 mb-2"></div>

                {/* Botões de Ação */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="w-1/2 py-3 px-4 rounded-lg text-white font-medium bg-red-500 hover:bg-red-700 active:bg-red-800 transition-colors flex justify-center items-center cursor-pointer"
                    onClick={retornar}
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 py-3 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg flex justify-center items-center cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ClipLoader color="#ffffff" size={24} />
                    ) : (
                      <span>Atualizar Perfil</span>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AtualizarPerfil