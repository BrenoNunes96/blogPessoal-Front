import { createContext, useRef, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/usuarioLogin";
import { login } from "../Service/service";
import { ToastAlerta } from "../util/ToastAlert";


interface AuthContextProps{
  usuario: UsuarioLogin
  handleLogout(): void
  handleLogin(usuario: UsuarioLogin): Promise<void>
  isLoading: boolean
    isLogout: boolean
}

interface AuthProviderProps{
  children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps){

  // Inicializar o estado usuario (armazenar os dados do usuário autenticado)
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome:"",
    usuario: "",
    senha: "",
    foto: "",
    token: ""
  });

  // Inicializar o estado isLoading (controlar o loader do componente Login)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Implementação da função de Login
  async function handleLogin(usuarioLogin: UsuarioLogin){

    setIsLoading(true);

    try{
        await login('/usuarios/logar', usuarioLogin, setUsuario);    //devolve em SETUSUARIO envia usuariologin q veio de login a const 
        ToastAlerta('Usuário autenticado com sucesso!','sucesso');
           isLogout.current=false
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
        alert('Os dados do Usuário estão inconsistentes!');
    }

    setIsLoading(false);
  }

  const isLogout=useRef(false)

  // Implementação da função de Logout
  function handleLogout(){
   // Define isLogout como true para sinalizar que o usuário fez o logout
    isLogout.current=true
    setUsuario({
      id: 0,
          nome:"",
      usuario: "",
      senha: "",
      foto: "",
      token: ""
    })
  }

  return(
    // eslint-disable-next-line react-hooks/refs
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading, isLogout: isLogout.current}}>
      {children}
    </AuthContext.Provider>
  )

}