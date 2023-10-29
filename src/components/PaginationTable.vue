<template>
    <el-pagination
        v-if="showPagination"
        v-model:currentPage="page"
        v-model:page-size="size"
        :page-sizes="[5, 10, 25]"
        layout="total, prev, pager, next, sizes"
        :total="total"
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
    >
    </el-pagination>
</template>

<script>
import {computed} from "vue"

/**
 * Component intern que mostra la paginació del CRUD.
 */
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
            handlePaginationSizeChange,
            handlePaginationCurrentChange,
        }
    }
}
</script>

<style scoped>



</style>

