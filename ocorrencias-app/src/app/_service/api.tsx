// src/services/prosService.ts

export interface YearSummary {
    year: number;
    bairros: string[];
    data: {
        bairro: string;
        month: number;
        value: number;
    }[];
}

export async function getServerPros(
    params: Record<string, string> = {}
): Promise<YearSummary | null> {
    try {
        const query = new URLSearchParams({
            value_type: "observed", 
            ...params,
        }).toString();

        const url = `https://api-pi-s9mk.onrender.com/year/summary?${query}`;
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
            throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        return data as YearSummary;
    } catch (error) {
        console.error("Erro ao buscar dados do servidor:", error);
        return null;
    }
}
