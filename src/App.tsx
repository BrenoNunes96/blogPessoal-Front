
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

function App() {


  return (
    <>
     <AuthProvider>
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
     

    </Routes>
    </div>
    <Footer/>
       </BrowserRouter>
    
     </AuthProvider>
    </>
  )
}

export default App
