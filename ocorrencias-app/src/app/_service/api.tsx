// src/services/prosService.ts

interface YearSummary {
    year: number;
    bairro: string;
    include_predictions: boolean;
}

export async function getServerPros(
    params: Record<string, string> = {}
): Promise<YearSummary | null> {
    try {
        
        const query = new URLSearchParams({
            year: "2025",
            bairro: "Boa Viagem",
            include_predictions: "true",
            ...params,
        }).toString();

        const res = await fetch(
            `https://api-pi-s9mk.onrender.com/year/summary?${query}`,
            { cache: "no-store" }
        );

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
