/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/usuarioLogin";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../util/ToastAlert"

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
  const { usuario, handleLogin } = useContext(AuthContext);
  const [isloading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    if (usuario.token !== '') {
      navigate("/home");
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  async function login(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsloading(true);

    try {
      await handleLogin(usuarioLogin);
      ToastAlerta("Login realizado com sucesso", "sucesso"); 
    } catch (error) {
      ToastAlerta("Dados do usuário inconsistentes", "erro");
    } finally {
      setIsloading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white">
      
      {/* Lado Esquerdo - Área do Formulário */}
      <div className="flex justify-center items-center w-full px-6 md:px-12 py-10">
        <form onSubmit={login} className="w-full max-w-md flex flex-col gap-5">
          
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Entrar</h2>
            <p className="text-slate-500 font-medium">Bem-vindo de volta! Insira seus dados.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="usuario" className="text-sm font-semibold text-slate-700">
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={usuarioLogin.usuario || ''}
              placeholder="Digite seu usuário"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="senha" className="text-sm font-semibold text-slate-700">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={usuarioLogin.senha || ''}
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <button
            type='submit'
            disabled={isloading}
            className="w-full py-3 px-4 mt-4 rounded-lg text-white font-bold bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex justify-center items-center"
          >
            {isloading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Entrar</span>
            )}
          </button>

          {/* Divisor Estilizado */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="mx-4 text-slate-400 text-sm font-medium">Ou</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <p className="text-center text-slate-600 font-medium">
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors hover:underline">
              Cadastre-se
            </Link>
          </p>

        </form>
      </div>

      {/* Lado Direito - Imagem de Fundo (Visível apenas em telas grandes) */}
      <div className="hidden lg:block bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] bg-no-repeat bg-cover bg-center h-full w-full">
        {/* Container vazio, apenas para a imagem de fundo */}
      </div>

    </div>
  );
}

export default Login;