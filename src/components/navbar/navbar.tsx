import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"


export default function navbar() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const{handleLogout} = useContext(AuthContext)

function logout(){
  handleLogout()
  alert('o usuario foi desconecatado')
  navigate("/")
}




  return (
    <div>
 <div className='w-full flex justify-center py-4 bg-indigo-900 text-white'>
    <div className='container flex justify-between text-lg mx-8'>
       <Link to='/home' className='text-2xl font-bold'>Blog Pessoal</Link> 
        <div className='flex gap-4'>
            Postagens
               <Link to='/tema' className='hover:underline'  >temas</Link> 
          <Link to='/cadastrartema' className='hover:underline'>cadastrar Temas</Link> 
            Perfil
                  <Link to='' onClick={logout} className='hover:underline'>sair </Link> 
        </div>
    </div>
 </div>

    </div>
  )
}
