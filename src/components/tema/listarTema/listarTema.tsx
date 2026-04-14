import { useNavigate } from "react-router-dom";
import CardTema from "../cardTema/cardTema";
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../Service/service";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from '../../../util/ToastAlert' // Certifique-se de que o caminho está correto

function ListaTemas() {
    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([])
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado", "info")
            navigate('/')
        }
    }, [token, navigate])

    useEffect(() => {
        // Renderiza automaticamente a busca de temas
        buscarTemas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [temas.length]) 

    async function buscarTemas() {
        try {
            setIsloading(true)
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsloading(false)
        }
    }

    return (
        <>
            {isLoading && (
                <div className='flex justify-center w-full my-8'>
                    <SyncLoader color="#312e81" size={32} />
                </div>
            )}
            
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {(!isLoading && temas.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Tema foi encontrado!
                        </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {temas.map((x) => (
                            <CardTema key={x.id} tema={x} />
                        ))}
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default ListaTemas;