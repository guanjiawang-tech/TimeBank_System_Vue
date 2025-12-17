<template>
   <div class='suggestBoxPage'>
        <h3>意见箱</h3>
        <el-table :data="tableData" height="670" style="width: 100%">
            <el-table-column prop="userid" label="帐号" width="180" />
            <el-table-column prop="dateInfo" label="提交时间" width="120" />
            <el-table-column prop="ideatext" label="内容"/>
            <el-table-column label="设置" width="130" align="center">
               <template #default="scope">
                  <el-button type="danger" size="mini" @click="deleteSettings(scope.row)">清除</el-button>
               </template>
            </el-table-column>
         </el-table>
   </div>
</template>

<script lang='ts' setup name=''>
import axios from 'axios';
import { reactive } from 'vue'

let tableData = reactive([])

axios.get('http://localhost:8080/ideabox/getIdeabox')
.then((res)=>{
   for(let i = 0; i < res.data.length; i++){
      tableData.push(res.data[i])
   }
   console.log(tableData)
})
.catch(()=>{
})
function deleteSettings(res){
   tableData.splice(tableData.length = 0)
   axios.post('http://localhost:8080/ideabox/deleteIdeabox',{
      dateInfo:res.dateInfo,
      userid:res.userid
   })
   .then((res)=>{
      axios.get('http://localhost:8080/ideabox/getIdeabox')
      .then((res)=>{
         for(let i = 0; i < res.data.length; i++){
            tableData.push(res.data[i])
         }
         console.log(tableData)
      })
   })
   .catch(()=>{
   })
}
</script>

<style scoped>

</style>