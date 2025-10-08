import Image from "next/image"
export default function Header(){
    return(
        <header className="w-full">
            <div className="w-full bg-black">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-24 h-20 flex items-center justify-between">
                    <div className="flex items-center pa-5">
                        <Image src={'/assets/header/logo_pcpe_header.png'} width={140} height={40} alt="logo-policia-civil" />
                    </div>
                    <div className="flex items-center gap-6 pa-5">
                        <Image src={'/assets/header/governo-de-pernambuco-sds.png'} width={200} height={40} alt="logo-governo-pernambuco" />
                    </div>
                </div>
            </div>

            <div className="mx-[20px] border-b-10 border-[#A17516] relative z-[2] "></div>

            <div className="relative z-[1] mt-[-10px]">
                <div className="w-full h-56 md:h-72 lg:h-80 bg-gray-400" style={{ backgroundImage: "url('/assets/img/Imagem_Fundo.png')", backgroundSize: "cover", backgroundPosition: "center" }} />

                <div className="absolute -bottom-6 z-[30] left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0">
                    <nav className="bg-white rounded-3xl flex items-center px-4 py-2 gap-4 text-sm md:px-6 md:py-3 md:gap-8 md:text-base xl:px-8 xl:py-4 xl:gap-12 xl:text-lg">
                        <a href="/" className="flex items-center gap-2 text-black hover:opacity-80">
                            <Image src={'/assets/img/homeIcon.png'} width={22} height={22} alt="icone home" />
                            <span className="font-semibold">Home</span>
                        </a>
                        <a href="/predict" className="flex items-center gap-2 text-black hover:opacity-80">
                            <Image src={'/assets/img/predictIcon.png'} width={22} height={22} alt="icone predicao" />
                            <span className="font-semibold">Predições</span>
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    )
}