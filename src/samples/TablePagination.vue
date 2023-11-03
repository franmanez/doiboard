<template>

  <div class="container">
    <el-table
        :data="pagedData"
        :default-sort="{ prop: 'name', order: 'ascending' }"
        stripe border
    >

      <el-table-column v-for="column in columns" :key="column" :prop="column" :label="column"></el-table-column>
      <!-- el campo 'prop' es el nombre del elemento JSON del array-->
      <!--el-table-column prop="DOI" label="DOI" sortable></el-table-column>
      <el-table-column prop="title" label="DOI" sortable></el-table-column>
      <el-table-column prop="type" label="DOI" sortable></el-table-column-->

    </el-table>

    <el-pagination
        background
        class="m-3"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems">
    </el-pagination>
  </div>

</template>

<script>

  import http from '@/http-common'
  import {nextTick, ref} from "vue";
  export default {
    name: "TablePagination",

    props: {
      pageSize: Number,
      currentPage: Number,
      totalItems: Number,
      endpoint: String,
      columns: []
    },

    setup(props, ctx){

      const error = ref(null);

      const pagedData = ref([]); // los datos de la tabla

      // funcion que actualiza el tamano de pagina. Fijate que llamo a loadTableData desde la pagina actual y con el valor de size modificado
      const handleSizeChange = (size) => {
        //pageSize.value = size;
        ctx.emit('update:pageSize', size);
        nextTick(() => {
          loadTableData();
        });

      };


      //funcion que cambia el numero de pagina. Aqui llamo a loadTableData con el page actualizado y con el valor de tamano de pagina que hay
      const handleCurrentChange = (page) => {
        //currentPage.value = page;
        ctx.emit('update:currentPage', page);
        nextTick(() => {
          loadTableData();
        });
      };

      //funcion que llama via axios un endpoint para recuperar un listado de DOIs. Fiajte que le pasamos en la request el rows y el offset (tu tendras algo parecido)
      const loadTableData = async () => {

        try {
          const response = await http.get(`${props.endpoint}&rows=${props.pageSize}&offset=${props.currentPage}`)
          //const response = await http.get('https://api.crossref.org/prefixes/10.5821/works?select=DOI,title,type&rows='+size+'&offset='+page)

          console.log(response.data.message)
          // actualizamos el total de items para el elemento pagination
          //totalItems.value = response.data.message['total-results']
          ctx.emit('update:totalItems', response.data.message['total-results']);

          //actualizamos los datos del elemento table
          pagedData.value = response.data.message.items


        } catch (e) {
          error.value = 'Request ERROR: ' + e.message;
        }
      };

      // Carga los datos al iniciar el componente con los valores por defecto para page y size (estan inicializados al principio del setup)
      loadTableData()

      return{
        pagedData,
        handleSizeChange,
        handleCurrentChange,
        error,
      }

    }


  }

</script>

<style scoped>


</style>
