//导入public.js
import http from '../../../base/api/public'
//import http from '@/base/api/public'

//导入sysConfig.js
import sysConfig from '../../../../config/sysConfig'

//导入k-v转换工具类
import querystring from 'querystring'
let xcApiUrlPre = sysConfig.xcApiUrlPre;

//定义一个js方法并直接导出
export  const page_list=(page,size,params) => {
  //http请求服务端的url
  //使用axios进行http的访问
  //将params转成key/value
  let params_string=querystring.stringify(params)

  return http.requestQuickGet("/api/cms/page/list/"+page+"/"+size+"?"+params_string);

}

//新增页面提交
export const page_add=(params) => {
  return http.requestPost(xcApiUrlPre+"/cms/page/add",params)
}

//根据id查询页面
export const page_get=(id) => {
  return http.requestQuickGet(xcApiUrlPre+"/cms/page/get/"+id)
}

//修改提交
export const page_edit=(id,params) => {
  return http.requestPut(xcApiUrlPre+"/cms/page/edit/"+id,params)
}

//删除
export const page_delete=(id) => {
  return http.requestDelete(xcApiUrlPre+"/cms/page/del/"+id)
}
/*生成静态文件 */
export const page_generateHtml= id => {
  return http.requestPost(xcApiUrlPre+'/cms/page/generateHtml/'+id)
}
//查询静态文件内容
export const page_getHtml= id => {
  return http.requestGet(xcApiUrlPre+'/cms/page/getHtml/'+id)
}

//发布页面
export const page_postPage= id => {
  return http.requestPost(xcApiUrlPre+'/cms/page/postPage/'+id)
}
