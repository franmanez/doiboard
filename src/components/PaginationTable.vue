<template>

  <div id="Pagination">
    <el-pagination
        v-if="showPagination"
        v-model:currentPage="page"
        v-model:page-size="size"
        :page-sizes="[5, 10, 25]"
        :layout="layout"
        :total="total"
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        background
    >
    </el-pagination>
  </div>
  <div v-if="total > 10000" class="form-text text-danger" style="font-size: 0.8em;">{{ $t("results 10000") }}</div>
</template>

<script>
import {computed, ref, onMounted, onUnmounted, watch} from "vue"

export default {

    name: "PaginationTable",
    props: {
        // @private
        showPagination: {},
        // @private
        currentPage: {},
        // @private
        pageSize: {},
        // @private
        total: {},
        // @private
        handleSizeChange: {
            default: null,
        },
        // @private
        handleCurrentChange: {
            default: null,
        },
    },
    setup(props, ctx) {
        const page = computed(() => props.currentPage)
        const isMobile = ref(false)
        
        const updateIsMobile = () => {
          isMobile.value = window.innerWidth < 768
        }
        
        onMounted(() => {
          updateIsMobile()
          window.addEventListener('resize', updateIsMobile)
        })
        
        onUnmounted(() => {
          window.removeEventListener('resize', updateIsMobile)
        })
        
        // En móvil, forzar pageSize a 10
        const size = computed(() => {
          if (isMobile.value) {
            return 10
          }
          return props.pageSize
        })
        
        // Observar cambios en isMobile para actualizar el pageSize si es necesario
        watch(isMobile, (newVal) => {
          if (newVal && props.pageSize !== 10) {
            // Si cambiamos a móvil y el pageSize no es 10, actualizarlo
            if (props.handleSizeChange) {
              props.handleSizeChange(10)
            }
          }
        })
        
        const layout = computed(() => {
          // En móvil, quitar "sizes" del layout
          if (isMobile.value) {
            // En móvil, si hay más de 50 resultados (más de 5 páginas), no mostrar números
            if(props.total > 50) {
              // Más de 50 resultados: solo flechas sin números
              return "total, prev, next"
            } else {
              // 50 o menos resultados: mostrar números
              if(props.total > 10000) return "total, prev, next"
              else return "total, prev, pager, next"
            }
          } else {
            // Escritorio: comportamiento normal
            if(props.total > 10000) return "total, prev, next, sizes"
            else return "total, prev, pager, next, sizes"
          }
        })


        const handlePaginationSizeChange = (val) => {
            ctx.emit('update:currentPage', 0)
            if (props.handleSizeChange) props.handleSizeChange(val)
        }

        const handlePaginationCurrentChange = (val) => {
            ctx.emit('update:currentPage', val)
            if (props.handleCurrentChange) props.handleCurrentChange(val)
        }

        return {
            page,
            size,
            layout,
            handlePaginationSizeChange,
            handlePaginationCurrentChange,
        }
    }
}
</script>

<style scoped>
#Pagination {
  --el-color-primary: #000000;
}
</style>

