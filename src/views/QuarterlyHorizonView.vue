<template>
  <div class="container mt-5 pt-5 pb-5">
    <!-- Header Section -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="ai-header-card p-4 p-md-5 rounded-5 shadow-lg position-relative overflow-hidden text-white">
          <div class="ai-header-glow"></div>
          <div class="position-relative z-1 d-md-flex align-items-center justify-content-between">
            <div>
              <div class="d-inline-flex align-items-center badge bg-primary bg-opacity-25 border border-primary border-opacity-50 text-white rounded-pill px-3 py-2 mb-3">
                <i class="bi bi-stars me-2 text-warning"></i>
                {{ $t("AI Generated") }}
              </div>
              <h1 class="display-5 fw-bold mb-2">
                <template v-if="$t('Horizon Scanning').split(' ').length > 2">
                   {{ $t('Horizon Scanning').split(' ').slice(0, -1).join(' ') }} <span class="text-warning">{{ $t('Horizon Scanning').split(' ').slice(-1)[0] }}</span>
                </template>
                <template v-else>
                   {{ $t('Horizon Scanning').split(' ')[0] }} <span class="text-warning">{{ $t('Horizon Scanning').split(' ')[1] }}</span>
                </template>
              </h1>
              <p class="lead opacity-75 mb-0" style="max-width: 600px;">
                {{ $t("Horizon Description") }}
              </p>
            </div>
            <!-- Rationale Card -->
            <div class="mt-4 mt-md-0 ms-md-5 p-4 rounded-4 bg-black bg-opacity-25 border border-white border-opacity-10 backdrop-blur-sm shadow-sm" style="max-width: 500px;">
                <h6 class="fw-bold mb-3 text-warning d-flex align-items-center" style="font-size: 1.25rem;">
                  <i class="bi bi-compass me-2"></i>{{ $t("Data Source") }}
                </h6>
                <p class="mb-0 lh-sm font-16">
                    {{ $t("Horizon Rationale") }}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Explanation Card (Yellowish) - MOVED UP AS REQUESTED -->
    <div class="mb-5 p-4 rounded-4 bg-warning bg-opacity-10 border border-warning border-opacity-25 d-flex align-items-center gap-4 animate__animated animate__fadeIn">
        <div class="icon-box rounded-3 bg-warning text-dark p-3 flex-shrink-0 shadow-sm">
            <i class="bi bi-graph-up-arrow fs-3"></i>
        </div>
        <div>
            <h4 class="fw-bold mb-1 text-dark">{{ $t("Horizon Scanning") }}</h4>
            <p class="mb-0 font-16 text-dark opacity-75" style="line-height: 1.5;">
              {{ $t("Horizon Bottom Footer") }}
            </p>
        </div>
    </div>

    <!-- Filters Section -->
    <div class="row align-items-center justify-content-between mb-4 px-2">
        <div class="col-md-auto d-flex align-items-center gap-3">
            <i class="bi bi-funnel fs-3 text-secondary"></i>
            <h2 class="h4 fw-bold mb-0 text-dark">
                {{ comparisonLabel }}
            </h2>
        </div>
        <div class="col-md-auto mt-3 mt-md-0 d-flex gap-2">
            <el-select v-model="selectedYear" placeholder="Año" style="width: 120px;" size="large" @change="fetchAnalysis">
              <el-option v-for="y in filteredYears" :key="y" :label="y" :value="y" />
            </el-select>
            <el-select v-model="selectedQuarter" placeholder="Trimestre" style="width: 180px;" size="large" @change="fetchAnalysis">
              <el-option :value="1" label="Q1 (Ene-Mar)" />
              <el-option :value="2" label="Q2 (Abr-Jun)" />
              <el-option :value="3" label="Q3 (Jul-Sep)" />
              <el-option :value="4" label="Q4 (Oct-Dic)" />
            </el-select>
        </div>
    </div>

    <!-- Analysis Content Card -->
    <div class="card border-0 shadow-lg rounded-4 overflow-hidden bg-white animate__animated animate__fadeInUp">
      <div class="card-body p-4 p-md-5">
        <div class="analysis-content-wrapper p-0" v-loading="loading">
          <div v-if="content">
            <div v-html="content" class="analysis-content lead fs-6"></div>
          </div>
          <div v-else-if="!loading" class="text-center py-5">
            <div class="alert alert-info rounded-4 py-5 shadow-sm border-0">
              <i class="bi bi-clock-history display-1 mb-3 d-block text-secondary opacity-50"></i>
              <h4 class="fw-bold text-dark mb-2 font-16">{{ $t("Analysis not generated yet") }}</h4>
              <p class="mb-0 text-secondary font-16">
                Este análisis prospectivo trimestral aún no ha sido procesado para el periodo seleccionado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import AIService from '@/service/AIService';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'QuarterlyHorizonView',
  setup() {
    const { locale, t } = useI18n();
    
    // Inicializar trimestre anterior
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const prevQuarter = currentMonth < 3 ? 4 : Math.floor((currentMonth - 3) / 3) + 1;
    const prevQuarterYear = currentMonth < 3 ? now.getFullYear() - 1 : now.getFullYear();

    const selectedYear = ref(prevQuarterYear);
    const selectedQuarter = ref(prevQuarter);
    
    const loading = ref(false);
    const content = ref(null);
    
    // Generar años desde 2025 hasta el año actual
    const filteredYears = computed(() => {
      const currentY = new Date().getFullYear();
      const all = [];
      for (let y = currentY; y >= 2025; y--) {
        all.push(y);
      }
      return all;
    });

    const fetchAnalysis = async () => {
      loading.value = true;
      content.value = null;
      try {
        const res = await AIService.getQuarterlyAnalysis(selectedYear.value, selectedQuarter.value, locale.value);
        content.value = res.data?.content || null;
      } catch (error) {
        console.error("Error fetching quarterly analysis", error);
      } finally {
        loading.value = false;
      }
    };

    const comparisonLabel = computed(() => {
      const prevQ = selectedQuarter.value === 1 ? 4 : selectedQuarter.value - 1;
      const prevY = selectedQuarter.value === 1 ? selectedYear.value - 1 : selectedYear.value;
      
      const currentLabel = `Q${selectedQuarter.value} ${selectedYear.value}`;
      const previousLabel = `Q${prevQ} ${prevY}`;

      return `${t('Comparing')} ${currentLabel} ${t('vs')} ${previousLabel}`;
    });

    onMounted(fetchAnalysis);

    return {
      selectedYear,
      selectedQuarter,
      filteredYears,
      loading,
      content,
      fetchAnalysis,
      comparisonLabel
    };
  }
});
</script>

<style scoped>
.ai-header-card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  min-height: 200px;
}

.ai-header-glow {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(234, 179, 8, 0.1) 0%, transparent 70%);
  z-index: 0;
}

.analysis-content :deep(h3) {
  font-weight: 700;
  color: #111827;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.analysis-content :deep(p) {
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 1rem;
}

.font-16 {
  font-size: 16px !important;
  font-family: 'Roboto', sans-serif !important;
}

.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}
</style>
