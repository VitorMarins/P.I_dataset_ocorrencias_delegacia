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

export default function ClusteringChart() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [data, setData] = useState<PCAData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isYearModalOpen, setIsYearModalOpen] = useState<boolean>(false);
  const years = Array.from({ length: 2025 - 2020 + 1 }, (_, i) => 2020 + i);

  async function fetchData(selectedYear: number) {
    setLoading(true);
    const result = await getPCAData({ year: selectedYear.toString() });
    setData(result);
    setLoading(false);
  }
  useEffect(() => {
    fetchData(year);
  }, [year]);
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

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Carregando dados...</p>
      </div>
    );

  if (!data) return <p>Erro ao carregar dados.</p>;

  const clusterColors: Record<number, string> = {
    0: "rgba(0, 200, 0, 0.6)", // verde
    1: "rgba(128, 0, 128, 0.6)", // roxo
    2: "rgba(255, 206, 0, 0.6)", // amarelo
  };

  const datasets = [0, 1, 2].map((clusterId) => ({
    label: `Cluster ${clusterId}`,
    data: data.pca1
      .map((x, i) => ({ x, y: data.pca2[i], cluster: data.cluster[i] }))
      .filter((point) => point.cluster === clusterId),
    backgroundColor: clusterColors[clusterId],
    pointRadius: 12,
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
  } as const;

  return (
    <div className="w-full min-h-screen gap-8 ">
      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-black">3. Tela de clusterização</h1>
      {/* Painel de filtros */}
      <div className="mt-10">
        <div className="w-full md:w-1/2">
          <label htmlFor="ano" className="text-base font-bold">Escolha o ano</label>
          <input
                        id="ano"
                        type="text"
                        readOnly
                        value={year}
                        onClick={() => setIsYearModalOpen(true)}
                        className="w-full border border-gray-300 p-3 md:p-5 mt-4 rounded text-black cursor-pointer bg-white"
                    />  
        </div>
      </div>

      {/* Gráfico */}
      <div className="w-full mt-5">
        {scatterData ? (
          <div className="w-full h-[360px] md:h-[560px]">
            <Scatter data={scatterData} options={options} />
          </div>
        ) : (
          <div className="w-full h-auto flex justify-center items-center ">
            <p className="text-lg text-gray-700">Carregando gráfico...</p>
          </div>
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
            aria-labelledby="cluster-year-modal-title"
            className="bg-white rounded-xl shadow-xl w-11/12 max-w-md p-4 md:p-5 border border-gray-200 ring-1 ring-black/5 transition-all duration-200 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 bg-black px-3 py-2 rounded-t-xl -mx-4 -mt-4 md:-mx-5 md:-mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 16H5V9h14v11M7 11h2v2H7v-2m4 0h2v2h-2v-2m4 0h2v2h-2v-2M7 15h2v2H7v-2m4 0h2v2h-2v-2m4 0h2v2h-2v-2z" />
                </svg>
                <h2 id="cluster-year-modal-title" className="text-lg font-bold text-white">Selecione o ano</h2>
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
                    setYear(y);
                    setIsYearModalOpen(false);
                  }}
                  className={`py-2 rounded-lg border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e4b75c] hover:shadow-sm active:scale-[.98] ${
                    year === y
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
  );
}
