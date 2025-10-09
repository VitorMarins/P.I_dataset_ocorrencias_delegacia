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

interface ClusteringProps {
    year?: number; // opcional, caso não seja passado
}

export default function Clustering({ year = new Date().getFullYear() }: ClusteringProps) {
    const [data, setData] = useState<PCAData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const result = await getPCAData({ year: year.toString() });
            setData(result);
            setLoading(false);
        }
        fetchData();
    }, [year]);

    if (loading) return <p>Carregando dados...</p>;
    if (!data) return <p>Erro ao carregar dados.</p>;

    const scatterData = {
        datasets: [
            {
                label: `Clustering PCA - ${year}`,
                data: data.pca1.map((x, i) => ({ x, y: data.pca2[i] })),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: { legend: { display: true }, tooltip: { enabled: true } },
        scales: {
            x: { title: { display: true, text: "PCA 1" } },
            y: { title: { display: true, text: "PCA 2" } },
        },
    };

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <Scatter data={scatterData} options={options} />
        </div>
    );
}
