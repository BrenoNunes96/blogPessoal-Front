import{LinkedinLogoIcon,FacebookLogoIcon,InstagramLogoIcon}from '@phosphor-icons/react'
import { useContext, type ReactNode } from 'react'
import { AuthContext } from '../../contexts/AuthContext'


function Footer() {

    const data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode
    
        if(usuario.token !== ""){

            component = (

                <div className="flex justify-center bg-indigo-900 text-white">
                    <div className="container flex flex-col items-center py-4">
                        <p className='text-xl font-bold'>
                                Blog Pessoal Generation | Copyright: {data}
                            </p>
                        <p className='text-lg'>Acesse nossas redes sociais</p>
                        <div className='flex gap-2'>
                            <LinkedinLogoIcon size={48} weight='bold' />
                            <InstagramLogoIcon size={48} weight='bold' />
                            <FacebookLogoIcon size={48} weight='bold' />
                        </div>
                    </div>
                </div>

            )

        }

    return (
        <>
            { component }
        </>
    )
}

export default Footer
