import{LinkedinLogoIcon,FacebookLogoIcon,InstagramLogoIcon}from '@phosphor-icons/react'

export default function Footer() {
  
  const date = new Date().getFullYear()
    return (
    <div>
<div className="flex justify-center bg-indigo-900 text-white">
    <div className="container flex flex-col items-center py=4">
        <p className="text-x1 font-bold">
blog Pessoal generation | copyright :{date}
        </p>
        <p className="text-lg">
acesse nossas redes sociais
        </p>
        <div className="flex gap-2">
<LinkedinLogoIcon size={48} weight='bold'/>
< FacebookLogoIcon size={48} weight='bold'/>
<InstagramLogoIcon  size={48} weight='bold'/>

        </div>
    </div>
</div>



    </div>
  )
}
