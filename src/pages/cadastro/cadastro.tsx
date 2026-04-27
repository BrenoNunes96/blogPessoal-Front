
import { useNavigate } from "react-router-dom"
import { useEffect, useState, type ChangeEvent, type SyntheticEvent} from "react"
import type Usuario from "../../models/usuario"
import { cadastrarUsuario } from "../../Service/service"
import { ClipLoader } from "react-spinners";
function Cadastro() {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate =useNavigate()


const[isloading,setIsloading] = useState<boolean>(false)

const[confirmarSenha,setConfirmarSenha]=useState<string>()

const [usuario,setUsuario] = useState<Usuario>({
  id:0,
  nome:"",
  senha:"",
  usuario:"",
  foto:"",

})

function handleSenha (e:ChangeEvent<HTMLInputElement>){        // vai puxar senha do input do usuario 
setConfirmarSenha(e.target.value)

}

function atualizarEstado (e:ChangeEvent<HTMLInputElement>){  // funçao para atualizar qualquer estado na aplicação 

  setUsuario({...usuario,[e.target.name]:e.target.value})       // vira objeto com nome do input e valor do input

}
function retornar (){
  navigate('/')
}

useEffect(()=>{
if(usuario.id !== 0){
  retornar()
}

// eslint-disable-next-line react-hooks/exhaustive-deps
},[usuario])

async function cadastrarUsuarioNovo(e:SyntheticEvent<HTMLFormElement>){ 
             // funçao que cadastra usuario no form com "onsubmit"
e.preventDefault()
console.log("DADOS QUE ESTOU ENVIANDO:", usuario);
   if(usuario.senha === confirmarSenha && usuario.senha.length >= 8){ 

    setIsloading(true)   //carrega imagem

  try{
await cadastrarUsuario('usuarios/cadastrar',usuario,setUsuario) // chama a funçao que esta em service, ela seta url e usuario com todos os inputs para o back na rota
alert('usuario cadastrado com sucesso')

  }catch(error){
    console.log(error)
  }
   }else{
    alert('dados inconsistentes');           // se o cadastro nao passar ,usuario esvazia a senha apenas  e confirmar senha tambem
    setUsuario({...usuario,senha:''})
    setConfirmarSenha("")
   }

    // a imagem em isloading se apaga
   console.log(confirmarSenha)
   console.log(usuario.senha)
}

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen
            place-items-center font-bod">
        <div
          className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat
            w-full min-h-screen bg-cover bg-center"
        ></div>
        
        <form onSubmit={cadastrarUsuarioNovo}className='flex justify-center items-center flex-col w-2/3 gap-3' >

          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>


          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={usuario.nome}
              placeholder='nome'
              onChange={(e:ChangeEvent<HTMLInputElement>)=>atualizarEstado(e)} // atualiza nome em usuario com seu valor
              className="border-2 border-slate-700 rounded p-2"
              
            />

          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder='usuario'
              className="border-2 border-slate-700 rounded p-2"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>atualizarEstado(e)}
            />
          
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder='foto'
              onChange={(e:ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              onChange={(e:ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
            />
       
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name='confirmarSenha'
              placeholder="Confirmar Senha"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>handleSenha(e)}
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
              type='reset'
              className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded text-white bg-indigo-400
                  hover:bg-indigo-900 w-1/2 py-2
                  flex justify-center'
                  
          >{isloading  ? <ClipLoader color="#ffffff"
                      size={24}/>:
          
              <span>Cadastrar</span>
              
              }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro

