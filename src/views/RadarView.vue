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
                        <strong>{{ $t("innovation_radar.legend_size") }}:</strong> {{ $t("innovation_radar.legend_volume") }}
                    </li>
                    <li class="mb-2">
                        <strong>{{ $t("Colors") }}:</strong> {{ $t("Moment Vital Explanation") }}
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
    <div v-if="loading" class="text-center my-5 py-5 loading-state">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ $t("Search") }}...</span>
      </div>
      <p class="mt-3 text-secondary lead">{{ $t("Loading Radar") }}</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-warning rounded-4 shadow-sm p-4 error-state">
      <h4 class="alert-heading"><i class="bi bi-exclamation-triangle me-2"></i>{{ $t("Warning") }}</h4>
      <p>{{ error }}</p>
      <hr>
      <button class="btn btn-primary rounded-pill px-4" @click="fetchRadarData">{{ $t("Retry") }}</button>
    </div>

    <!-- Chart Section -->
    <div v-if="!loading && !error" class="chart-container">
      <!-- Title and Date Range Section -->
      <div class="row align-items-center justify-content-between mb-4 px-2">
        <div class="col-md-auto d-flex align-items-center gap-3">
            <i class="bi bi-calendar-event fs-3 text-secondary"></i>
            <h2 class="h3 fw-bold mb-0 text-dark">
                <i18n-t keypath="Analysis Period" tag="span">
                  <template #start>
                    <span class="text-warning">{{ startDate }}</span>
                  </template>
                  <template #end>
                    <span class="text-warning">{{ endDate }}</span>
                  </template>
                </i18n-t>
            </h2>
        </div>
      </div>

      <div class="card shadow-lg border-0 rounded-4 overflow-hidden mb-5">
        <div class="card-body p-0">
          <div ref="chartRef" class="radar-chart-element" :style="{ height: chartHeight + 'px' }"></div>
          
          <!-- Static Legend -->
          <div class="d-flex flex-wrap justify-content-center gap-4 py-4 border-top bg-light bg-opacity-50">
            <div class="d-flex align-items-center gap-2 small text-muted">
              <span class="dot size-indicator"></span>
              <span><b>{{ $t('innovation_radar.legend_size') }}:</b> {{ $t('innovation_radar.legend_volume') }}</span>
            </div>
            
            <div class="interactive-legend-item">
              <span class="dot color-rising"></span>
              <span>{{ $t('innovation_radar.legend_rising') }}</span>
            </div>

            <div class="interactive-legend-item">
              <span class="dot color-new"></span>
              <span>{{ $t('innovation_radar.legend_new') }}</span>
            </div>

            <div class="interactive-legend-item">
              <span class="dot color-stable"></span>
              <span>{{ $t('innovation_radar.legend_stable') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail list in three columns -->
      <div class="col-12 mt-4">
        <div class="row g-4">
          <!-- CONSOLIDATED COLUMN -->
          <div class="col-lg-4">
            <div class="trend-column-container">
              <div class="trend-column-header border-stable">
                {{ $t("Consolidated").toUpperCase() }}
              </div>
              <div class="trend-items-list">
                <div v-for="item in groupedByTrend.stable" :key="item.tag" class="trend-item-card border-left-stable">
                  <span class="tag-name">{{ item.tag }}</span>
                  <span class="tag-count-badge">{{ item.count }}</span>
                </div>
                <div v-if="groupedByTrend.stable.length === 0" class="empty-state-text">
                  {{ $t("No items found") }}
                </div>
              </div>
            </div>
          </div>

          <!-- RISING COLUMN -->
          <div class="col-lg-4">
            <div class="trend-column-container">
              <div class="trend-column-header border-rising">
                {{ $t("Rising").toUpperCase() }}
              </div>
              <div class="trend-items-list">
                <div v-for="item in groupedByTrend.rising" :key="item.tag" class="trend-item-card border-left-rising">
                  <span class="tag-name">{{ item.tag }}</span>
                  <span class="tag-count-badge">{{ item.count }}</span>
                </div>
                <div v-if="groupedByTrend.rising.length === 0" class="empty-state-text">
                  {{ $t("No items found") }}
                </div>
              </div>
            </div>
          </div>

          <!-- NEW COLUMN -->
          <div class="col-lg-4">
            <div class="trend-column-container">
              <div class="trend-column-header border-new">
                {{ $t("New / Disruptive").toUpperCase() }}
              </div>
              <div class="trend-items-list">
                <div v-for="item in groupedByTrend.new" :key="item.tag" class="trend-item-card border-left-new">
                  <span class="tag-name">{{ item.tag }}</span>
                  <span class="tag-count-badge">{{ item.count }}</span>
                </div>
                <div v-if="groupedByTrend.new.length === 0" class="empty-state-text">
                  {{ $t("No items found") }}
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
import { defineComponent, ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import AIService from '@/service/AIService';
import Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';

more(Highcharts);

export default defineComponent({
  name: 'RadarView',
  setup() {
    const { t } = useI18n();
    const radarData = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const chartRef = ref(null);
    const chartInstance = ref(null);
    const chartHeight = ref(800);
    const startDate = ref('');
    const endDate = ref('');

    const fetchRadarData = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await AIService.getRadar();
        const data = response.data.data || [];
        radarData.value = data;
        
        if (response.data.meta) {
            startDate.value = response.data.meta.startDate;
            endDate.value = response.data.meta.endDate;
        }

        // Dynamic height
        chartHeight.value = Math.max(800, 400 + (data.length * 20));
      } catch (err) {
        console.error("Error fetching radar data:", err);
        error.value = t("Warning") + ": " + (err.message || "Error");
      } finally {
        loading.value = false;
        await nextTick();
        renderChart();
      }
    };

    const getTrendColor = (trend) => {
      switch (trend) {
        case 'rising': return '#FF4757';
        case 'new': return '#2ED573';
        case 'stable': return '#1E90FF';
        default: return '#999999';
      }
    };

    const groupedByTrend = computed(() => {
      const groups = {
        stable: [],
        rising: [],
        new: []
      };
      radarData.value.forEach(item => {
        if (groups[item.trend]) {
          groups[item.trend].push(item);
        }
      });
      // Sort each group by count descending
      groups.stable.sort((a, b) => b.count - a.count);
      groups.rising.sort((a, b) => b.count - a.count);
      groups.new.sort((a, b) => b.count - a.count);
      return groups;
    });

    const renderChart = () => {
      if (!chartRef.value || radarData.value.length === 0) return;

      const filteredData = radarData.value
        .map(item => ({
          name: item.tag,
          value: item.count,
          trendDisplay: item.trend === 'rising' ? t('innovation_radar.legend_rising') : (item.trend === 'new' ? t('innovation_radar.legend_new') : t('innovation_radar.legend_stable')),
          color: getTrendColor(item.trend)
        }));

      const options = {
        chart: {
          type: 'packedbubble',
          height: chartHeight.value + 'px',
          backgroundColor: 'transparent',
          spacing: [20, 10, 20, 10],
          animation: false
        },
        title: { text: '' },
        tooltip: {
          useHTML: true,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#ddd',
          pointFormat: `
            <div style="padding: 12px; min-width: 180px">
              <span style="color:{point.color}; font-size: 16px; font-weight: bold">{point.name}</span><br/>
              <div style="margin-top: 8px; font-size: 13px; color: #444">
                <b>${t('innovation_radar.tooltip_presence')}:</b> {point.value} ${t('innovation_radar.legend_volume').toLowerCase()}<br/>
                <b>${t('innovation_radar.tooltip_trend')}:</b> <span style="text-transform: capitalize">{point.trendDisplay}</span>
              </div>
            </div>
          `
        },
        plotOptions: {
          packedbubble: {
            minSize: '40%',
            maxSize: '150%',
            layoutAlgorithm: {
              gravitationalConstant: 0.01,
              splitSeries: false,
              seriesInteraction: true,
              dragBetweenSeries: true,
              parentNodeLimit: true,
              bubblePadding: 15,
              enableSimulation: true,
              initialAnimation: false
            },
            animation: false,
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              allowOverlap: false,
              crop: false,
              style: {
                color: '#ffffff',
                textOutline: '2px rgba(0,0,0,0.6)',
                fontWeight: '600',
                fontSize: '12px'
              }
            }
          }
        },
        legend: { enabled: false },
        series: [{
          name: t('innovation_radar.series_name'),
          data: filteredData
        }],
        exporting: { enabled: false },
        credits: { enabled: false }
      };

      if (!chartInstance.value) {
        chartInstance.value = Highcharts.chart(chartRef.value, options);
      } else {
        chartInstance.value.update(options, true, true);
      }
    };

    onMounted(fetchRadarData);

    onUnmounted(() => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
        chartInstance.value = null;
      }
    });

    return {
      loading,
      error,
      chartRef,
      chartHeight,
      radarData,
      groupedByTrend,
      startDate,
      endDate,
      getTrendColor,
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

.radar-chart-element {
  width: 100%;
  border-radius: 16px;
  min-height: 800px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot.size-indicator { border: 1px solid #999; }
.dot.color-rising { background: #FF4757; }
.dot.color-new { background: #2ED573; }
.dot.color-stable { background: #1E90FF; }

.interactive-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #444;
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

.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.loading-state .spinner-border {
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: 25px;
  color: #6366f1 !important;
}

.chart-container {
  display: flex;
  flex-direction: column;
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.trend-column-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.trend-column-header {
  font-weight: 800;
  font-size: 0.9rem;
  padding: 0.75rem 0.5rem;
  letter-spacing: 0.05em;
  background-color: #f8fafc;
  border-radius: 4px;
}

.border-stable { border-top: 4px solid #1E90FF; color: #1E90FF; }
.border-rising { border-top: 4px solid #FF4757; color: #FF4757; }
.border-new { border-top: 4px solid #2ED573; color: #2ED573; }

.trend-items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.trend-item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.trend-item-card:hover {
  background-color: #f8fafc;
}

.border-left-stable { border-left: 5px solid #1E90FF; }
.border-left-rising { border-left: 5px solid #FF4757; }
.border-left-new { border-left: 5px solid #2ED573; }

.tag-name {
  font-weight: 600;
  color: #334155;
  font-size: 0.95rem;
  line-height: 1.2;
}

.tag-count-badge {
  background: #f1f5f9;
  color: #64748b;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  min-width: 2.5rem;
  text-align: center;
  margin-left: 1rem;
}

.empty-state-text {
  padding: 2.5rem;
  text-align: center;
  color: #94a3b8;
  font-style: italic;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px dashed #cbd5e1;
}
</style>
