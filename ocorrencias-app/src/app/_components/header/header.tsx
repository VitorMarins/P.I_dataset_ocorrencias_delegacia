import Image from "next/image"

export default function Header(){
    return(
        <>
        <div className="w-full h-65 bg-black flex justify-between items-center px-64">
            <div className="w-1/2 h-auto">
                <Image src={'/assets/header/logo_pcpe_header.png'}  width={400} height={500} alt="logo-policia-civil"/>
            </div>
                <div className="w-1/3 h-auto">
                    <Image src={'/assets/header/governo-de-pernambuco-sds.png'} width={400} height={500} alt="logo-policia-civil" />
                </div>
        </div>
            <div className="w-full h-10 bg-[#e4b75c] shadow-2xl flex justify-center items-center uppercase gap-32 underline">
                <a href="/"><h1>Início</h1></a>
                <a href="/predict"><h1>Predição</h1></a>
        </div>
        </>
    )
}