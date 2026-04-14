
import type Postagem from '../../../models/postagem'
import { Link } from 'react-router-dom'


interface CardProps{
postagem:Postagem

}
export default function Cardpostagem({postagem}:CardProps) {
  return (
  <div className='border flex flex-col rounded-2xl overflow-hidden justify-between bg-white shadow-md border-slate-200 transition-transform hover:scale-[1.01]'>
    
    {/* Cabeçalho do Card */}
    <header className='py-3 px-6 bg-indigo-800 text-white font-bold text-xl flex justify-between items-center'>
        <span>Postagem</span>
        <span className='text-sm font-normal opacity-80'>
            {postagem.tema?.descricao}
        </span>
    </header>

    {/* Conteúdo Principal */}
    <div className='p-6 flex w-1 flex-col gap-3 h-full bg-slate-50'>
        <div className='flex items-center gap-2'>
            {/* Círculo com a inicial do autor (estilo Avatar) */}
            <div className='w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold uppercase'>
                {postagem.usuario?.nome.charAt(0)}
            </div>
            <div>
                <p className='text-sm font-bold text-slate-800 leading-none'>{postagem.usuario?.nome}</p>
                <p className='text-xs text-slate-500'>{new Date(postagem.data).toLocaleDateString()}</p>
            </div>
        </div>

        <hr className='border-slate-200' />

        <h2 className='text-2xl font-bold text-indigo-900 mt-2'>{postagem.titulo}</h2>
        <p className='text-slate-700 leading-relaxed mb-4 italic'>"{postagem.texto}"</p>
    </div>

    {/* Ações (Botões) */}
    <div className='flex w-full border-t border-slate-200'>
        <Link 
            to={`/editarPostagem/${postagem.id}`} 
            className='w-full text-slate-100 bg-indigo-500 hover:bg-indigo-700 py-3 flex items-center justify-center transition-colors font-semibold'
        >
            <button>Editar</button>
        </Link>
        
        <Link 
            to={`/deletarPostagem/${postagem.id}`}   
            className='text-white bg-red-500 hover:bg-red-700 w-full flex items-center justify-center py-3 transition-colors font-semibold border-l border-white/20'
        >
            <button>Deletar</button>
        </Link>
    </div>
</div>
  )
}
