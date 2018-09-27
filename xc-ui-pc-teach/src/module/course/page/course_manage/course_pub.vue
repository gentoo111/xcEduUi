<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>课程预览</span>
      </div>
      <div class="text item">
        <el-button type="primary"  @click.native="preview" >课程预览</el-button>
        <br/><br/>
        <span v-if="previewurl && previewurl!=''"><a :href="previewurl" target="_blank">点我查看课程预览页面 </a> </span>
      </div>
    </el-card><br/>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>课程发布（请先完成课程预览）</span>
      </div>
      <div class="text item">
        <div v-if="course.status == '202001'">
          状态：制作中<br/>
          <el-button type="primary"  @click.native="publish" >新课程发布</el-button>
        </div>
        <div v-else-if="course.status == '202003'">
          状态：已下线
          <br/><br/>
          <span><a :href="'http://www.xuecheng.com/course/detail/'+this.courseid+'.html'" target="_blank">点我查看课程详情页面 </a> </span>
        </div>
        <div v-else-if="course.status == '202002'">
          状态：已发布<br/>
          <el-button type="primary"  @click.native="publish" >修改发布</el-button>
          <br/><br/>
          <span><a :href="'http://www.xuecheng.com/course/detail/'+this.courseid+'.html'" target="_blank">点我查看课程详情页面 </a> </span>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import * as courseApi from '../../api/course';
  import utilApi from '../../../../common/utils';
  export default {
    data() {
      return {
        dotype: '',
        courseid:'',
        course: {"id":"","name":"","status":""},
        previewurl:''
      }
    },
    methods: {
      //预览
      preview(){
        //调用课程管理服务的预览接口,得到课程预览url
        courseApi.preview(this.courseid).then((res) => {
          if(res.success){
            this.$message.success('预览成功');
            if(res.previewUrl){
              //预览url
              this.previewurl = res.previewUrl
            }
          }else{
            this.$message.error('预览失败');
          }

        });
      },
      //发布
      publish(){
        this.$confirm('课程发布后将不允许回退，是否继续？', '提示', {}).then(() => {
          courseApi.publish(this.courseid).then((res) => {
            if(res.success){
              this.$message.success('发布成功');
            }else if(res.message){
              this.$message.error(res.message);
            }else{
              this.$message.error("发布失败");
            }

          });
        });
      }
    },
    mounted(){
      //课程id
      this.courseid = this.$route.params.courseid;
      console.log("courseid=" + this.courseid)
      //取出课程基本信息
      courseApi.getCoursebaseById(this.courseid).then((res) => {
        console.log(res);
        this.course = res;
      });
    }
  }
</script>
<style scoped>


</style>
