<template>
  <div>
    <div>
      <el-form   :model="pageForm" label-width="150px"  ref="pageForm" >
        <el-form-item label="页面名称" >
          {{pageForm.pageName}}
        </el-form-item>

        <el-form-item label="静态化" prop="htmlValue">
          <!--<el-button type="primary" @click.native="generateHtml" :loading="addLoading">静态化</el-button>-->
          <el-input
            type="textarea"
            :rows="20"
            placeholder="点击 静态化 将根据模版生成静态化页面"
            v-model="htmlValue"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="go_back">返回</el-button>

        <el-button type="primary" @click.native="generateHtml" >静态化，并保存</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import * as cmsApi from '../api/cms'
  export default{
    data() {
      return {
        templateForm:{
          templateValue:''
        },
        htmlValue:'',
        pageForm: {
          siteId:'',
          pageId:'',
          pageName:'',
          templateId:''
        }

      }
    },methods:{
      go_back(){
        this.$router.push({
          path: '/cms/page/list', query: {
            page: this.$route.query.page,
            siteId:this.$route.query.siteId
          }
        })
      },
//生成静态页面并保存
      generateHtml: function () {
        //alert('静态化')
        cmsApi.page_generateHtml(this.pageId).then((res)=>{
          if(res.success){
            this.$message.success("静态化成功")
            this.htmlValue = res.html;
          }else{
            this.$message.error(res.message)
          }

        })
      }
    },
    created: function () {
      this.pageId=this.$route.params.pageId;
      //根据主键查询页面信息
      cmsApi.page_get(this.pageId).then((res) => {
        console.log(res);
        if(res.success){
          this.pageForm = res.cmsPage;
        }
      });
      //根据页面id查询静态化文件的内容
      cmsApi.page_getHtml(this.pageId).then((res) => {
        if(res.success){
          this.htmlValue = res.html
        }
      })
    },

  }
</script>
<style>

</style>
