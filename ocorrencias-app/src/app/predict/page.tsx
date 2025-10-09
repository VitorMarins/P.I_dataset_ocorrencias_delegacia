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

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

export default function Predicao() {
    const [selectedYear, setSelectedYear] = useState<string>("2025");
    const [selectedBairro, setSelectedBairro] = useState<string>("Boa Viagem");
    const [includePredictions, setIncludePredictions] = useState<"observed" | "non_observed">("observed");
    const [data, setData] = useState<any>(null);
    const [chartData, setChartData] = useState<any>(null);

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

    return (
        <div className="w-full min-h-screen grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8 px-4 md:px-32">
            {/* Painel de filtros */}
            <div className="w-full flex flex-col p-4 md:p-12 gap-8 justify-center items-center">
                {/* ANO */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <label htmlFor="ano">Escolha o ano</label>
                    <input
                        id="ano"
                        type="number"
                        min="2019"
                        max="2026"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full bg-[#e4b75c] p-3 md:p-5 rounded text-black"
                    />
                </div>

                {/* BAIRRO */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <label htmlFor="bairro">Escolha o bairro em Recife</label>
                    <select
                        id="bairro"
                        value={selectedBairro}
                        onChange={(e) => setSelectedBairro(e.target.value)}
                        className="w-full bg-[#e4b75c] p-3 md:p-5 rounded text-black"
                    >
                        {bairros.map((b) => (
                            <option key={b} value={b}>
                                {b}
                            </option>
                        ))}
                    </select>
                </div>

                {/* TIPO DE PREVISÃO */}
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <span className="mb-2">Tipo de Previsão</span>
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
            <div className="w-full h-1/2 md:h-screen flex justify-center items-center p-4 md:p-12">
                {chartData ? (
                    <div className="w-full h-2/3">
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: true, position: "top" },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) =>
                                                `Valor: ${context.raw?.toLocaleString("pt-BR", {
                                                    maximumFractionDigits: 4,
                                                })}`,
                                        },
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            callback: (value) => value.toLocaleString("pt-BR"),
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
        </div>
    );
}
