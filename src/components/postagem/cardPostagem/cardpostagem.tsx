import type Postagem from '../../../models/postagem'
import { Link } from 'react-router-dom'

interface CardProps {
  postagem: Postagem
}

// Mantive a função caso você vá usar futuramente
function alertCrct() {
  return alert("apenas caracteres ate 100")
}

export default function Cardpostagem({ postagem }: CardProps) {
  return (
    <div className='flex flex-col rounded-2xl overflow-hidden justify-between bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 h-full'>
      
      {/* Cabeçalho do Card */}
      <header className='py-3 px-6 bg-indigo-600 text-white font-bold text-xl flex justify-between items-center'>
        <span>Postagem</span>
        <span className='ml-2 text-sm font-normal opacity-90 truncate max-w-[50%]'>
          {postagem.tema?.descricao}
        </span>
      </header>

      {/* Conteúdo Principal */}
      {/* Removido o 'w-1' que quebrava o card e adicionado 'flex-grow' para preencher o espaço */}
      <div className='p-6 flex flex-col gap-4 bg-slate-50 flex-grow'>
        
        {/* Informações do Usuário (Avatar e Data) */}
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold uppercase shrink-0'>
            {postagem.usuario?.nome.charAt(0) || '?'}
          </div>
          <div className='flex flex-col'>
            <p className='text-sm font-bold text-slate-800 leading-none mb-1'>
              {postagem.usuario?.nome}
            </p>
            <p className='text-xs text-slate-500'>
              {new Date(postagem.data).toLocaleDateString()}
            </p>
          </div>
        </div>

        <hr className='border-slate-200' />

        {/* Textos da Postagem */}
        <div className='flex flex-col flex-grow gap-2'>
          <h2 className='text-xl font-bold text-indigo-900 break-words'>
            {postagem.titulo}
          </h2>
          <p className='text-slate-700 leading-relaxed italic break-words'>
            {postagem.texto}
          </p>
        </div>
      </div>

      {/* Ações (Botões) */}
      <div className='flex w-full mt-auto'>
        {/* Botão de Editar com as cores padrão */}
        <Link 
          to={`/editarPostagem/${postagem.id}`} 
          className='w-full text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 flex items-center justify-center py-3 font-medium transition-colors'
        >
          Editar
        </Link>
        
        {/* Botão de Deletar com as cores padrão */}
        <Link 
          to={`/deletarPostagem/${postagem.id}`}   
          className='w-full text-white bg-red-500 hover:bg-red-700 active:bg-red-800 flex items-center justify-center py-3 font-medium transition-colors'
        >
          Deletar
        </Link>
      </div>
    </div>
  )
}
