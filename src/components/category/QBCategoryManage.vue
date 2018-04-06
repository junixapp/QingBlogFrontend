<template>
  <div>
    <div>QBCategoryManage</div>
    <div>{{categories}}</div>
  </div>
</template>

<script>
  import CategoryApi from '../../api/category'

  export default {
    name: "QBCategoryManage",
    data() {
      return {
        categories: []
      }
    },
    mounted() {
      CategoryApi.getCategories((data) => {
        this.categories.push(...data.data)
      })
    }
  }
</script>

<style scoped lang="stylus">

</style>
