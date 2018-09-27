<template>
  <div>
    用户管理首页{{name}}
  </div>
</template>
<script>

  export default {
    layout:'test',
    data(){
      return{
        //name:"黑马"
      }
    },
    methods:{
      //这里面的方法是客户端调用执行的
      testA(){
        return new Promise(function (resolve,reject) {
          setTimeout(function () {
            resolve("a")
          },2000)
        })
      },
      testB(){
        return new Promise(function (resolve,reject) {
          setTimeout(function () {
            resolve("b")
          },1000)
        })
      }
    },
    mounted(){
      this.testA().then(res=>{
        alert(res)
      })
      this.testB().then(res=>{
        alert(res)
      })
    },
    //服务端去调用方法获取数据,渲染html
    async asyncData({store,route}){
      console.log("asyncData...")

      //同步调用a
      var a =await new Promise(function (resolve,reject) {
        setTimeout(function () {
          console.info("a")
          resolve("a")
        },2000)
      })
      //同步调用b
      var b=await new Promise(function (resolve,reject) {
        setTimeout(function () {
          console.info("b")
          resolve("b")
        },1000)
      })

      return {
        name:"hello world!"
      }
    }
  }
</script>
