<template>
  <div class="container mt-5 pt-5 pb-5">
    <!-- Header Section -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="ai-header-card p-4 p-md-5 rounded-5 shadow-lg position-relative overflow-hidden text-white bg-dark">
          <div class="ai-header-glow"></div>
          <div class="position-relative z-1 d-md-flex align-items-center justify-content-between">
            <div>
              <div class="d-inline-flex align-items-center badge bg-primary bg-opacity-25 border border-primary border-opacity-50 text-white rounded-pill px-3 py-2 mb-3">
                <i class="bi bi-stars me-2 text-warning"></i>
                {{ $t("AI Generated") }}
              </div>
              <h1 class="display-5 fw-bold mb-2">
                <template v-if="$t('Monthly Synthesis').split(' ').length > 2">
                   {{ $t('Monthly Synthesis').split(' ').slice(0, -1).join(' ') }} <span class="text-warning">{{ $t('Monthly Synthesis').split(' ').slice(-1)[0] }}</span>
                </template>
                <template v-else>
                   {{ $t('Monthly Synthesis').split(' ')[0] }} <span class="text-warning">{{ $t('Monthly Synthesis').split(' ')[1] }}</span>
                </template>
              </h1>
              <p class="lead opacity-75 mb-0" style="max-width: 600px;">
                {{ $t("Synthesis Description") }}
              </p>
            </div>
            <!-- Rationale Card -->
            <div class="mt-4 mt-md-0 ms-md-5 p-4 rounded-4 bg-black bg-opacity-25 border border-white border-opacity-10 backdrop-blur-sm shadow-sm" style="max-width: 500px;">
                <h6 class="fw-bold mb-3 text-warning d-flex align-items-center" style="font-size: 1.25rem;">
                  <i class="bi bi-info-circle me-2"></i>{{ $t("Data Source") }}
                </h6>
                <p class="mb-0 lh-sm font-16">
                    {{ $t("Synthesis Rationale") }}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Explanation Card (Greyish) - MOVED UP AS REQUESTED -->
    <div class="mb-5 p-4 rounded-4 bg-dark bg-opacity-10 border border-dark border-opacity-25 d-flex align-items-center gap-4 animate__animated animate__fadeIn">
        <div class="icon-box rounded-3 bg-dark text-white p-3 flex-shrink-0 shadow-sm">
            <i class="bi bi-journal-richtext fs-3"></i>
        </div>
        <div>
            <h4 class="fw-bold mb-1">{{ $t("Monthly Synthesis") }}</h4>
            <p class="mb-0 font-16 text-secondary" style="line-height: 1.5;">
              {{ $t("Synthesis Bottom Footer") }}
            </p>
        </div>
    </div>

    <!-- Filters Section -->
    <div class="row align-items-center justify-content-between mb-4 px-2">
        <div class="col-md-auto d-flex align-items-center gap-3">
            <i class="bi bi-calendar-check fs-3 text-secondary"></i>
            <h2 class="h4 fw-bold mb-0 text-dark">
                {{ $t("Analysis of") }} {{ getMonthName(selectedMonth) }} {{ selectedYear }}
            </h2>
        </div>
        <div class="col-md-auto mt-3 mt-md-0 d-flex gap-2">
            <el-select v-model="selectedYear" placeholder="Año" style="width: 120px;" size="large" @change="fetchAnalysis">
              <el-option v-for="y in filteredYears" :key="y" :label="y" :value="y" />
            </el-select>
            <el-select v-model="selectedMonth" placeholder="Mes" style="width: 150px;" size="large" @change="fetchAnalysis" popper-class="full-height-popper">
              <el-option v-for="m in 12" :key="m" :label="getMonthName(m)" :value="m" />
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
                Este análisis mensual de alto impacto aún no ha sido procesado para el periodo seleccionado.
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
  name: 'MonthlySynthesisView',
  setup() {
    const { locale } = useI18n();
    
    const now = new Date();
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const selectedYear = ref(lastMonthDate.getFullYear());
    const selectedMonth = ref(lastMonthDate.getMonth() + 1);
    
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
        const res = await AIService.getMonthlyAnalysis(selectedYear.value, selectedMonth.value, locale.value);
        content.value = res.data?.content || null;
      } catch (error) {
        console.error("Error fetching analysis", error);
      } finally {
        loading.value = false;
      }
    };

    const getMonthName = (m) => {
      const date = new Date(2000, m - 1);
      return date.toLocaleString(locale.value, { month: 'long' });
    };

    onMounted(fetchAnalysis);

    return {
      selectedYear,
      selectedMonth,
      filteredYears,
      loading,
      content,
      fetchAnalysis,
      getMonthName
    };
  }
});
</script>

<style scoped>
.ai-header-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  min-height: 200px;
}

.ai-header-glow {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(253, 186, 116, 0.1) 0%, transparent 70%);
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

<style>
/* Global style to remove scroll from months dropdown */
.full-height-popper .el-select-dropdown__wrap {
    max-height: none !important;
}
</style>
