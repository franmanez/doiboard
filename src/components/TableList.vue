<template>
  <div class="mt-3 container px-0">
    <div class="card border border-secondary-subtle shadow-sm rounded-4 overflow-hidden mb-5">
      <div v-for="(item, index) in content" :key="index" class="modern-row p-4 border-bottom transition-all">
        <div class="row align-items-start">
          <!-- Main Content -->
          <div class="col-12 col-lg-9 mb-3 mb-lg-0">
            <div class="pe-lg-4">
              <!-- Type and DOI -->
              <div class="d-flex align-items-center mb-2 gap-2 flex-wrap">
                <span class="badge rounded-pill border-0 py-1 px-3 fw-bold text-dark bg-warning shadow-sm" v-if="item.type" style="font-size: 0.7rem;">
                  {{(item.type)}}
                </span>
                <a :href="'http://dx.doi.org/' + item.DOI" target="_blank" class="text-primary opacity-75 fw-medium text-decoration-none small d-flex align-items-center">
                  <i class="bi bi-link-45deg me-1"></i> {{ item.DOI }}
                </a>
              </div>

              <!-- Title -->
              <div class="mb-3" v-if="item.title">
                <div class="fw-bold text-dark mb-1 leading-tight" style="font-size: 1rem;">{{ (item.title[0]) }}</div>
                <div class="d-flex align-items-center gap-4 mt-2">
                  <div v-if="item.deposited" class="d-flex align-items-center text-muted small">
                    <i class="bi bi-calendar3 me-2"></i>
                    <span>{{ item.deposited['date-time'].substring(0,10) }}</span>
                  </div>
                  <div class="d-flex align-items-center text-muted small">
                    <i class="bi bi-chat-left-text me-2"></i>
                    <span>{{ item['is-referenced-by-count'] }} <span class="opacity-75">citations</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Authors Section -->
          <div class="col-12 col-lg-3 border-start-lg ps-lg-4" v-if="item.author">
            <div class="authors-list pt-1">
              <div class="d-flex flex-column gap-2">
                <template v-for="(author, aIndex) in item.author.slice(0, 4)" :key="aIndex">
                  <div v-if="author.family" class="d-flex align-items-center small">
                    <i class="bi bi-person text-muted me-2" style="font-size: 0.85rem;"></i>
                    <span class="text-dark opacity-75">{{author.family}}<span v-if="author.given">, {{author.given}}</span></span>
                    <a v-if="author.ORCID" :href="author.ORCID" target="_blank" class="ms-1 d-inline-flex align-items-center shadow-none">
                      <img src="@/assets/logo-orcid-mini.png" height="12" alt="ORCID" class="opacity-75">
                    </a>
                  </div>
                </template>
                <div v-if="item.author.length > 4" class="mt-1">
                   <span class="badge bg-warning-soft text-warning border border-warning border-opacity-10 rounded-pill px-2 py-1" style="font-size: 0.7rem;">
                     <i class="bi bi-plus"></i> {{ item.author.length - 4 }} más
                   </span>
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

    export default {
      name: "TableList",
      components: {

      },
      props: {
        // Funció amb paràmetres currentPage i pageSize que ha de retornar un objecte amb membre data amb membres content (array amb pageSize elements de currentPage) i totalElements (nombre total d'elements en el servidor)
        content: {
            required: true,
            type: Object,
        },
      },
      setup() {

      },

}

</script>


<style scoped>
.modern-row {
  background-color: white;
}

.modern-row:nth-child(even) {
  background-color: #f9f9f9;
}

.modern-row:hover {
  background-color: #fff8eb;
}

.leading-tight {
  line-height: 1.25;
}

.author-tag {
  transition: all 0.2s ease;
}

.author-tag:hover {
  border-color: #ffd145 !important;
  background-color: #fff !important;
}

.bg-warning-soft {
  background-color: #fff8eb;
  color: #856404;
}

.transition-all {
  transition: all 0.2s ease;
}

@media (min-width: 992px) {
  .border-start-lg {
    border-left: 1px solid #dee2e6 !important;
  }
}
</style>

