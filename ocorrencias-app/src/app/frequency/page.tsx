"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getHeatmapData, HeatmapData } from "@/app/_service/frequency";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

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

// ... resto do código permanece igual


export default function Frequency() {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<number>(currentYear);
    const [bairro, setBairro] = useState<string>("Boa Viagem");
    const [data, setData] = useState<HeatmapData | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchData(selectedYear: number, selectedBairro: string) {
        setLoading(true);
        const result = await getHeatmapData({
            year: selectedYear,
            bairro: selectedBairro,
            columns_top: 10,
            index_top: 10
        });
        setData(result);
        setLoading(false);
    }

    useEffect(() => {
        fetchData(year, bairro);
    }, [year, bairro]);

    if (loading)
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <p>Carregando dados...</p>
            </div>
        );

    if (!data) return <p>Erro ao carregar dados.</p>;

    return (
        <div className="w-full min-h-screen grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8 px-4 md:px-32">
            {/* Painel de filtros */}
            <div className="w-full flex flex-col p-4 md:p-12 gap-8 justify-center items-center">
                {/* Ano */}
                <div className="w-full md:w-3/4 flex flex-col">
                    <label htmlFor="ano" className="font-semibold mb-2">Escolha o ano</label>
                    <input
                        id="ano"
                        type="number"
                        min="2020"
                        max={currentYear}
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="w-full bg-[#e4b75c] p-3 md:p-5 rounded text-black"
                    />
                </div>

                {/* Bairro */}
                <div className="w-full md:w-3/4 flex flex-col">
                    <label htmlFor="bairro" className="font-semibold mb-2">Escolha o bairro</label>
                    <select
                        id="bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        className="w-full bg-[#e4b75c] p-3 md:p-5 rounded text-black"
                    >
                        {bairros.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Heatmap */}
            <div className="w-full h-1/2 md:h-screen flex justify-center items-center p-4 md:p-12">
                {data ? (
                    <div className="w-full h-2/3">
                        <Plot
                            data={[
                                {
                                    z: data.data,
                                    x: data.columns,
                                    y: data.index,
                                    type: "heatmap",
                                    colorscale: "YlOrRd", // escala quente
                                    showscale: true,
                                    text: data.data.map((row) => row.map(String)),
                                    texttemplate: "%{text}",
                                    hoverinfo: "x+y+z",
                                },
                            ]}
                            layout={{
                                title: {
                                    text: "Mapa de Frequência: Modus Operandi x Tipo de Crime",
                                    font: { size: 18, family: "Arial Black" },
                                },
                                xaxis: { title: "Tipo de Crime" },
                                yaxis: { title: "Modus Operandi" },
                                autosize: true,
                                height: 600,
                            }}
                            style={{ width: "100%", height: "100%" }}
                            config={{ responsive: true }}
                        />
                    </div>
                ) : (
                    <div className="w-full h-auto flex justify-center items-center ">
                        <p className="text-lg text-gray-700">Carregando gráfico...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
