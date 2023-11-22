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
import {computed} from "vue"

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
        const size = computed(() => props.pageSize)
        const layout = computed(() => {
          if(props.total > 10000) return "total, prev, next, sizes"
          else return "total, prev, pager, next, sizes"
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

