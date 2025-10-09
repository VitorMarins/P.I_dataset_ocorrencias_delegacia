import Image from "next/image";

export default function Header() {
    return (
        <>
            <div className="w-full bg-black flex flex-row md:flex-row justify-between items-center px-6 md:px-16 lg:px-32 py-4 gap-4">
                <div className="flex justify-center md:justify-start w-full md:w-1/2">
                    <Image
                        src="/assets/header/logo_pcpe_header.png"
                        width={400}
                        height={500}
                        alt="logo-policia-civil"
                        className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto object-contain"
                    />
                </div>

                <div className="flex justify-center md:justify-end w-full md:w-1/3">
                    <Image
                        src="/assets/header/governo-de-pernambuco-sds.png"
                        width={400}
                        height={500}
                        alt="logo-governo-pernambuco"
                        className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto object-contain"
                    />
                </div>
            </div>

            <div className="w-full h-10 bg-[#e4b75c] shadow-2xl flex flex-wrap justify-center items-center uppercase gap-8 sm:gap-16 md:gap-24 lg:gap-32 underline text-sm sm:text-base">
                <a href="/"><h1>Início</h1></a>
                <a href="/predict"><h1>Predição</h1></a>
            </div>
        </>
    );
}
