<template>
  <div>

    <div>
      <TablePagination v-model:pageSize="pageSize"
                       v-model:currentPage="currentPage"
                       v-model:totalItems="totalItems"
                       endpoint="https://api.crossref.org/prefixes/10.5821/works?select=DOI,title,type&sort=created"
                       :columns="['DOI', 'title', 'type']">
      </TablePagination>


    </div>

  </div>
</template>

<script>

  import {ref} from "vue";
  import TablePagination from "@/components/TablePagination.vue";
  export default {
    name: "SamplePage",
    components: {TablePagination},

    setup(){

      const currentPage = ref(1);
      const pageSize = ref(5); //
      const totalItems = ref(0);

      return{
        currentPage,
        pageSize,
        totalItems,
      }
    }
  }

</script>

<style scoped>


</style>
