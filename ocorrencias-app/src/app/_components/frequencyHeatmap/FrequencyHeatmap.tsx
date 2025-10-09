"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getHeatmapData, HeatmapData } from "@/app/_service/frequency";

const Plot = dynamic<any>(() => import("react-plotly.js"), { ssr: false });

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

export default function FrequencyHeatmap() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());
  const [selectedBairro, setSelectedBairro] = useState<string>("Boa Viagem");
  const [data, setData] = useState<HeatmapData | null>(null);
  const [loading, setLoading] = useState(true);

  const [isYearModalOpen, setIsYearModalOpen] = useState<boolean>(false);
  const years = Array.from({ length: Number(currentYear) - 2020 + 1 }, (_, i) => (2020 + i).toString());

  async function fetchData(selectedYear: string, selectedBairro: string) {
    setLoading(true);
    const result = await getHeatmapData({
      year: selectedYear,
      bairro: selectedBairro,
      columns_top: 10,
      index_top: 10,
    });
    setData(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchData(selectedYear, selectedBairro);
  }, [selectedYear, selectedBairro]);

  // UX: ESC para fechar e bloquear scroll quando modal aberto
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

  return (
    <div className="w-full min-h-screen gap-8">
      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-black mt-20">2. Mapa de Frequência: Modus Operandi x Tipo de Crime</h1>
      <div className="w-full flex flex-col md:flex-row p-4 md:p-12 gap-8 justify-start items-start">
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
      </div>
      {/* Heatmap */}
      <div className="w-full flex justify-center items-center md:p-12 px-4 md:px-32">
        {data ? (
          <div className="w-full h-[500px] md:h-[660px]">
            <Plot
              data={[
                {
                  z: data.data,
                  x: data.columns,
                  y: data.index,
                  type: "heatmap",
                  colorscale: "YlOrRd",
                  showscale: true,
                  text: data.data.map((row) => row.map(String)),
                  texttemplate: "%{text}",
                  hoverinfo: "x+y+z",
                },
              ]}
              layout={{
                title: {
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

      {isYearModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsYearModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="freq-year-modal-title"
            className="bg-white rounded-xl shadow-xl w-11/12 max-w-md p-4 md:p-5 border border-gray-200 ring-1 ring-black/5 transition-all duration-200 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 bg-black px-3 py-2 rounded-t-xl -mx-4 -mt-4 md:-mx-5 md:-mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 16H5V9h14v11M7 11h2v2H7v-2m4 0h2v2h-2v-2m4 0h2v2h-2v-2M7 15h2v2H7v-2m4 0h2v2h-2v-2m4 0h2v2h-2v-2z" />
                </svg>
                <h2 id="freq-year-modal-title" className="text-lg font-bold text-white">Selecione o ano</h2>
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
  );
}
