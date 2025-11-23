<template>

  <div class="mt-5">
    <div class="container mb-5">
      <div class="row mb-2 mt-3">
        <h4 class="mb-3">{{ $t("DOI Search") }}</h4>
        <div v-if="$i18n.locale == 'ca'" class="input-group small">
          <p>
            Dins del procés de millora de l’assignació d’identificadors DOI iniciat pel Servei de Biblioteques, Publicacions i Arxius de la UPC, s’ha desenvolupat el servei DOIBoard, per tal de poder recuperar informació sobre aquests identificadors incorporats a l’entitat registradora  CrossRef.
          </p>
          <p>
            Les seves funcionalitats principals són:
          </p>
          <ul>
            <li class="mt-3">
              <router-link to="/doi">Cerca DOI</router-link>: permet, a partir d’un identificador DOI recuperar-ne les dades bàsiques, així com enllaços al recurs al qual fa eferència, a la API de Crossref per veure quina informació hi ha registrada, així com a altres serveis addicionals com poden ser OpenAire, OpenCitations o Google Acadèmic.
            </li>
            <li class="mt-3">
              <p>
                <router-link to="/prefix/info">Prefix</router-link>: Informació: permet, a partir d’un prefix DOI recuperar la totalitat d’identificadors que té registrats, per a quins tipus de documents i per a cada un d’ells ofereix dades del nombre de registres per any, per data de publicació i quins sobre quines dades disposen d’informació.
              </p>
              <p>
                També es poden recuperar tots els identificadors associats al prefix, veure quins han estat més citats (segons les dades de CrossRef) o quins autors i autores estan associats a més documents.
              </p>
            </li>
            <li class="mt-3">
              <router-link to="/members">Llista de membres</router-link>: permet cercar institucions que registren els seus identificadors a CrossRef, veure’n els prefixes DOI associats i un resum de dades sobre els DOI registrats.
            </li>

          </ul>

        </div>

        <div v-if="$i18n.locale == 'es'" class="input-group small">
          <p>
            Dentro del proceso de mejora de la asignación de identificadores DOI iniciado por el Servicio de Bibliotecas, Publicaciones y Archivos de la UPC, se ha desarrollado el servicio DOIBoard, con el fin de poder recuperar información sobre estos identificadores incorporados en la entidad registradora CrossRef.
          </p>
          <p>
            Sus funcionalidades principales son:
          </p>
          <ul>
            <li class="mt-3">
              <router-link to="/doi">Buscar DOI</router-link>: permite, a partir de un identificador DOI, recuperar los datos básicos, así como enlaces al recurso al que hace referencia, a la API de CrossRef para ver qué información está registrada, así como a otros servicios adicionales como pueden ser OpenAire, OpenCitations o Google Académico.
            </li>
            <li class="mt-3">
              <p>
                <router-link to="/prefix/info">Información del Prefijo</router-link>: permite, a partir de un prefijo DOI, recuperar la totalidad de identificadores que tiene registrados, para qué tipos de documentos y para cada uno de ellos ofrece datos del número de registros por año, por fecha de publicación y sobre qué datos disponen de información.
              </p>
              <p>
                También se pueden recuperar todos los identificadores asociados al prefijo, ver cuáles han sido más citados (según los datos de CrossRef) o qué autores y autoras están asociados a más documentos.
              </p>
            </li>
            <li class="mt-3">
              <router-link to="/members">Lista de miembros</router-link>: permite buscar instituciones que registran sus identificadores en CrossRef, ver los prefijos DOI asociados y un resumen de datos sobre los DOI registrados.
            </li>
          </ul>
        </div>

        <div v-if="$i18n.locale == 'en'" class="input-group small">
          <p>
            As part of the process to improve the assignment of DOI identifiers initiated by the UPC Libraries, Publications, and Archives Service, the DOIBoard service has been developed to retrieve information about these identifiers incorporated into the CrossRef registry entity.
          </p>
          <p>
            Its main functionalities are:
          </p>
          <ul>
            <li class="mt-3">
              <router-link to="/doi">DOI Search</router-link>: allows, using a DOI identifier, to retrieve basic data, as well as links to the resource it refers to, to the CrossRef API to see what information is registered, and to other additional services such as OpenAire, OpenCitations, or Google Scholar.
            </li>
            <li class="mt-3">
              <p>
                <router-link to="/prefix/info">Prefix Information</router-link>: allows, using a DOI prefix, to retrieve all registered identifiers, for which types of documents, and for each of them offers data on the number of records per year, by publication date, and which data have information available.
              </p>
              <p>
                It is also possible to retrieve all identifiers associated with the prefix, see which ones have been most cited (according to CrossRef data), or which authors are associated with more documents.
              </p>
            </li>
            <li class="mt-3">
              <router-link to="/members">Members List</router-link>: allows searching for institutions that register their identifiers in CrossRef, seeing the associated DOI prefixes, and a summary of data on the registered DOIs.
            </li>
          </ul>
        </div>
      </div>
    </div>


  </div>

</template>

<script>

  import {ref} from "vue";

  export default {
    name: "AboutView",

    setup(){
      const messages = ref([]);
      messages.value = "Hola Fran!"

      return{
        messages
      }

    }


  }

</script>

<style scoped>

</style>
