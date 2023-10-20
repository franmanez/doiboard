<template>

  <div>
    <img alt="Logo" src="../assets/doi-logo.png" class="mb-3 mx-auto d-block">


    <div class="container mb-5" >
      <div class="row col-12">
        <div class="col-10">
          <input class="form-control form-control-lg rounded-0" v-model="prefix" placeholder="10.nnnnnn">

        </div>
        <div class="col-2">
          <button type="button" class="btn btn-warning btn-lg rounded-0" @click="getPrefix">Search Prefix</button>
        </div>
      </div>
    </div>


    <div class="container" v-if="Object.keys(contentPrefix) != 0">
      <hr class="mt-0 mb-4">
      <div>
      <h2>Data prefix {{prefix.split("/")[0]}} </h2>
      <h3><p class="badge bg-danger">TOTAL {{contentPrefix.total}}</p></h3>
      </div>

      <div class="card-group" >

        <div v-for="(value, index, cont) in contentPrefix.facets" :key="value.id">
          <div class="card me-3 mb-3 text-center" :class="color(cont)" style="width: 17rem;">
            <div class="card-header" :class="color(cont)">
              <h4 class="font-weight-normal">{{ index }}</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title">{{value}}</h1>
            </div>
          </div>
        </div>
      </div>

    </div>

    <hr>

    <div class="container-lg">
      <button class="btn btn-primary mx-3" @click="addSerie('edited-book')">Book</button>
      <button class="btn btn-danger mx-3" @click="addSerie('journal-article')">Journal article</button>
      <button class="btn btn-success mx-3" @click="addSerie('dataset')">Dataset</button>
      <div ref="chartRef"></div>
    </div>




    <div class="alert alert-danger mt-4" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

  import http from '@/http-common';
  import CrossrefService from '@/service/CrossrefService';
  import {onMounted, ref} from "vue";
  import Highcharts from "highcharts";
  export default {
    name: "DoiSearch",

    setup(){

      const contentPrefix = ref({})
      const prefix = ref('10.5821');

      const chartRef = ref(null);
      const chartOptions2 = ref({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Items published by document type and year',
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          title: {
            text: '#',
          },
        },
        //series: seriesData.value
        series: [/*{
          name: 'Dissertation',
          data: [3, 5, 1]
        }, {
          name: 'Journal article',
          data: [14, 8, 8]
        }*/]
      });

      const cont = ref(0)
      const error = ref(null);

      let map = {}

      const bootstrapClasses = [
        "border-primary",
        "border-secondary",
        "border-success",
        "border-danger",
        "border-warning",
        "border-info",
        "border-light",
        "border-dark",
      ];

      const color = (index) => {
        //console.log(index % bootstrapClasses.length)
        return bootstrapClasses[index % bootstrapClasses.length];
      };

      map["Edited Book"] = "edited-book"
      map["Journal Article"] = "journal-article"
      map["Dissertation"] = "dissertation"
      map["Dataset"] = "dataset"
      map["Database"] = "database"
      map["Conference Paper"] = "proceedings-article"

      /*"book-section"
      "monograph"
      "report-component"
      "report"
      "peer-review"
      "book-track"
      "book-part"
      "other"
      "book"
      "journal-volume"
      "book-set"
      "reference-entry"
      "journal"
      "component"
      "book-chapter"
      "proceedings-series"
      "report-series"
      "proceedings"
      "database"
      "standard"
      "reference-book"
      "posted-content"
      "journal-issue"
      "grant"
      "book-series"*/

      onMounted(async () => {
        createChart2();
      });

      const clear = () => {
        contentPrefix.value = ''
        error.value = null
        increment()
      }

      const increment = () => {
        cont.value = cont.value + 1
      }

      const getPrefix = async () => {
        clear()
        try {
          const response = await http.get('/prefixes/'+prefix.value+'/works?facet=type-name:*&rows=0')
          //const responseJson = await response.data

          contentPrefix.value = {
            'status': response.data.status,
            'total': response.data.message['total-results'],
            'facets': response.data.message.facets['type-name'].values
          }

          for(let keyTypeName in contentPrefix.value.facets) {
            await getPublishedByTypeName(prefix.value, map[keyTypeName])
            //console.log("name: " + keyTypeName + ", value: "+ contentPrefix.value.facets[keyTypeName]);
          }

        } catch (e) {
          error.value = 'Request ERROR: ' + e.message;
        }
      }

      const getPublishedByTypeName = async (prefix, typeName) => {

        try {

          if(typeName === 'dissertation'){
            CrossrefService.getApprovedDate(prefix, typeName).then((result) => {
              console.log(`${typeName} - ${JSON.stringify(result)}`);
            })

          }else{

            CrossrefService.getPublishedDate(prefix, typeName).then((result) => {
              console.log(`${typeName} - ${JSON.stringify(result)}`);
            })

            //const response = await http.get('/prefixes/'+prefix+'/works?filter=type:'+typeName+'&facet=published:*&rows=0')
            //console.log(typeName + ": " + JSON.stringify(response.data.message.facets.published.values))
          }




        } catch (e) {
          error.value = 'Request ERROR: ' + e.message;
        }
      }



      const addSerie = async (type) => {


        try {


          CrossrefService.getPublishedDate(prefix.value, type).then((result) => {


            const resultKeys = Object.keys(result);
            const resultValues = Object.values(result);

            console.log(resultKeys)

            /*let values = resultValues.map(function (element) {
              return element
            })*/



            const newSeries = {
              name: type,
              data: resultValues,
            };


            chartOptions2.value.xAxis.categories = resultKeys
            chartOptions2.value.series.push(newSeries);
            createChart2()

          })

        } catch (error) {
          console.error(error);
        }


      };


      const createChart2 = () => {
        if (chartRef.value) {
          console.log(chartRef.value)
          console.log(chartOptions2)
          Highcharts.chart(chartRef.value, chartOptions2.value);
        }
      };






      return{
        contentPrefix,
        cont,
        increment,
        getPrefix,
        prefix,
        color,
        addSerie,
        chartRef,
        createChart2,
        error,
      }

    }


  }

</script>

<style scoped>

.gradient-custom {
  /* fallback for old browsers */
  background: #ffc72c;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right bottom, rgb(1, 118, 152), rgb(1, 118, 152));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right bottom, rgb(1, 118, 152), rgb(1, 118, 152))
}

</style>
