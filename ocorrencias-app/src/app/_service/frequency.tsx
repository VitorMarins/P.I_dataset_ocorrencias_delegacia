// src/app/_service/heatmapService.ts

export interface HeatmapData {
    columns: string[];
    data: number[][];
    index: string[];
    params: {
        bairros: string[];
        columns_top: number;
        index_top: number;
        year: number;
    };
    value_kind: string;
}

export async function getHeatmapData(params: Record<string, string | number> = {}): Promise<HeatmapData | null> {
    try {
        const query = new URLSearchParams(
            Object.entries(params).map(([key, value]) => [key, String(value)])
        ).toString();

        const url = `https://api-pi-s9mk.onrender.com/heatmap?${query}`;

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
            throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        // Validando o formato esperado
        if (
            !data ||
            !Array.isArray(data.columns) ||
            !Array.isArray(data.data) ||
            !Array.isArray(data.index) ||
            !data.params ||
            !Array.isArray(data.params.bairros)
        ) {
            console.error("Dados da API em formato inesperado:", data);
            return null;
        }

        return data as HeatmapData;
    } catch (error) {
        console.error("Erro ao buscar dados do heatmap:", error);
        return null;
    }
}
