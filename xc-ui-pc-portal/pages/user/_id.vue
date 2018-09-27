<template>
  <div>
    查询一个用户用户,用户主键为:{{id}}
  </div>
</template>
<script>

  export default {
    layout:'test',
    data(){
      return{
        id:""
      }
    },
    mounted(){
      this.id=this.$route.params.id
    }
  }
</script>
