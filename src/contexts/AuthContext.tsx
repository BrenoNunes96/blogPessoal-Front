import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/usuarioLogin";
import { login } from "../Service/service";


interface AuthContextProps{
  usuario: UsuarioLogin
  handleLogout(): void
  handleLogin(usuario: UsuarioLogin): Promise<void>
  isLoading: boolean
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
        await login('/usuarios/logar', usuarioLogin, setUsuario);
        alert('Usuário autenticado com sucesso!');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
        alert('Os dados do Usuário estão inconsistentes!');
    }

    setIsLoading(false);
  }

  // Implementação da função de Logout
  function handleLogout(){
    setUsuario({
      id: 0,
      usuario: "",
      senha: "",
      foto: "",
      token: ""
    })
  }

  return(
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )

}