// src/app/_service/clusteringService.ts
export interface PCAData {
    pca1: number[];
    pca2: number[];
    cluster: number[];
}

export async function getPCAData(params: Record<string, string> = {}): Promise<PCAData | null> {
    try {
        const query = new URLSearchParams(params).toString();
        const url = `https://api-pi-s9mk.onrender.com/pca?${query}`;

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
            throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        if (
            !data ||
            !Array.isArray(data.pca1) ||
            !Array.isArray(data.pca2) ||
            !Array.isArray(data.cluster)
        ) {
            console.error("Dados da API em formato inesperado:", data);
            return null;
        }

        return {
            pca1: data.pca1,
            pca2: data.pca2,
            cluster: data.cluster,
        };
    } catch (error) {
        console.error("Erro ao buscar dados do PCA:", error);
        return null;
    }
}
