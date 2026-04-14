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
         ToastAlerta("login realizado");
    } catch (error) {
      ToastAlerta("Dados do usuário inconsistentes", "erro");
    } finally {
      setIsloading(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <form onSubmit={login} className="flex justify-center items-center flex-col w-1/2 gap-4">
          <h2 className="text-slate-900 text-5xl">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={usuarioLogin.usuario || ''}
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={usuarioLogin.senha || ''}
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <button
            type='submit'
            className="rounded bg-indigo-400 flex justify-center hover:bg-indigo-900 text-white w-1/2 py-2"
            disabled={isloading}
          >
            {isloading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Entrar</span>
            )}
          </button>

          <hr className="border-slate-800 w-full" />

          <p>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-indigo-800 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"></div>
      </div>
    </>
  );
}

export default Login;