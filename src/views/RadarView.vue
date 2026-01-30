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
                <i18n-t keypath="Radar View Title" tag="span">
                  <template #highlighted>
                    <span class="text-warning">{{ $i18n.locale === 'en' ? 'Scientific' : $i18n.locale === 'ca' ? 'Científiques' : 'Científicas' }}</span>
                  </template>
                </i18n-t>
              </h1>
              <p class="lead opacity-75 mb-0" style="max-width: 600px;">
                {{ $t("Radar View Subtitle") }}
              </p>
            </div>
            <!-- Rationale Card (Right Side) -->
            <div class="mt-4 mt-md-0 ms-md-5 p-4 rounded-4 bg-black bg-opacity-25 border border-white border-opacity-10 backdrop-blur-sm shadow-sm" style="max-width: 500px;">
                <h6 class="fw-bold mb-3 text-warning d-flex align-items-center" style="font-size: 1.25rem;">
                  <i class="bi bi-cpu me-2"></i>{{ $t("Interpretation Guide") }}
                </h6>
                <p class="mb-2 lh-sm">
                    {{ $t("Radar Description") }}
                </p>
                <ul class="mb-3 ps-3">
                    <li class="mb-2">
                        <strong>{{ $t("Domains Explanation").split(':')[0] }}:</strong> {{ $t("Domains Explanation").split(':')[1] }}
                    </li>
                    <li class="mb-2">
                        <strong>{{ $t("Trends Explanation").split(':')[0] }}:</strong> {{ $t("Trends Explanation").split(':')[1] }}
                    </li>
                </ul>
                <div class="border-top border-white border-opacity-10 pt-2 mt-2">
                    <p class="mb-0 text-white text-opacity-50 fst-italic" style="font-size: 1rem; line-height: 1.4;">
                        <i class="bi bi-info-circle me-1"></i> {{ $t("Sampling Info", { count: '500' }) }}
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center my-5 py-5">
      <div class="spinner-border text-primary" role="status" style="width: 3.5rem; height: 3.5rem;">
        <span class="visually-hidden">{{ $t("Search") }}...</span>
      </div>
      <p class="mt-3 text-secondary lead">{{ $t("Loading Radar") }}</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-warning rounded-4 shadow-sm p-4">
      <h4 class="alert-heading"><i class="bi bi-exclamation-triangle me-2"></i>{{ $t("Warning") }}</h4>
      <p>{{ error }}</p>
      <hr>
      <button class="btn btn-primary rounded-pill px-4" @click="fetchRadarData">{{ $t("Retry") }}</button>
    </div>

    <!-- Info Banner (Simplified Explanation Box) -->
    <div v-if="!loading && !error" class="info-card p-4 rounded-4 d-flex align-items-center gap-4 bg-dark bg-opacity-10 border border-dark border-opacity-25 mb-5">
        <div class="d-flex align-items-start gap-4 w-100">
          <div class="icon-box rounded-3 text-white p-3 flex-shrink-0 shadow-sm bg-dark">
            <i class="bi bi-diagram-3 fs-3"></i>
          </div>
          <div>
            <h4 class="fw-bold mb-1">{{ $t("Radar Guide") }}</h4>
            <div style="line-height: 1.6;">
              <p class="mb-2 font-16">
                <strong>• {{ $t("Size") }}:</strong> {{ $t("Diameter Explanation") }}
              </p>
              <p class="mb-2 font-16">
                <strong>• {{ $t("Colors") }}:</strong> {{ $t("Moment Vital Explanation") }} 
                <span style="color: #ef5350" class="fw-bold">{{ $t("Rising") }}</span>, 
                <span style="color: #66bb6a" class="fw-bold">{{ $t("New / Disruptive") }}</span>, 
                <span style="color: #42a5f5" class="fw-bold">{{ $t("Consolidated") }}</span>.
              </p>
              <p class="mb-0 font-16">
                <i class="bi bi-table me-1"></i> {{ $t("Detailed List Explanation") }}
              </p>
            </div>
          </div>
        </div>
    </div>

    <!-- Title and Date Range Section -->
    <div v-if="!loading && !error" class="row align-items-center justify-content-between mb-4 px-2">
      <div class="col-md-auto d-flex align-items-center gap-3">
          <i class="bi bi-calendar-event fs-3 text-secondary"></i>
          <h2 class="h3 fw-bold mb-0 text-dark">
              <i18n-t keypath="Analysis Period" tag="span">
                <template #start>
                  <span class="text-warning">2025-07-01</span>
                </template>
                <template #end>
                  <span class="text-warning">2025-12-31</span>
                </template>
              </i18n-t>
          </h2>
      </div>
    </div>

    <!-- Chart Section -->
    <div v-if="!loading && !error" class="row">
      <div class="col-12">
        <div class="card shadow-lg border-0 rounded-4 overflow-hidden mb-5">
          <div class="card-body p-0">
            <!-- Increased height to give more room for expansion -->
            <highcharts :options="chartOptions" class="radar-chart-element" style="height: 900px;"></highcharts>
            
            <!-- Legend (Optional, keeping it for redundancy as requested not to touch graphics) -->
            <div class="d-flex flex-wrap justify-content-center gap-4 py-3 border-top bg-light bg-opacity-50">
              <div class="d-flex align-items-center gap-2">
                <span class="dot" style="background: #ef5350; border: 2px solid #b71c1c"></span>
                <span class="fw-bold font-16">{{ $t("Rising") }}</span>
              </div>
              <div class="d-flex align-items-center gap-2">
                <span class="dot" style="background: #66bb6a; border: 2px solid #1b5e20"></span>
                <span class="fw-bold font-16">{{ $t("New / Disruptive") }}</span>
              </div>
              <div class="d-flex align-items-center gap-2">
                <span class="dot" style="background: #42a5f5; border: 2px solid #0d47a1"></span>
                <span class="fw-bold font-16">{{ $t("Consolidated") }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trend Details Grouped by Domain -->
      <div class="col-12">
        <h3 class="h4 fw-bold mb-4 px-2 text-dark">{{ $t("Macrotrends Detail") }}</h3>
        
        <div v-for="(trends, domain) in groupedRadarData" :key="domain" class="mb-5">
          <div class="d-flex align-items-center mb-3 px-2">
            <div class="domain-indicator me-3" :style="{ backgroundColor: getDomainColor(domain) }"></div>
            <h4 class="h5 fw-bold mb-0 text-primary text-uppercase tracking-wider">{{ domain }}</h4>
            <div class="ms-auto badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 rounded-pill px-3">
              {{ trends.length }} {{ trends.length === 1 ? $t('trend') : $t('trends') }}
            </div>
          </div>
          
          <div class="row g-4">
            <div v-for="tag in trends" :key="tag.tag" class="col-md-6 col-lg-4">
              <div class="card h-100 border border-secondary-subtle shadow-sm rounded-4 trend-card overflow-hidden">
                <div class="card-header border-0 text-white p-3" :style="{ backgroundColor: getTrendColor(tag.trend) }">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold text-uppercase font-14">{{ tag.trend === 'rising' ? $t("Rising") : tag.trend === 'new' ? $t("New / Disruptive") : $t("Consolidated") }}</span>
                    <span class="badge bg-white text-dark rounded-pill">{{ tag.count }} {{ $t("Article Count") }}</span>
                  </div>
                </div>
                <div class="card-body p-3">
                  <h6 class="fw-bold mb-0" style="font-size: 1.1rem; line-height: 1.3;">{{ tag.tag }}</h6>
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
import { useI18n } from 'vue-i18n';
import AIService from '@/service/AIService';
import Highcharts from 'highcharts';
import { Chart } from 'highcharts-vue';
import moreInit from 'highcharts/highcharts-more';

moreInit(Highcharts);

export default defineComponent({
  name: 'RadarView',
  components: {
    highcharts: Chart
  },
  setup() {
    const { t } = useI18n();
    const radarData = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const getTrendColor = (trend) => {
      switch (trend) {
        case 'rising': return '#ef5350'; // Rojo Suave
        case 'new': return '#66bb6a';    // Verde Suave
        case 'stable': return '#42a5f5'; // Azul Suave
        default: return '#999999';
      }
    };

    const getTrendBorderColor = (trend) => {
      switch (trend) {
        case 'rising': return '#b71c1c'; // Rojo Oscuro
        case 'new': return '#1b5e20';    // Verde Oscuro
        case 'stable': return '#0d47a1'; // Azul Oscuro
        default: return '#333333';
      }
    };

    const fetchRadarData = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await AIService.getRadar();
        radarData.value = response.data.data || [];
      } catch (err) {
        console.error("Error fetching radar data:", err);
        error.value = t("Warning") + ": " + (err.message || "Error");
      } finally {
        loading.value = false;
      }
    };

    const groupedRadarData = computed(() => {
      const groups = {};
      radarData.value.forEach(item => {
        if (!groups[item.domain]) groups[item.domain] = [];
        groups[item.domain].push(item);
      });
      
      // Sort trends within each group by count descending
      Object.keys(groups).forEach(domain => {
        groups[domain].sort((a, b) => b.count - a.count);
      });

      // Sort domains by total count of their trends
      const sortedEntries = Object.entries(groups).sort((a, b) => {
        const sumA = a[1].reduce((sum, item) => sum + item.count, 0);
        const sumB = b[1].reduce((sum, item) => sum + item.count, 0);
        return sumB - sumA;
      });

      return Object.fromEntries(sortedEntries);
    });

    // Same palette used in chartOptions
    const domainPalette = [
      '#00a8ff', '#9c88ff', '#fbc531', '#4cd137', '#487eb0',
      '#e84118', '#7f8fa6', '#273c75', '#c23616', '#192a56'
    ];

    const getDomainColor = (domainName) => {
      const domains = Object.keys(groupedRadarData.value);
      const index = domains.indexOf(domainName);
      return domainPalette[index % domainPalette.length];
    };

    const chartOptions = computed(() => {
      // Stronger specific colors for each Domain
      const domainPalette = [
        '#00a8ff', '#9c88ff', '#fbc531', '#4cd137', '#487eb0',
        '#e84118', '#7f8fa6', '#273c75', '#c23616', '#192a56'
      ];

      // Group domains
      const groups = {};
      radarData.value.forEach(item => {
        if (!groups[item.domain]) groups[item.domain] = [];
        groups[item.domain].push({
          name: item.tag,
          value: item.count,
          color: getTrendColor(item.trend),
          marker: {
            lineWidth: 2,
            lineColor: getTrendBorderColor(item.trend)
          }
        });
      });

      // Build series strictly following reference logic
      const series = Object.keys(groups).map((domainName, index) => {
        const dColor = domainPalette[index % domainPalette.length];
        return {
          name: domainName,
          color: dColor,
          data: groups[domainName],
          // This is key: Highcharts uses marker config from the series for the hull
          marker: {
            fillOpacity: 0.8, // VERY SOLID as requested
            lineWidth: 3,
            lineColor: dColor
          }
        };
      });

      return {
        chart: {
          type: 'packedbubble',
          backgroundColor: 'transparent'
        },
        title: { text: '' },
        tooltip: {
          useHTML: true,
          pointFormat: `<b>{point.name}</b>: {point.value} ${t("Article Count")}`
        },
        plotOptions: {
          packedbubble: {
            minSize: '30%',
            maxSize: '100%',
            zMin: 0,
            zMax: 100, // Based on counts in json
            layoutAlgorithm: {
              gravitationalConstant: 0.05,
              splitSeries: true, // UseCase 2 requirement
              seriesInteraction: false,
              dragBetweenSeries: true,
              parentNodeLimit: true
            },
            marker: {
              fillOpacity: 1, // Inner bubbles are solid
              states: {
                hover: {
                  fillOpacity: 1
                }
              }
            },
            parentNodeOptions: {
              marker: {
                fillOpacity: 0.8 // Solid parents as requested
              },
              dataLabels: {
                enabled: true,
                format: '{point.name}',
                style: {
                  color: '#ffffff', // White text on solid color
                  textOutline: 'none',
                  fontWeight: 'bold',
                  fontSize: '15px'
                },
                y: 0 
              }
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              style: {
                color: 'black',
                textOutline: 'none',
                fontWeight: 'bold',
                fontSize: '10px'
              }
            }
          }
        },
        series: series,
        credits: { enabled: false },
        exporting: { enabled: false }
      };
    });

    onMounted(fetchRadarData);

    return {
      radarData,
      loading,
      error,
      chartOptions,
      groupedRadarData,
      getTrendColor,
      getDomainColor,
      fetchRadarData
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

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.trend-card { transition: transform 0.2s; }
.trend-card:hover { transform: translateY(-3px); }

.rounded-4 { border-radius: 1rem !important; }
.rounded-5 { border-radius: 1.5rem !important; }

.font-16 {
  font-size: 16px !important;
  font-family: 'Roboto', sans-serif !important;
}

.font-14 {
  font-size: 14px !important;
  font-family: 'Roboto', sans-serif !important;
}

.domain-indicator {
  width: 8px;
  height: 24px;
  border-radius: 4px;
}

.tracking-wider {
  letter-spacing: 0.05em;
}
</style>
