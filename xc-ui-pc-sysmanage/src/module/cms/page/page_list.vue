<template>
  <div>
    <!--条件-->
    <el-form  label-width="80px">
      选择站点：
      <el-select v-model="params.siteId" placeholder="请选择">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" placeholder="请输入内容" style="width:200px;"></el-input>
      <el-button type="primary" v-on:click="query">查询</el-button>
      <router-link :to="{path:'/cms/page/add',query:{
          page:this.params.page,
          siteId:this.params.siteId
        }
      }">
        <el-button type="primary" >新增</el-button>
      </router-link>
    </el-form>

    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180" >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="page">
          <el-button @click="edit(page.row.pageId)" type="text" size="small">修改</el-button>
          <el-button @click="del(page.row.pageId)" type="text" size="small">删除</el-button>
          <el-button @click="generateHtml(page.row.pageId)" type="text" size="small">静态化</el-button>
          <el-button @click="postPage(page.row.pageId)" type="text" size="small">发布页面</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="params.size"
      layout="prev, pager, next"
      v-on:current-change="change"
      :current-page="params.page"
      :total="total" style="float:right;">
    </el-pagination>
  </div>
</template>
<script>
  //导入
  import * as cmsApi from "../api/cms"
  //js代码,创建vm实例
  export default {
    data() {
      return {
        siteList:[],//站点列表
        list: [],
        total:0,
        params:{
          siteId:'',
          pageAliase:'',
          page:1,//页码
          size:10//每页显示个数
        }
      }
    },
    methods:{
      //分页
      change(page){
        this.params.page=page;
        this.query()
      },
      edit(pageId){
        //打开修改窗口,更改路由
        this.$router.push({
          path:'/cms/page/edit/'+pageId,
          query:{
            page:this.params.page,
            siteId:this.params.siteId
          }
        })
      },
      //页面发布
      postPage(pageId) {
        cmsApi.page_postPage(pageId).then((res)=>{
          if (res.success) {
            this.$message.success("静态页面生成成功");

          } else {
            this.$message.error(res.message);
          }
        })
      },
      del(pageId) {
        this.$confirm('是否删除吗?','提示',{}).then(()=>{
          cmsApi.page_delete(pageId).then((res)=>{
            if (res.success) {
              this.$message.success("删除成功");
              //刷新
              this.query();
            } else {
              this.$message.error("删除失败");
            }
          })
        })
      },
      generateHtml(pageId){
        //打开静态化窗口
        //打开修改窗口,更改路由
        this.$router.push({
          path:'/cms/page/generateHtml/'+pageId,
          query:{
            page:this.params.page,
            siteId:this.params.siteId
          }
        })
      },
      //查询
      query(){
        cmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
          //处理响应的结果
          this.list=res.queryResult.list;
          //总记录数
          this.total=res.queryResult.total;
        })
      }
    },
    created(){//vue实例创建完成还没有渲染dom对象
      //取出路由上的参数
      this.params.page= Number.parseInt(this.$route.query.page) || 1;
      this.params.siteId=this.$route.query.siteId || '';
    },
    mounted(){//vue实例创建完成并且渲染完成

      this.query()
      //初始化站点列表
      this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'102',
          siteName:'测试站'
        }
      ]
    }
  }
</script>
<style>

</style>
