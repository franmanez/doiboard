import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'https://doi.upc.edu/api',
    headers: {
        "Content-type": "application/json"
    }
});

class AIService {
    getRadar() {
        return apiClient.get("/radar");
    }

    getMonthlyAnalysis(year, month, lang = 'es') {
        const params = { year, month, lang };
        return apiClient.get("/analysis/monthly", { params });
    }

    getQuarterlyAnalysis(year, quarter, lang = 'es') {
        const params = { year, quarter, lang };
        return apiClient.get("/analysis/quarterly", { params });
    }

    computeMonthly(year, month) {
        const params = { year, month };
        return apiClient.get("/analysis/compute/monthly", { params });
    }

    computeQuarterly(year, quarter) {
        const params = { year, quarter };
        return apiClient.get("/analysis/compute/quarterly", { params });
    }
}

export default new AIService();
