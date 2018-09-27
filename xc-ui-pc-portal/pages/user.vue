<template>
  <div>
    用户管理导航
    <nuxt-link :to="'/user/edit/'+id">
      修改用户
    </nuxt-link>
    <nuxt-link :to="'/user/delete/'+id">
      删除用户
    </nuxt-link>
    <nuxt-link :to="'/user/add/'+id">
      添加用户
    </nuxt-link>

    <nuxt-child></nuxt-child>
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
