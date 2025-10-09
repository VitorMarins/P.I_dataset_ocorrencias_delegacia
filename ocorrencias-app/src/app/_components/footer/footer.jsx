"use client";
export default function Footer(){
    const team = [
        "André Luiz",
        "Carla Romero",
        "Gabriela Pires",
        "Lucas Emmanoel",
        "Rafael Moura",
        "Vitor Marins",
    ];

    return (
        <footer className="relative w-full text-white bg-gradient-to-tr from-[#1f1f1f] via-[#1b1b1b] to-[#2a2a2a]">
            <button
                type="button"
                aria-label="Voltar ao topo"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="absolute -top-6 right-16 w-22 h-22 bg-gradient-to-tr from-[#1f1f1f] via-[#1b1b1b] to-[#2a2a2a] border-6 border-white flex items-center justify-center shadow-md hover:bg-neutral-800 transition"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="36"
                    height="36"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 12l7-7 7 7" />
                    <path d="M12 19V5" />
                </svg>
            </button>

            <div className="px-16 md:px-24 lg:px-64 py-10">
                <p className="font-semibold mb-4">Equipe</p>
                <ul className="space-y-1 text-sm text-gray-200">
                    {team.map((name) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>

                <hr className="mt-8  border-white" />
            </div>
        </footer>
    );
}