import { Link } from "react-router-dom";
import Listarhome from "../../components/postagem/listarpostagem/listarHome/listarhome";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Home() {
  const { handleLogout } = useContext(AuthContext);
  
  // Mantive a função apagar caso você tenha planos de usá-la
  async function apagar(){
    handleLogout();
  }

  return (
    // Container principal ocupando toda a tela com fundo claro para o conteúdo abaixo
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Section (Área de Boas-vindas escura) */}
      <div className="bg-indigo-900 text-white flex justify-center w-full">
        {/* Ajustado para ser responsivo: 1 coluna no celular, 2 no PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto py-16 px-6 gap-8 items-center">
          
          {/* Lado Esquerdo: Textos e Botão */}
          <div className="flex flex-col justify-center items-center md:items-start gap-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Seja bem-vindo!
            </h2>
            <p className="text-lg md:text-xl text-indigo-200">
              Escreva, se expresse, liberte-se.
            </p>
            
            <div className="flex gap-4 mt-2">
              {/* Botão no padrão solicitado */}
              <Link 
                to="/cadastrarpostagem"
                className="py-3 px-8 rounded-lg text-white font-semibold bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-lg hover:shadow-xl"
              >
                Nova Postagem
              </Link>
            </div>
          </div>

          {/* Lado Direito: Imagem */}
          <div className="flex justify-center md:justify-end">
            <img 
              className="w-full max-w-sm md:max-w-md rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-300" 
              src="https://ik.imagekit.io/fsnhaprtb/default-image.jpg?updatedAt=1774969926429" 
              alt="Ilustração da página home" 
            />
          </div>

        </div>
      </div>

      {/* Seção Inferior: Listagem de Postagens */}
      <div className="w-full bg-indigo-900  mx-auto py-12 px-4 md:px-6       ">
        <Listarhome />
      </div>
      
    </div>
  );
}

export default Home;