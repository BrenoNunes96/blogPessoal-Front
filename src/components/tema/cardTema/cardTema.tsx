
import { Link } from 'react-router-dom'
import type Tema from '../../../models/tema'

interface CardTemaProps{              // MODELO CARD A SER
    tema: Tema
}

 function CardTema({tema}:CardTemaProps) {       // TEMA VEIO DE LISTARTEMA COMO PARAMETRO



  return (
   <div className="flex flex-col rounded-2xl overflow-hidden justify-between bg-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
  
  {/* Cabeçalho do Card */}
  <header className="py-3 px-6 bg-indigo-600 text-white font-bold text-xl">
    Tema
  </header>
  
  {/* Corpo do Card */}
  <div className="p-6 h-full flex items-center bg-slate-50">
    <p className="text-lg text-slate-700 font-medium break-words">
      {tema.descricao}
    </p>
  </div>
  
  {/* Rodapé com Botões */}
  <div className="flex">
    <Link 
      to={`/editartema/${tema.id}`} 
      className="w-full text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 flex items-center justify-center py-3 font-medium transition-colors"
    >
      Editar
    </Link>
    
    <Link 
      to={`/deletartema/${tema.id}`} 
      className="w-full text-white bg-red-500 hover:bg-red-700 active:bg-red-800 flex items-center justify-center py-3 font-medium transition-colors"
    >
      Deletar
    </Link>
  </div>
  
</div>

  )
}
export default CardTema
