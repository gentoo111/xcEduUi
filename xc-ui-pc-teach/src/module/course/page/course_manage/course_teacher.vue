<template>
  <div>
    <div v-if="this.dotype=='1'">
      <course-steps v-bind:active="4"></course-steps>
    </div>
    教师信息

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="save" >提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as courseApi from '../../api/course';
  import utilApi from '../../../../common/utils';
  import courseSteps from '../../components/course_steps.vue';
  export default {
    components:{
      courseSteps
    },
    data() {
      return {
        dotype:'',
        courseid:''
      }
    },
    methods: {
      save: function () {
        this.$refs.courseMarketForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              if(this.dotype == '1'){
                //跳转到课程发布
                this.$router.push({ path: '/course/add/pub/5/1/'+this.courseid})
              }

            });
          }
        });
      }
    },
    mounted(){
      this.dotype = this.$route.params.dotype;
    }
  }
</script>
<style scoped>


</style>
