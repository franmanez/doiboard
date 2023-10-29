<template>
  <div>

    <div>
      <TablePagination v-model:pageSize="pageSize"
                       v-model:currentPage="currentPage"
                       v-model:totalItems="totalItems"
                       endpoint="https://api.crossref.org/prefixes/10.5821/works?select=DOI,title,type&sort=created"
                       :columns="['DOI', 'title', 'type']">
      </TablePagination>

      <div class="bg-danger">{{items}}</div>

      <hr>

      <div class="container">


        <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <th scope="row">{{index}}</th>
            <td><input class="form-control" v-model="item.DOI" placeholder="Escribe un nuevo elemento" /></td>
            <td><input type="checkbox" class="form-check" v-model="item.checked" /></td>
            <td><button type="submit" class="btn btn-primary" @click="addNewItem(item)">Submit</button></td>
          </tr>

          </tbody>
        </table>
      </div>


      <hr>

      <div v-for="(item, index) in items" :key="index">
        <form @submit.prevent="addNewItem(item)">
          <input v-model="item.DOI" placeholder="Escribe un nuevo elemento" />
          <input type="checkbox" v-model="item.checked" />
        </form>
      </div>
      <button @click="showSelectedItems">Mostrar Seleccionados</button>

      <div class="bg-success">{{ selectedItems }}</div>
    </div>

  </div>
</template>

<script>

  import {ref} from "vue";
  import TablePagination from "@/components/TablePagination.vue";
  import http from "@/http-common";
  export default {
    name: "SamplePage",
    components: {TablePagination},

    setup(){

      const currentPage = ref(1);
      const pageSize = ref(5); //
      const totalItems = ref(0);
      const items = ref([])
      const selectedItems = ref([]);

      const loadTableData = async () => {
          const response = await http.get(`https://api.crossref.org/prefixes/10.5821/works?select=DOI,title,type&sort=created&rows=5&mailto=info.idp@upc.edu`)
          //items.value = response.data.message.items

          items.value = response.data.message.items.map((item) => ({
            DOI: item.DOI,
            checked: false, // Establecer el valor por defecto en false
          }));
      };
      const addNewItem = (item) => {
        alert(`envia información de ${item.DOI} con el check igual a ${item.checked}`)
      };

      const showSelectedItems = () => {
        selectedItems.value = items.value.filter((item) => item.checked);
      };

      loadTableData()

      return{
        currentPage,
        pageSize,
        totalItems,
        items,
        selectedItems,
        addNewItem,
        showSelectedItems
      }
    }
  }

</script>

<style scoped>


</style>
