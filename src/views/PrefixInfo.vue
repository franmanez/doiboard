<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <PrefixHeader :title="$t('Prefix: Member Information')" v-model:prefix="prefix" :search="search"></PrefixHeader>


    <div class="container" v-if="Object.keys(content).length > 0">
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card bg-warning bg-opacity-75 rounded-4 border-0 shadow-sm overflow-hidden">
            <div class="card-body p-4">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <div class="bg-white bg-opacity-25 rounded-3 p-3 me-3 d-flex align-items-center justify-content-center">
                    <i class="bi bi-file-earmark-bar-graph text-dark fs-1"></i>
                  </div>
                  <div>
                    <h5 class="fw-bold text-dark mb-0 text-uppercase tracking-wider">Total</h5>
                    <p class="mb-0 small text-dark opacity-75">{{ $t("Total number of deposited DOIs") }}</p>
                  </div>
                </div>
                <div class="mt-3 mt-md-0">
                  <h2 class="display-4 fw-bold text-dark mb-0">{{content.total.toLocaleString()}}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-0">
        <div v-for="(value, index) in content.all" :key="index" class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
          <div class="card h-100 rounded-4 border border-secondary-subtle shadow-sm modern-info-card overflow-hidden">
            <div class="card-body p-4">
              <h4 class="card-title fw-bold text-uppercase text-secondary mb-3 fs-5">{{ map[index] }}</h4>
              <hr class="mt-0 mb-4 bg-secondary opacity-50" style="height:2px; border:none;" />
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="display-6 fw-bold mb-0 text-dark">{{value.toLocaleString()}}</h2>
                <i class="bi bi-info-circle-fill text-warning opacity-75" style="font-size: 2.3rem;"></i>
              </div>
            </div>

            <hr class="m-0 bg-secondary opacity-50" style="height:2px; border:none;" />

            <div class="card-footer bg-transparent border-0 p-2 py-3">
              <div class="d-flex flex-nowrap justify-content-between gap-1">
                <a class="btn btn-light btn-sm text-uppercase fw-bold rounded-pill px-2 border border-secondary-subtle" @click="getCoverage(index)" role="button" style="font-size: 0.75rem; white-space: nowrap;"><i class="bi bi-wifi"></i> {{ $t("Coverage") }}</a>
                <a class="btn btn-light btn-sm text-uppercase fw-bold rounded-pill px-2 border border-secondary-subtle" @click="getPublicationDate(index)" v-show="index !== 'dissertation' && index !== 'database'" role="button" style="font-size: 0.75rem; white-space: nowrap;"><i class="bi bi-pie-chart-fill"></i> {{ $t("Publication") }}</a>
                <a class="btn btn-light btn-sm text-uppercase fw-bold rounded-pill px-2 border border-secondary-subtle" @click="getDepositedDate(index)" role="button" style="font-size: 0.75rem; white-space: nowrap;"><i class="bi bi-bar-chart"></i> {{ $t("Deposited") }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-5" v-if="showCoverage">
        <div class="col-md-12">
          <div class="card border-0 shadow-lg rounded-5 overflow-hidden">
            <div class="card-header bg-dark p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h4 class="text-white fw-bold mb-1 d-flex align-items-center">
                  <i class="bi bi-radar me-2 text-warning"></i> {{ $t("Coverage") }}
                </h4>
                <p class="text-white opacity-50 small mb-0">{{ $t("Coverage Info") }}</p>
              </div>
              <div v-if="typeSelected !== ''">
                <span class="badge rounded-pill bg-warning text-dark px-4 py-2 fs-6 shadow-sm">{{map[typeSelected]}}</span>
              </div>
            </div>
            <div class="card-body p-4 p-md-5">
              <div class="row g-4">
                <div v-for="item in [
                  {label: 'Abstracts', key: 'abstracts'},
                  {label: 'ORCIDs', key: 'orcids'},
                  {label: 'Licenses', key: 'licenses'},
                  {label: 'References', key: 'references'},
                  {label: 'Affiliations', key: 'affiliations'},
                  {label: 'Funders', key: 'funders'},
                  {label: 'Similarity checking', key: 'similarity-checking'},
                  {label: 'Award numbers', key: 'award-numbers'},
                  {label: 'Ror ids', key: 'ror-ids'},
                  {label: 'Update policies', key: 'update-policies'},
                  {label: 'Resource links', key: 'resource-links'},
                  {label: 'Descriptions', key: 'descriptions'}
                ]" :key="item.key" class="col-xl-3 col-md-4 col-sm-6">
                  <div class="coverage-item p-3 rounded-4 bg-light border border-white h-100 transition-all">
                    <h6 class="text-muted fw-bold text-uppercase small mb-2">{{ item.label }}</h6>
                    <div class="d-flex justify-content-between align-items-end mb-2">
                       <h4 class="fw-bold text-dark mb-0 fs-3">{{ (content.coverage[typeSelected][item.key] * 100).toFixed(0) }}<small class="fs-6 opacity-50">%</small></h4>
                    </div>
                    <div class="progress rounded-pill" style="height: 8px; background-color: rgba(0,0,0,0.05);">
                      <div class="progress-bar rounded-pill bg-warning shadow-sm" :style="{width:(content.coverage[typeSelected][item.key] * 100).toFixed(0) + '%'}"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-5" v-if="showPublished || showDeposited" ref="customDiv">
        <div class="col-md-12">
          <div class="card border-0 shadow-lg rounded-5 overflow-hidden">
            <div class="card-header bg-dark p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h4 class="text-white fw-bold mb-1 d-flex align-items-center">
                  <i v-if="showPublished" class="bi bi-pie-chart-fill me-2 text-warning"></i>
                  <i v-if="showDeposited" class="bi bi-bar-chart me-2 text-warning"></i>
                  <span v-if="showPublished">{{ $t("Chart published date") }}</span>
                  <span v-if="showDeposited">{{ $t("Chart first deposited date") }}</span>
                </h4>
                <p class="text-white opacity-50 small mb-0">
                  <span v-if="showPublished">{{ $t("Chart published date Info") }}</span>
                  <span v-if="showDeposited">{{ $t("Chart first deposited date Info") }}</span>
                </p>
              </div>
              <div v-if="typeSelected !== ''">
                <span class="badge rounded-pill bg-warning text-dark px-4 py-2 fs-6 shadow-sm">{{map[typeSelected]}}</span>
              </div>
            </div>
            <div class="card-body p-4 p-md-5">
              <vue-highcharts
                  type="chart"
                  :options="chartOptions"
                  :redrawOnUpdate="true"
                  :oneToOneUpdate="false"
                  :animateOnUpdate="true"
                  @rendered="onRender"/>
            </div>
          </div>
        </div>
      </div>



    </div>


    <div class="container col-12 alert alert-danger mt-4 rounded-0" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

import CrossrefService from '@/service/CrossrefService';
import {computed, onMounted, ref, watch} from "vue";
import {useI18n} from 'vue-i18n';
import VueHighcharts from 'vue3-highcharts';
import {useStore} from "vuex";
import LoadingComponent from "@/components/Loading.vue";
import PrefixHeader from "@/views/PrefixHeader.vue";
import {ElMessageBox} from "element-plus";
import {useRoute} from "vue-router";

export default {
  name: "PrefixInfo",
  components: {
    PrefixHeader,
    LoadingComponent,
    VueHighcharts,
  },
  setup() {
    const route = useRoute();
    const { t } = useI18n();
    const store = useStore();
    const content = ref({});
    const prefix = ref(store.getters.prefix);
    const typeSelected = ref("");
    const showCoverage = ref(false);
    const showPublished = ref(false);
    const showDeposited = ref(false);

    const chartSeriesName = ref("");
    const chartSeriesData = ref([]);
    const chartCategoriesData = ref([]);
    const chartTitle = ref("");
    const chartColors = ref([]);

    const isLoading = ref(false);
    const sectionDetails = ref(null);

    const chartRef = ref(null);
    const chartOptions = computed(() => ({
      chart: {
        type: "column",
      },
      title: {
        text: chartTitle.value,
      },
      xAxis: {
        categories: chartCategoriesData.value,
      },
      yAxis: {
        title: {
          text: "Number of items",
        },
      },
      colors: chartColors.value,
      series: [
        {
          name: chartSeriesName.value,
          data: chartSeriesData.value,
        },
      ],
    }));

    const cont = ref(0);
    const error = ref(null);

    const map = {
      "edited-book": "Edited Book",
      "journal-article": "Journal Article",
      dissertation: "Dissertation",
      dataset: "Dataset",
      database: "Database",
      "proceedings-article": "Conference Paper",
      "book-section": "Book section",
      monograph: "Monograph",
      "report-component": "Report component",
      report: "Report",
      "peer-review": "Peer review",
      "book-track": "Book track",
      "book-part": "Book part",
      other: "Other",
      book: "Book",
      "journal-volume": "Journal volume",
      "book-set": "Book set",
      "reference-entry": "Reference entry",
      journal: "Journal",
      component: "Component",
      "book-chapter": "Book-chapter",
      "proceedings-series": "Proceedings-series",
      "report-series": "Report-series",
      proceedings: "Proceedings",
      standard: "Standard",
      "reference-book": "Reference book",
      "posted-content": "Posted content",
      "journal-issue": "Journal-issue",
      grant: "Grant",
      "book-series": "Book series",
    };

    onMounted(async () => {
      if (store.getters.prefix) await search();
    });

    const clear = () => {
      content.value = "";
      store.commit("setPrefix", "");
    };

    const showStatus = (coverage, published, deposited) => {
      showCoverage.value = coverage;
      showPublished.value = published;
      showDeposited.value = deposited;
    };

    const search = async () => {
      error.value = null;
      isLoading.value = true;
      prefix.value = prefix.value.trim();
      try {
        content.value = await CrossrefService.memberInfo(prefix.value);
        store.commit("setPrefix", prefix.value);
      } catch (e) {
        clear();
        error.value = "ERROR: Prefix does not exists";
      }
      isLoading.value = false;
    };

    const scrollToBottom = () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    };

    const getCoverage = async (type) => {
      showStatus(true, false, false);
      typeSelected.value = type;
      scrollToBottom();
    };

    const getPublicationDate = async (type) => {
      isLoading.value = true;
      showStatus(false, true, false);
      typeSelected.value = type;

      let result = await CrossrefService.getPublishedDate(prefix.value, type);

      const resultKeys = Object.keys(result);
      const resultValues = Object.values(result);

      chartTitle.value = map[typeSelected.value] + t("published by years");
      chartCategoriesData.value = resultKeys;
      chartSeriesName.value = type;
      chartSeriesData.value = resultValues;
      chartColors.value = ["#ffc72c"];
      isLoading.value = false;
      scrollToBottom();
    };

    const getDepositedDate = async (type) => {
      ElMessageBox.confirm(
        t("slow query message"),
        t("slow query title"),
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          isLoading.value = true;
          showStatus(false, false, true);
          typeSelected.value = type;

          let result = await CrossrefService.getDepositByType(
            prefix.value,
            type
          );

          const resultKeys = Object.keys(result);
          const resultValues = Object.values(result);

          chartTitle.value =
            map[typeSelected.value] + t("first deposited by years");
          chartCategoriesData.value = resultKeys;
          chartSeriesName.value = type;
          chartSeriesData.value = resultValues;
          chartColors.value = ["#017698FF"];
          isLoading.value = false;
          scrollToBottom();
        })
        .catch(() => {
          //Do nothing
        });
    };

    onMounted(() => {
      if (route.query.id) {
        prefix.value = route.query.id.trim();
        search();
      }
    });

    watch(
      () => route.query.id,
      (newId) => {
        if (newId) {
          prefix.value = newId.trim();
          search();
        }
      }
    );

    return {
      content,
      cont,
      prefix,
      typeSelected,
      map,
      chartRef,
      showCoverage,
      showPublished,
      showDeposited,
      error,
      chartOptions,
      sectionDetails,
      isLoading,
      search,
      getCoverage,
      getPublicationDate,
      getDepositedDate,
    };
  },
};

</script>

<style scoped>
.modern-info-card {
  transition: box-shadow 0.2s ease;
}

.modern-info-card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important;
  border-color: #ffd145 !important;
}

.bg-warning-soft {
  background-color: #fff8eb;
}

.coverage-item {
  transition: all 0.3s ease;
}

.coverage-item:hover {
  background-color: #fff !important;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transform: scale(1.02);
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.transition-all {
  transition: all 0.3s ease;
}

/* Redefine progress bar for smoother look */
.progress {
  background-color: #eee;
}

.progress-bar {
  transition: width 1s ease-in-out;
}
</style>
