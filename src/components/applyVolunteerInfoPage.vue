<template>
   <div class='apply'>
        <h3>志愿者申请审核</h3>
        <el-table :data="tableData" height="670" style="width: 100%">
            <el-table-column prop="userId" label="帐号" width="180" />
            <el-table-column prop="volunteerTime" label="申请时间" width="180" />
            <el-table-column prop="volunteerText" label="申请内容"/>
            <el-table-column label="设置" width="180" align="center">
               <template #default="scope">
                  <el-button type="primary" size="mini" @click="passSettings(scope.row)">通过</el-button>
                  <el-button type="danger" size="mini" @click="unpassSettings(scope.row)">驳回</el-button>
               </template>
            </el-table-column>
         </el-table>
   </div>
</template>

<script lang='ts' setup name=''>
import axios from 'axios';
import { reactive } from 'vue'

let tableData = reactive([])

axios.get('http://localhost:8080/users/getAllUsers')
.then((res)=>{
   for(let i = 0; i < res.data.length; i++){
      tableData.push(res.data[i])
   }
   console.log(tableData)
})
.catch(()=>{
})

function passSettings(res){
   console.log(res.userId)
   axios.post('http://localhost:8080/users/updateStatusToVolunteer',{
      userId:res.userId
   })
   .then((res)=>{
      tableData.splice(tableData.length = 0)
      axios.get('http://localhost:8080/users/getAllUsers')
      .then((res)=>{
         for(let i = 0; i < res.data.length; i++){
            tableData.push(res.data[i])
         }
         // console.log(tableData)
      })
      .catch(()=>{
      })
   })
   .catch(()=>{
   })
}

function unpassSettings(res){
   console.log(res.userId)
   axios.post('http://localhost:8080/users/updateStatusReBack',{
      userId:res.userId
   })
   .then((res)=>{
      tableData.splice(tableData.length = 0)
      axios.get('http://localhost:8080/users/getAllUsers')
      .then((res)=>{
         for(let i = 0; i < res.data.length; i++){
            tableData.push(res.data[i])
         }
         // console.log(tableData)
      })
      .catch(()=>{
      })
   })
   .catch(()=>{
   })
}
</script>

<style scoped>

</style>