import React, { useContext, useEffect, useState } from 'react'
import type Postagem from '../../../../models/postagem'
import { buscar } from '../../../../Service/service'
import { AuthContext } from '../../../../contexts/AuthContext'
import Cardpostagem from '../../cardPostagem/cardpostagem'
import { ClipLoader } from 'react-spinners'

export default function Listarhome() {
  // Padronizei a variável de estado para letra minúscula (boas práticas)
  const [postagens, setPostagens] = useState<Postagem[]>([])
  const { usuario, handleLogout } = useContext(AuthContext)
  const [isloading, setIsloading] = useState<boolean>(false)

  async function buscarPostagem() {
    setIsloading(true)
    try {
      await buscar("/postagens", setPostagens, { 
        headers: {
          Authorization: usuario.token
        }
      })
    } catch (error) {
      console.log(error)
      handleLogout()
    } finally {
      setIsloading(false)
    }
  }

  // Corrigido: Depender do token do usuário garante que só busque quando logado e evita loops infinitos
  useEffect(() => {
    if (usuario.token) {
      buscarPostagem()
    }
  }, [usuario.token])

  return (
    <div className="flex w-full justify-center items-center flex-col">
      {/* Título opcional para dar mais contexto na Home */}
      <h3 className=" text-slate-50   text-3xl font-bold tex-800 mb-8 self-start px-4">
        Postagens Recentes
      </h3>

      {isloading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#4f46e5" size={50} />
        </div>
      ) : (
        /* Substituí os ml-32 e w-300 por um Grid responsivo */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full px-4">
          {postagens.slice(0, 5).map((x) => {
            // Aumentei um pouquinho o slice para o card não ficar vazio demais, mas você pode voltar se preferir
            const postagemLimitada = {
              ...x,
              texto: x.texto.length > 30 ? `${x.texto.slice(0, 30)}...` : x.texto,
              titulo: x.titulo.length > 15 ? `${x.titulo.slice(0, 15)}...` : x.titulo
            };

            return <Cardpostagem key={x.id} postagem={postagemLimitada} />;
          })}
        </div>
      )}
    </div>
  )
}