<template>
  <div class="container mt-5 pt-5 pb-5">
    
    <!-- Modern Header Section -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="crossref-header-card p-4 p-md-5 rounded-5 shadow-lg position-relative overflow-hidden text-white">
          <div class="crossref-header-glow"></div>
          <div class="position-relative z-1 d-md-flex align-items-center justify-content-between">
            <div>
              <div class="d-inline-flex align-items-center badge bg-warning bg-opacity-25 border border-warning border-opacity-50 text-white rounded-pill px-3 py-2 mb-3">
                <i class="bi bi-graph-up-arrow me-2 text-warning"></i>
                {{ $t("Crossref Global Analytics") }}
              </div>
              <h1 class="display-5 fw-bold mb-2">
                <i18n-t keypath="Most Cited Works Title" tag="span">
                  <template #highlighted>
                    <span class="text-warning">{{ $t("Most Cited Works Title Highlight") }}</span>
                  </template>
                </i18n-t>
              </h1>
              <p class="lead opacity-75 mb-0" style="max-width: 600px;">
                {{ $t("Explore the most influential scientific publications in the Crossref network.") }}
              </p>
            </div>
            <!-- Info Card (Right Side) -->
            <div class="mt-4 mt-md-0 ms-md-5 p-4 rounded-4 bg-black bg-opacity-25 border border-white border-opacity-10 backdrop-blur-sm shadow-sm" style="max-width: 500px;">
                <h6 class="fw-bold mb-3 text-warning d-flex align-items-center" style="font-size: 1.25rem;">
                  <i class="bi bi-info-circle me-2"></i>{{ $t("Data Source") }}
                </h6>
                <p class="mb-2 lh-sm font-16">
                    {{ $t("This data is retrieved in real-time from the Crossref REST API using the 'is-referenced-by-count' metric.") }}
                </p>
                <div class="border-top border-white border-opacity-10 pt-2 mt-2">
                    <p class="mb-0 text-white text-opacity-50 fst-italic" style="font-size: 1rem; line-height: 1.4;">
                        <i class="bi bi-link-45deg me-1"></i> api.crossref.org
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Controls -->
    <div v-if="!loading && !error" class="row mb-4">
      <div class="col-12">
        <div class="card bg-dark bg-opacity-10 border border-dark border-opacity-10 rounded-4 shadow-none">
          <div class="card-body p-4">
            <div class="row align-items-center g-3">
              <!-- Filter Mode Buttons -->
              <div class="col-md-auto">
                <label class="form-label fw-bold mb-2 d-block">{{ $t("Time Period") }}:</label>
                <div class="btn-group" role="group">
                  <button 
                    type="button" 
                    class="btn btn-outline-dark"
                    :class="{ 'active': filterMode === 'all' }"
                    @click="setFilterMode('all')"
                  >
                    <i class="bi bi-infinity me-1"></i> {{ $t("All Time") }}
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-dark"
                    :class="{ 'active': filterMode === 'year' }"
                    @click="setFilterMode('year')"
                  >
                    <i class="bi bi-calendar me-1"></i> {{ $t("By Year") }}
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-dark"
                    :class="{ 'active': filterMode === 'month' }"
                    @click="setFilterMode('month')"
                  >
                    <i class="bi bi-calendar-month me-1"></i> {{ $t("By Month") }}
                  </button>
                </div>
              </div>

              <!-- Year Selector -->
              <div class="col-md-auto" v-if="filterMode === 'year'">
                <label class="form-label fw-bold mb-2 d-block">{{ $t("Select Year") }}:</label>
                <select class="form-select" v-model="selectedYear" @change="fetchData">
                  <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>

              <!-- Month Selector -->
              <div class="col-md-auto" v-if="filterMode === 'month'">
                <label class="form-label fw-bold mb-2 d-block">{{ $t("Select Year") }}:</label>
                <select class="form-select" v-model="selectedYear" @change="fetchData">
                  <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>
              <div class="col-md-auto" v-if="filterMode === 'month'">
                <label class="form-label fw-bold mb-2 d-block">{{ $t("Select Month") }}:</label>
                <select class="form-select" v-model="selectedMonth" @change="fetchData">
                  <option value="1">{{ $t("January") }}</option>
                  <option value="2">{{ $t("February") }}</option>
                  <option value="3">{{ $t("March") }}</option>
                  <option value="4">{{ $t("April") }}</option>
                  <option value="5">{{ $t("May") }}</option>
                  <option value="6">{{ $t("June") }}</option>
                  <option value="7">{{ $t("July") }}</option>
                  <option value="8">{{ $t("August") }}</option>
                  <option value="9">{{ $t("September") }}</option>
                  <option value="10">{{ $t("October") }}</option>
                  <option value="11">{{ $t("November") }}</option>
                  <option value="12">{{ $t("December") }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center my-5 py-5">
      <div class="spinner-border text-primary" role="status" style="width: 3.5rem; height: 3.5rem;">
        <span class="visually-hidden">{{ $t("Loading") }}...</span>
      </div>
      <p class="mt-3 text-secondary lead">{{ $t("Loading Crossref Analytics...") }}</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger rounded-4 shadow-sm p-4 animate__animated animate__shakeX">
      <h4 class="alert-heading"><i class="bi bi-exclamation-triangle me-2"></i>{{ $t("Error") }}</h4>
      <p>{{ error }}</p>
      <hr>
      <button class="btn btn-danger rounded-pill px-4" @click="fetchData">{{ $t("Retry") }}</button>
    </div>

    <div v-else class="animate__animated animate__fadeIn">
      <!-- Chart Section - Top: Citations Overview -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div class="card-header bg-dark text-white p-3 border-0">
               <h5 class="mb-0"><i class="bi bi-bar-chart-line me-2"></i>{{ $t("Citations Overview") }}</h5>
            </div>
            <div class="card-body p-4">
              <highcharts :options="chartOptions" style="height: 400px;"></highcharts>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart Section - Bottom: Two charts side by side -->
      <div class="row mb-5">
        <!-- Document Type Distribution -->
        <div class="col-md-6 mb-4 mb-md-0">
          <div class="card shadow-lg border-0 rounded-4 overflow-hidden h-100">
            <div class="card-header bg-dark text-white p-3 border-0">
               <h5 class="mb-0"><i class="bi bi-pie-chart me-2"></i>{{ $t("Document Type Distribution") }}</h5>
            </div>
            <div class="card-body p-4">
              <highcharts :options="pieChartOptions" style="height: 350px;"></highcharts>
            </div>
          </div>
        </div>

        <!-- Top Publishers -->
        <div class="col-md-6">
          <div class="card shadow-lg border-0 rounded-4 overflow-hidden h-100">
            <div class="card-header bg-dark text-white p-3 border-0">
               <h5 class="mb-0"><i class="bi bi-building me-2"></i>{{ $t("Top Publishers") }}</h5>
            </div>
            <div class="card-body p-4">
              <highcharts :options="publishersChartOptions" style="height: 350px;"></highcharts>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="row">
        <div class="col-12">
          <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div class="card-header bg-dark text-white p-3 border-0 d-flex justify-content-between align-items-center">
               <h5 class="mb-0"><i class="bi bi-table me-2"></i>{{ $t("Detailed List") }}</h5>
               <span class="badge bg-warning text-dark">{{ works.length }} {{ $t("items") }}</span>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="ps-4" style="width: 40%;">{{ $t("Title / DOI") }}</th>
                      <th>{{ $t("Publisher") }}</th>
                      <th>{{ $t("Relevant Dates") }}</th>
                      <th class="text-end pe-4">{{ $t("Citations") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="work in works" :key="work.DOI">
                      <td class="ps-4 py-4">
                        <div class="fw-bold text-dark mb-1 font-16">{{ work.title ? work.title[0] : $t("No Title") }}</div>
                        <a :href="'https://doi.org/' + work.DOI" target="_blank" class="text-primary text-decoration-none">
                          <i class="bi bi-link-45deg"></i> {{ work.DOI }}
                        </a>
                      </td>
                      <td>
                        <div class="small text-muted">
                          <i class="bi bi-building me-1"></i>{{ work.publisher || '-' }}
                        </div>
                      </td>
                      <td>
                        <div class="small">
                          <div v-if="work.issued"><i class="bi bi-calendar-check me-1 text-secondary"></i> <strong>{{ $t("Issued") }}:</strong> {{ formatDate(work.issued) }}</div>
                          <div v-if="work.published"><i class="bi bi-printer me-1 text-secondary"></i> <strong>{{ $t("Published") }}:</strong> {{ formatDate(work.published) }}</div>
                        </div>
                      </td>
                      <td class="text-end pe-4">
                        <span class="fs-5 fw-bold text-dark">{{ work['is-referenced-by-count'].toLocaleString() }}</span>
                        <div class="small text-muted">{{ $t("citations") }}</div>
                      </td>
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
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { Chart } from 'highcharts-vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'CrossrefAnalyticsView',
  components: {
    highcharts: Chart
  },
  setup() {
    const { t } = useI18n();
    const works = ref([]);
    const loading = ref(true);
    const error = ref(null);
    
    // Filter state
    const filterMode = ref('all'); // 'all', 'year', 'month'
    const selectedYear = ref(new Date().getFullYear());
    const selectedMonth = ref(new Date().getMonth() + 1);
    
    // Generate available years (last 30 years)
    const availableYears = computed(() => {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = 0; i < 30; i++) {
        years.push(currentYear - i);
      }
      return years;
    });

    const setFilterMode = (mode) => {
      filterMode.value = mode;
      fetchData();
    };

    const fetchData = async () => {
      loading.value = true;
      error.value = null;
      try {
        const params = {
          sort: 'is-referenced-by-count',
          order: 'desc',
          rows: 30
        };

        // Add date filters based on mode
        if (filterMode.value === 'year') {
          params.filter = `from-pub-date:${selectedYear.value},until-pub-date:${selectedYear.value}`;
        } else if (filterMode.value === 'month') {
          const year = selectedYear.value;
          const month = String(selectedMonth.value).padStart(2, '0');
          params.filter = `from-pub-date:${year}-${month},until-pub-date:${year}-${month}`;
        }

        const response = await axios.get('https://api.crossref.org/works', { params });
        works.value = response.data.message.items;
      } catch (err) {
        console.error("Error fetching Crossref data:", err);
        error.value = t("Error loading Crossref Analytics data.");
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateParts) => {
      if (!dateParts || !dateParts['date-parts'] || !dateParts['date-parts'][0]) return '-';
      return dateParts['date-parts'][0].join('-');
    };

    const chartOptions = computed(() => {
      return {
        chart: {
          type: 'column',
          backgroundColor: 'transparent'
        },
        title: { text: '' },
        xAxis: {
          categories: works.value.map(w => w.title ? w.title[0] : w.DOI),
          labels: {
            enabled: false // Hide labels in X axis for cleanliness
          },
          title: { text: t("DOIs (Top 30)") }
        },
        yAxis: {
          min: 0,
          title: {
            text: t("Citations Count")
          }
        },
        tooltip: {
          useHTML: true,
          formatter: function() {
            const work = works.value[this.point.index];
            const title = work.title ? work.title[0] : t("No Title");
            return `<div style="max-width: 300px;">
              <strong>${title}</strong><br/>
              <span style="color:${this.color}">●</span> ${t("Citations")}: <b>${this.y.toLocaleString()}</b>
            </div>`;
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
            color: '#ffc107' // Bootstrap warning color
          }
        },
        series: [{
          name: t("Citations"),
          data: works.value.map(w => w['is-referenced-by-count'])
        }],
        credits: { enabled: false }
      };
    });

    const pieChartOptions = computed(() => {
      // Count document types
      const typeCounts = {};
      works.value.forEach(work => {
        const type = work.type || 'unknown';
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });

      // Convert to array and format labels
      const data = Object.entries(typeCounts).map(([type, count]) => ({
        name: type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        y: count
      }));

      return {
        chart: {
          type: 'pie',
          backgroundColor: 'transparent'
        },
        title: { text: '' },
        tooltip: {
          pointFormat: '<b>{point.y}</b> ({point.percentage:.1f}%)'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y}'
            },
            showInLegend: true
          }
        },
        series: [{
          name: t("Documents"),
          colorByPoint: true,
          data: data
        }],
        credits: { enabled: false }
      };
    });

    const publishersChartOptions = computed(() => {
      // Count works by publisher
      const publisherCounts = {};
      works.value.forEach(work => {
        const publisher = work.publisher || 'Unknown';
        publisherCounts[publisher] = (publisherCounts[publisher] || 0) + 1;
      });

      // Sort by count and get top 7
      const sortedPublishers = Object.entries(publisherCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 7);

      const categories = sortedPublishers.map(([name]) => name);
      const data = sortedPublishers.map(([, count]) => count);

      return {
        chart: {
          type: 'bar',
          backgroundColor: 'transparent'
        },
        title: { text: '' },
        xAxis: {
          categories: categories,
          title: { text: null }
        },
        yAxis: {
          min: 0,
          title: { text: t("Number of Works") },
          allowDecimals: false
        },
        tooltip: {
          pointFormat: '<b>{point.y}</b> ' + t("works")
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        series: [{
          name: t("Works"),
          data: data,
          color: '#17a2b8'
        }],
        credits: { enabled: false },
        legend: { enabled: false }
      };
    });

    onMounted(fetchData);

    return {
      works,
      loading,
      error,
      chartOptions,
      pieChartOptions,
      publishersChartOptions,
      fetchData,
      formatDate,
      filterMode,
      selectedYear,
      selectedMonth,
      availableYears,
      setFilterMode
    };
  }
});
</script>

<style scoped>
.crossref-header-card {
  background: linear-gradient(135deg, #212529 0%, #343a40 100%);
  min-height: 250px;
}

.crossref-header-glow {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 193, 7, 0.1) 0%, transparent 70%);
  z-index: 0;
}

.font-16 {
  font-size: 16px !important;
  font-family: 'Roboto', sans-serif !important;
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.animate__fadeIn {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.table-hover tbody tr:hover {
  background-color: rgba(255, 193, 7, 0.05);
}
</style>
