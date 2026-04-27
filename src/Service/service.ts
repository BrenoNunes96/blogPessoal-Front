import axios from "axios";

const api =axios.create({baseURL:"https://blog-pessoal-2-0ra1.onrender.com"})


// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const cadastrarUsuario = async(url:string,dados:object,setDados:Function) =>{    // usuario e setUsuario    //CREATE


    const resposta = await api.post(url,dados)
    setDados(resposta.data)
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const login  = async(url:string,dados:object,setDados:Function)=>{// setdados recebe de volta e guarda as info do banco


const repostaLogin = await api.post(url,dados)                                 // CREATE
setDados(repostaLogin.data)

}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const buscar = async(url:string,setDados:Function,header:object)=>{     // setdados recebe de volta e guarda as info do banco

const respostabusca = await api.get(url,header)
setDados(respostabusca.data)                                     //READ

}

    
export const cadastrar = async (url: string, dados: object, setDados: Function, header: object) => { 
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: object, setDados: Function, header: object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)

}