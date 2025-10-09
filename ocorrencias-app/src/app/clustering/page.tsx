"use client";

import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    PointElement,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { getPCAData, PCAData } from "@/app/_service/clustering";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend);

export default function Clustering() {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<number>(currentYear);
    const [data, setData] = useState<PCAData | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchData(selectedYear: number) {
        setLoading(true);
        const result = await getPCAData({ year: selectedYear.toString() });
        setData(result);
        setLoading(false);
    }

    useEffect(() => {
        fetchData(year);
    }, [year]);

    if (loading)
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <p>Carregando dados...</p>
            </div>
        );

    if (!data) return <p>Erro ao carregar dados.</p>;

    const clusterColors: Record<number, string> = {
        0: "rgba(0, 200, 0, 0.6)",    // verde
        1: "rgba(128, 0, 128, 0.6)",  // roxo
        2: "rgba(255, 206, 0, 0.6)",  // amarelo
    };


    const datasets = [0, 1, 2].map(clusterId => ({
        label: `Cluster ${clusterId}`,
        data: data.pca1
            .map((x, i) => ({ x, y: data.pca2[i], cluster: data.cluster[i] }))
            .filter(point => point.cluster === clusterId),
        backgroundColor: clusterColors[clusterId],
        pointRadius: 12, // aumenta o tamanho das bolinhas
        pointHoverRadius: 12,
    }));

    const scatterData = { datasets };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: "top" },
            tooltip: {
                callbacks: {
                    label: (context: any) =>
                        `X: ${context.raw.x.toFixed(3)}, Y: ${context.raw.y.toFixed(3)}, Cluster: ${context.raw.cluster}`,
                },
            },
        },
        scales: {
            x: { title: { display: true, text: "PCA 1" } },
            y: { title: { display: true, text: "PCA 2" } },
        },
    };

    return (
        <div className="w-full min-h-screen grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8 px-4 md:px-32">
            {/* Painel de filtros */}
            <div className="w-full flex flex-col p-4 md:p-12 gap-8 justify-center items-center">
                <div className="w-full md:w-1/2 flex flex-col">
                    <label htmlFor="ano">Escolha o ano</label>
                    <input
                        id="ano"
                        type="number"
                        min="2020"
                        max="2025"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="w-full bg-[#e4b75c] p-3 md:p-5 rounded text-black"
                    />
                </div>
            </div>

            {/* Gráfico */}
            <div className="w-full h-1/2 md:h-screen flex justify-center items-center p-4 md:p-12">
                {scatterData ? (
                    <div className="w-full h-2/3">
                        <Scatter data={scatterData} options={options} />
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
