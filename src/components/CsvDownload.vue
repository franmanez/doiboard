<template>

  <div>
    <LoadingComponent :is-loading="isLoading"></LoadingComponent>
    <button class="btn btn-success rounded-0" type="button" @click="search"><i class="bi bi-filetype-csv" style="font-size: 1.6rem;"></i> Download</button>
  </div>


</template>

<script>
import CrossrefService from "@/service/CrossrefService";
import LoadingComponent from "@/components/Loading.vue";
import {ref} from "vue";
import {ElMessageBox} from "element-plus";
import {useI18n} from "vue-i18n";

/**
 * Component intern que mostra la paginació del CRUD.
 */
export default {

    name: "CsvDownload",
    components: {LoadingComponent},
    props: {
      prefix: {},
      query: {},
      dates: {},
      type: {},


    },
    setup(props) {

      const { t } = useI18n();
      const isLoading = ref(false)

      const search = async () => {

        ElMessageBox.confirm(
            t("slow query message"),
            t("slow query title"),
            {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning',
            }
        )
            .then(async () => {
              isLoading.value = true
              let result = await CrossrefService.getDoisCSV(props.prefix, props.query, props.dates, props.type)
              //let resultJson = JSON.stringify(result, null, 2)

              //Convert Array JSON to String CSV Format
              const encabezados = Object.keys(result[0]);
              const filas = result.map(obj =>
                  encabezados.map(campo => {
                    let valor = obj[campo];

                    // Control "" value
                    if (typeof valor === 'string' && (valor.includes(',') || /\s/.test(valor) || valor.includes('"'))) {
                      valor = `"${valor.replace(/"/g, '""')}"`;
                    }

                    return valor;
                  }).join(',')
              );

              const csvData = [encabezados.join(','), ...filas].join('\n');

              // Create Blob with CSV data
              const blob = new Blob([csvData], { type: 'text/csv' });

              // Create link to download CSV file
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = `data-${props.prefix}.csv`;
              link.click();
              isLoading.value = false
            })
            .catch(() => {
              //Do nothing
            })
      }

        return {
          isLoading,
          search,
        }
    }
}
</script>

<style scoped>
</style>

