import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8006/api/crossref",
    headers: {
        "Content-type": "application/json"
    }
});

class AIService {
    getRadar() {
        return apiClient.get("/radar");
    }

    getDailyConnection(date, lang = 'es') {
        const params = date ? { date, lang } : { lang };
        return apiClient.get("/analysis/connection", { params });
    }

    getFrontier(date, lang = 'es') {
        const params = date ? { date, lang } : { lang };
        return apiClient.get("/analysis/frontier", { params });
    }

    getGap(date, lang = 'es') {
        const params = date ? { date, lang } : { lang };
        return apiClient.get("/analysis/gap", { params });
    }

    generateSample(date) {
        const params = date ? { date } : {};
        return apiClient.get("/sample", { params });
    }

    getDailySamples(date) {
        const params = date ? { date } : {};
        return apiClient.get("/daily-samples", { params });
    }
}

export default new AIService();
