"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { getServerPros } from "../_service/api";
import ClusteringChart from "../_components/clusteringChart/ClusteringChart";
import FrequencyHeatmap from "../_components/frequencyHeatmap/FrequencyHeatmap";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

export default function Predicao() {
    const [selectedYear, setSelectedYear] = useState<string>("2025");
    const [selectedBairro, setSelectedBairro] = useState<string>("Boa Viagem");
    const [includePredictions, setIncludePredictions] = useState<"observed" | "non_observed">("observed");
    const [data, setData] = useState<any>(null);
    const [chartData, setChartData] = useState<any>(null);
    const [isYearModalOpen, setIsYearModalOpen] = useState<boolean>(false);

    const bairros = [
        "Imbiribeira",
        "Boa Viagem",
        "Santo Amaro",
        "Afogados",
        "Tamarineira",
        "Torre",
        "Casa Forte",
        "Graças",
        "Espinheiro",
        "Pina",
    ];

    const years = Array.from({ length: 2026 - 2019 + 1 }, (_, i) => (2019 + i).toString());

    async function fetchData(year: string, bairro: string, value_type: string) {
        const result = await getServerPros({
            year,
            bairro,
            value_type,
        });
        setData(result);
    }

    useEffect(() => {
        fetchData(selectedYear, selectedBairro, includePredictions);
    }, [selectedYear, selectedBairro, includePredictions]);

    useEffect(() => {
        if (!data) return;

        const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const values = new Array(12).fill(null);

        data.data?.forEach((d: any) => {
            if (d.bairro === selectedBairro && d.month >= 1 && d.month <= 12) {
                values[d.month - 1] = d.value;
            }
        });

        setChartData({
            labels: months,
            datasets: [
                {
                    label: `${selectedBairro} — ${data.year}`,
                    data: values,
                    borderColor: "rgb(234, 179, 8)",
                    backgroundColor: "rgba(234, 179, 8, 0.3)",
                    fill: true,
                    tension: 0.25,
                },
            ],
        });
    }, [data, selectedBairro]);

    // UX: Fechar com ESC e bloquear scroll da página quando o modal estiver aberto
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsYearModalOpen(false);
        };
        if (isYearModalOpen) {
            window.addEventListener("keydown", onKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [isYearModalOpen]);

    return (
        <div className="w-full min-h-screen gap-8 px-4 md:px-32">
           <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-black mt-20">1. Gráfico de Previsão não Supervisionada</h1>
           
        <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">   
        
        <div className="flex-col mt-16 gap-6 justify-center items-center">
                <div className="w-full md:w-1/2 flex flex-col">
                    <label htmlFor="ano" className="text-base font-bold my-3">Escolha o ano</label>
                    <input
                        id="ano"
                        type="text"
                        readOnly
                        value={selectedYear}
                        onClick={() => setIsYearModalOpen(true)}
                        className="w-full border border-gray-300 p-3 md:p-5 rounded text-black cursor-pointer bg-white"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col">
                    <label htmlFor="bairro" className="text-base font-bold my-3">Escolha o bairro em Recife</label>
                    <select
                        id="bairro"
                        value={selectedBairro}
                        onChange={(e) => setSelectedBairro(e.target.value)}
                        className="w-full border border-gray-300 p-3 md:p-5 rounded text-black"
                    >
                        {bairros.map((b) => (
                            <option key={b} value={b}>
                                {b}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full md:w-1/2 flex flex-col">
                    <span className="text-base font-bold my-3">Tipo de Previsão</span>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="predicao"
                            checked={includePredictions === "observed"}
                            onChange={() => setIncludePredictions("observed")}
                        />
                        Supervisionada
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="predicao"
                            checked={includePredictions === "non_observed"}
                            onChange={() => setIncludePredictions("non_observed")}
                        />
                        Não Supervisionada
                    </label>
                </div>
            </div>

            {/* GRÁFICO */}
            <div className="w-full h-1/2 md:h-screen ">
                {chartData ? (
                    <div className="w-220 h-2/3">
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: true, position: "top" },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const raw = context.raw as number | string | null | undefined;
                                                const num = typeof raw === "number" ? raw : Number(raw ?? 0);
                                                return `Valor: ${num.toLocaleString("pt-BR", { maximumFractionDigits: 4 })}`;
                                            },
                                        },
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            callback: (value) => {
                                                const num = typeof value === "number" ? value : Number(value);
                                                return num.toLocaleString("pt-BR");
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                ) : (
                    <p className="text-lg text-gray-700">Carregando gráfico...</p>
                )}
            </div>
            {isYearModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsYearModalOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="year-modal-title"
                        className="bg-white rounded-xl shadow-xl w-11/12 max-w-md p-4 md:p-5 border border-gray-200 ring-1 ring-black/5 transition-all duration-200 ease-out"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-3 bg-black px-3 py-2 rounded-t-xl -mx-4 -mt-4 md:-mx-5 md:-mt-5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 16H5V9h14v11M7 11h2v2H7v-2m4 0h2v2h-2v-2m4 0h2v2h-2v-2M7 15h2v2H7v-2m4 0h2v2h-2v-2m4 0h2v2h-2v-2z" />
                                </svg>
                                <h2 id="year-modal-title" className="text-lg font-bold text-white pa-2">Selecione o ano</h2>
                            </div>
                            <button
                                aria-label="Fechar"
                                onClick={() => setIsYearModalOpen(false)}
                                className="p-1.5 rounded-md text-white hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e4b75c]"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {years.map((y) => (
                                <button
                                    key={y}
                                    onClick={() => {
                                        setSelectedYear(y);
                                        setIsYearModalOpen(false);
                                    }}
                                    className={`py-2 rounded-lg border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e4b75c] hover:shadow-sm active:scale-[.98] ${
                                        selectedYear === y
                                            ? "bg-[#e4b75c] text-black border-[#e4b75c] font-semibold shadow"
                                            : "bg-white text-black border-gray-300 hover:bg-gray-50"
                                    }`}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div style={{marginTop: "-12rem"}}>
            <FrequencyHeatmap/>
            <ClusteringChart/>
        </div>
        </div>
    );
}
