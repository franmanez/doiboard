<template>
  <div class="container mt-5 pt-5 pb-5">
    
    <!-- Modern Header Section -->
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
                <i18n-t keypath="Daily Analysis Title" tag="span">
                  <template #highlighted>
                    <span class="text-warning">{{ $i18n.locale === 'en' ? 'Daily' : $i18n.locale === 'ca' ? 'Diària' : 'Diario' }}</span>
                  </template>
                </i18n-t>
              </h1>
              <p class="lead opacity-75 mb-0" style="max-width: 600px;">
                {{ $t("Daily Analysis Subtitle") }}
              </p>
            </div>
            <!-- Rationale Card (Right Side) -->
            <div class="mt-4 mt-md-0 ms-md-5 p-4 rounded-4 bg-black bg-opacity-25 border border-white border-opacity-10 backdrop-blur-sm shadow-sm" style="max-width: 500px;">
                <h6 class="fw-bold mb-3 text-warning d-flex align-items-center" style="font-size: 1.25rem;">
                  <i class="bi bi-activity me-2"></i>{{ $t("Living Pulse") }}
                </h6>
                <p class="mb-2 lh-sm font-16">
                    {{ $t("Monitor Explanation") }}
                </p>
                <ul class="mb-3 ps-3 font-16">
                    <li class="mb-2">
                        <strong>Daily Connections:</strong> {{ $t("Serendipity Explanation") }}
                    </li>
                    <li class="mb-0">
                        <strong>Frontiers & Gaps:</strong> {{ $t("Snapshots Explanation") }}
                    </li>
                </ul>
                <div class="border-top border-white border-opacity-10 pt-2 mt-2">
                    <p class="mb-0 text-white text-opacity-50 fst-italic" style="font-size: 1rem; line-height: 1.4;">
                        <i class="bi bi-exclamation-circle me-1"></i> {{ $t("Daily Sampling Disclaimer") }}
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="row">
      <div class="col-12">
        
        <!-- Large Custom Tabs -->
        <div class="row g-0 mb-4 rounded-4 overflow-hidden shadow-sm border bg-white nav-tabs-container">
          <div class="col-md-4">
            <button 
              @click="activeTab = 'connection'" 
              class="btn w-100 h-100 py-4 border-0 rounded-0 tab-btn d-flex flex-column align-items-center justify-content-center position-relative"
              :class="{ 'active': activeTab === 'connection', 'text-white bg-dark': activeTab === 'connection', 'text-muted bg-light': activeTab !== 'connection' }"
            >
              <i class="bi bi-diagram-3 fs-2 mb-2"></i>
              <span class="fw-bold h5 mb-0">{{ $t("Daily Connections") }}</span>
              <div class="tab-indicator bg-warning" v-if="activeTab === 'connection'"></div>
            </button>
          </div>
          <div class="col-md-4">
            <button 
              @click="activeTab = 'frontier'" 
              class="btn w-100 h-100 py-4 border-0 rounded-0 tab-btn d-flex flex-column align-items-center justify-content-center position-relative"
              :class="{ 'active': activeTab === 'frontier', 'text-dark bg-warning': activeTab === 'frontier', 'text-muted bg-light border-start border-end': activeTab !== 'frontier' }"
            >
              <i class="bi bi-rocket-takeoff fs-2 mb-2"></i>
              <span class="fw-bold h5 mb-0">{{ $t("Frontiers") }}</span>
              <div class="tab-indicator bg-dark" v-if="activeTab === 'frontier'"></div>
            </button>
          </div>
          <div class="col-md-4">
            <button 
              @click="activeTab = 'gap'" 
              class="btn w-100 h-100 py-4 border-0 rounded-0 tab-btn d-flex flex-column align-items-center justify-content-center position-relative"
              :class="{ 'active': activeTab === 'gap', 'text-white bg-secondary': activeTab === 'gap', 'text-muted bg-light': activeTab !== 'gap' }"
            >
              <i class="bi bi-search fs-2 mb-2"></i>
              <span class="fw-bold h5 mb-0">{{ $t("Knowledge Gaps") }}</span>
              <div class="tab-indicator bg-warning" v-if="activeTab === 'gap'"></div>
            </button>
          </div>
        </div>

        <!-- Info Banner (Explanation Box) -->
        <div class="info-card p-4 rounded-4 d-flex align-items-center gap-4 mb-5" :class="infoCardClass">
            <div class="d-flex align-items-start gap-4 w-100">
              <div class="icon-box rounded-3 text-white p-3 flex-shrink-0 shadow-sm" :class="iconBoxClass">
                <i :class="currentIcon" class="fs-3"></i>
              </div>
              <div>
                <h4 class="fw-bold mb-1">{{ currentTitle }}</h4>
                <p class="mb-0 font-16" style="line-height: 1.5;">{{ currentDescription }}</p>
              </div>
            </div>
        </div>

        <!-- Date Selection and Title Section -->
        <div class="row align-items-center justify-content-between mb-4 px-2">
            <div class="col-md-auto d-flex align-items-center gap-3">
                <i class="bi bi-calendar-event fs-3 text-secondary"></i>
                <h2 class="h3 fw-bold mb-0 text-dark">
                    {{ $t("Analysis of the day") }} <span class="text-warning">{{ selectedDate }}</span>
                </h2>
            </div>
            <div class="col-md-auto mt-3 mt-md-0">
                <div class="date-picker-wrapper">
                    <el-date-picker
                    v-model="selectedDate"
                    type="date"
                    placeholder="Cambiar fecha"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    @change="fetchAllAnalyses"
                    :disabled-date="disabledDate"
                    :clearable="false"
                    size="large"
                    class=""
                    style="width: 220px;"
                    />
                </div>
            </div>
        </div>

        <!-- Analysis Content Card (No internal scroll) -->
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden bg-white animate__animated animate__fadeInUp">
          <div class="card-body p-4 p-md-5">
            <div class="analysis-content-wrapper p-0" v-loading="loading[activeTab]">
              <div v-if="analyses[activeTab]">
                <div v-html="analyses[activeTab]" class="analysis-content lead fs-6"></div>
              </div>
              
              <div v-else-if="!loading[activeTab]" class="text-center py-5">
                <div class="alert alert-danger rounded-4 py-5 shadow-sm border-0 animate__animated animate__shakeX">
                  <i class="bi bi-exclamation-triangle-fill display-1 mb-3 d-block text-danger"></i>
                  <h4 class="fw-bold text-danger mb-2 font-16">{{ $t("Analysis not available") }}</h4>
                  <p class="mb-0 text-secondary font-16">{{ $t("Analysis not available description") }}</p>
                </div>
              </div>

              <!-- DRILL-DOWN: DAILY SAMPLES -->
              <div class="mt-5 pt-4 border-top">
                <div class="d-flex justify-content-center">
                  <button 
                    class="btn btn-outline-dark rounded-pill px-4 d-flex align-items-center gap-2 transition-all"
                    @click="toggleSamples"
                    :disabled="loadingSamples"
                  >
                    <i class="bi" :class="showSamples ? 'bi-chevron-up' : 'bi-journal-text'"></i>
                    <span class="font-16">{{ showSamples ? $t("Hide sources") : $t("Show sources") }}</span>
                    <span v-if="loadingSamples" class="spinner-border spinner-border-sm ms-2"></span>
                  </button>
                </div>

                <div v-if="showSamples" class="mt-4 animate__animated animate__fadeIn">
                  <div class="table-responsive rounded-4 border shadow-sm bg-light bg-opacity-50">
                    <table class="table table-hover align-middle mb-0" style="font-size: 0.85rem;">
                      <thead class="table-dark">
                        <tr>
                          <th scope="col" class="ps-4 font-16">{{ $t("Title / DOI") }}</th>
                          <th scope="col" class="text-end pe-4 font-16">{{ $t("Publisher") }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="work in dailySamples" :key="work.doi">
                          <td class="ps-4 py-3" style="max-width: 500px;">
                            <div class="fw-bold text-dark mb-1 font-16">{{ work.title || $t("Title") + ' (' + $t("Document Type All") + ')' }}</div>
                            <a :href="'https://doi.org/' + work.doi" target="_blank" class="text-primary text-decoration-none small">
                              <i class="bi bi-link-45deg"></i> {{ work.doi }}
                            </a>
                          </td>
                          <td class="text-secondary text-end pe-4">{{ work.publisher || '-' }}</td>
                        </tr>
                        <tr v-if="dailySamples.length === 0 && !loadingSamples">
                          <td colspan="2" class="text-center py-4 text-muted font-16">{{ $t("No sampling data") }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
import { format, subDays } from 'date-fns';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'AIAnalysisView',
  setup() {
    const { locale, t } = useI18n();
    const selectedDate = ref(format(subDays(new Date(), 1), 'yyyy-MM-dd'));
    const activeTab = ref('connection');
    const loading = ref({ connection: false, frontier: false, gap: false });
    const analyses = ref({ connection: null, frontier: null, gap: null });

    // Samples state
    const dailySamples = ref([]);
    const loadingSamples = ref(false);
    const showSamples = ref(false);

    const disabledDate = (time) => {
      return time.getTime() > Date.now();
    };

    const fetchAllAnalyses = async () => {
      const date = selectedDate.value;
      const currentLang = locale.value;
      
      // Reset samples on date change
      showSamples.value = false;
      dailySamples.value = [];

      // Connection
      loading.value.connection = true;
      AIService.getDailyConnection(date, currentLang).then(res => {
        analyses.value.connection = res.data.content;
      }).finally(() => loading.value.connection = false);

      // Frontier
      loading.value.frontier = true;
      AIService.getFrontier(date, currentLang).then(res => {
        analyses.value.frontier = res.data.content;
      }).finally(() => loading.value.frontier = false);

      // Gap
      loading.value.gap = true;
      AIService.getGap(date, currentLang).then(res => {
        analyses.value.gap = res.data.content;
      }).finally(() => loading.value.gap = false);
    };

    const toggleSamples = async () => {
      if (showSamples.value) {
        showSamples.value = false;
        return;
      }

      if (dailySamples.value.length === 0) {
        loadingSamples.value = true;
        try {
          const res = await AIService.getDailySamples(selectedDate.value);
          dailySamples.value = res.data;
          showSamples.value = true;
        } catch (error) {
          ElMessage.error(t("Error loading sources"));
          console.error(error);
        } finally {
          loadingSamples.value = false;
        }
      } else {
        showSamples.value = true;
      }
    };



    // Computeds for dynamic content
    const currentTitle = computed(() => {
      const titles = {
        connection: t("Connection Full Title"),
        frontier: t("Frontier Full Title"),
        gap: t("Gap Full Title")
      };
      return titles[activeTab.value];
    });

    const currentDescription = computed(() => {
      const descs = {
        connection: t("Connection Description"),
        frontier: t("Frontier Description"),
        gap: t("Gap Description")
      };
      return descs[activeTab.value];
    });

    const currentIcon = computed(() => {
      const icons = {
        connection: 'bi-diagram-3',
        frontier: 'bi-rocket-takeoff',
        gap: 'bi-search'
      };
      return icons[activeTab.value];
    });

    const infoCardClass = computed(() => {
      const classes = {
        connection: 'bg-dark bg-opacity-10 border border-dark border-opacity-25',
        frontier: 'bg-warning bg-opacity-10 border border-dark border-opacity-25',
        gap: 'bg-secondary bg-opacity-10 border border-dark border-opacity-25'
      };
      return classes[activeTab.value];
    });

    const iconBoxClass = computed(() => {
       const classes = {
        connection: 'bg-dark',
        frontier: 'bg-warning text-dark-important',
        gap: 'bg-secondary'
      };
      return classes[activeTab.value];
    });

    onMounted(fetchAllAnalyses);

    return {
      selectedDate,
      activeTab,
      loading,
      analyses,
      disabledDate,
      fetchAllAnalyses,
      currentTitle,
      currentDescription,
      currentIcon,
      infoCardClass,
      iconBoxClass,
      dailySamples,
      loadingSamples,
      showSamples,
      toggleSamples
    };
  }
});
</script>

<style scoped>
.ai-header-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  min-height: 250px;
}

.ai-header-glow {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(253, 186, 116, 0.15) 0%, transparent 70%);
  z-index: 0;
}

.tab-btn {
  transition: all 0.3s ease;
}

.tab-btn:hover:not(.active) {
  background-color: #f8f9fa !important;
  color: #000 !important;
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
}

.markdown-content :deep(p) {
  line-height: 1.8;
  color: #4b5563;
}

.text-dark-important {
  color: #212529 !important;
}

.animate__fadeIn {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.transition-all {
    transition: all 0.3s ease;
}

.btn-outline-dark:hover {
    background-color: #1e293b;
    border-color: #1e293b;
    color: white;
}

.font-16 {
  font-size: 16px !important;
  font-family: 'Roboto', sans-serif !important;
}
</style>
