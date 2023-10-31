<template>
  <div class="list-group list-group-flush mt-3">
    <div v-for="(item, index) in content" :key="index" class="list-group-item list-group-item-action flex-column align-items-start">

      <div class="mt-2 mb-2 row">
        <div class="col-md-9">

          <div>
            <div class="mb-1 text-secondary" v-if="item.title">
              <span class="h6 text-dark">Title: </span>{{ (item.title[0]) }}
            </div>

            <div class="mb-1">
              <span class="h6 text-dark">DOI: </span> <a :href="item.DOI" target="_blank">{{ item.DOI }} <i class="bi bi-box-arrow-up-right"></i></a>
            </div>

            <div class="text-secondary mb-1" v-if="item.deposited">
              <span class="h6 text-dark">Deposited date: </span> {{ item.deposited['date-time'].substring(0,10)  }}
            </div>

            <div class="mt-1 text-dark badge bg-warning" v-if="item.type">
              {{(item.type)}}
            </div>

            <div v-if="item[8]">
              <span v-for="sub in item[8].split(';')" :key="sub"  class="badge rounded-pill bg-gray text-light mr-1">{{ sub }}</span>
            </div>

          </div>

        </div>

        <div class="col-md-3">
          <!--span class="h6 text-dark" v-if="item.author">Author</span-->
          <div class="text-secondary mb-1 me-5"  v-for="(author, index) in item.author" :key="index">
            <div v-if="author.family" class="mx-2">

              <i class="bi bi-person-fill text-secondary me-1"></i>
              <span class="small">
                {{author.family}}, {{author.given}}
                <a v-if="author.ORCID" :href="author.ORCID"><img src="@/assets/logo-orcid-mini.png" height="18" alt="ORCID"></a>
              </span>
            </div>
          </div>
        </div>

        <!--div class="col-md-1 col-xs-12 d-none d-lg-block" >
          <div class="mt-1 text-dark badge bg-warning" v-if="item.type">
            {{(item.type)}}
          </div>
        </div-->

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

.list-group .list-group-item:nth-child(odd) {
  background-color: #f5f5f5;
}

.list-group .list-group-item:nth-child(even) {
  background-color: #ffffff;
}

</style>

