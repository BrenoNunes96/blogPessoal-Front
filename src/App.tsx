
import './App.css'
import Cadastro from './pages/cadastro/cadastro'
import Home from './pages/home/home'
import {BrowserRouter,Route,Routes} from"react-router-dom"
import Login from './pages/login/login'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import { AuthProvider } from './contexts/AuthContext'
import ListarTema from './components/tema/listarTema/listarTema'
import FormTema from './components/tema/formTema/formTema'
import DeletarTema from './components/tema/deletartema/deletartema'
import FormPostagem from './components/postagem/formPostagem/formPostagem'
import ListarPostagem from './components/postagem/listarpostagem/listarPostagem'

import { ToastContainer } from 'react-toastify'
import Perfil from './pages/perfil/perfil'
import Listarhome from './components/postagem/listarpostagem/listarHome/listarhome'
import Deletarpostagem from './components/postagem/deletarPostagem/deletarpostagem'
import AtualizarPerfil from './pages/perfil/atualiazarPerfil'
function App() {


  return (
    <>
     <AuthProvider>
      <ToastContainer />
    <BrowserRouter>
    <Navbar/>
    <div className='min-h-[80vh]'>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/tema' element={<ListarTema/>} />
      <Route path="/home" element={<Home/>}   />
      <Route path='/cadastro' element={<Cadastro/>}/>
      <Route path="/cadastrartema" element={<FormTema />} />
      <Route path="/editartema/:id" element={<FormTema />} />
      <Route path="/deletartema/:id" element={<DeletarTema />} />
      <Route path='/cadastrarpostagem' element={<FormPostagem/>} />
      <Route path='/postagem' element={<ListarPostagem/>}/>
        <Route path="/editarPostagem/:id" element={<FormPostagem/>} />
      <Route path="/deletarPostagem/:id" element={<Deletarpostagem/>}  />
            <Route path="/perfil" element={<Perfil/>}  />
            <Route path='/listarhome' element={<Listarhome/>}/>
     <Route  path='atualizarusuario'  element={<AtualizarPerfil/>} />

    </Routes>
    </div>
    <Footer/>
       </BrowserRouter>
    <ToastContainer />
     </AuthProvider>
    </>
  )
}

export default App
