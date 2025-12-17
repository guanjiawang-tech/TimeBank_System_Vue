<template>
   <div class='volunteerInfoPage'>
        volunteerInfoPage
        <h3>志愿者信息</h3>
        <el-table :data="tableData" height="670" style="width: 100%">
            <el-table-column prop="userId" label="帐号" width="180" />
            <el-table-column prop="password" label="密码" width="120" />
            <el-table-column prop="username" label="姓名" width="120" />
            <el-table-column prop="phone" label="电话" width="120" />
            <el-table-column label="设置" align="center">
               <template #default="scope">
                  <el-button type="danger" size="mini" @click="updateSettings(scope.row)">清除志愿者身份</el-button>
               </template>
            </el-table-column>
         </el-table>
   </div>
</template>

<script lang='ts' setup name=''>
import axios from 'axios';
import { reactive } from 'vue'

let tableData = reactive([])

axios.post('http://localhost:8080/users/findByStatus',{
   status:"志愿者"
})
.then((res)=>{
   for(let i = 0; i < res.data.length; i++){
      tableData.push(res.data[i])
   }
   console.log(tableData)
})
.catch(()=>{
})

function updateSettings(res){
   console.log(res)
   axios.post('http://localhost:8080/users/updateStatusRe',{
      userId:res.userId,
      status:"用户",
   })
   .then((res)=>{
      tableData.splice(tableData.length = 0)
      axios.post('http://localhost:8080/users/findByStatus',{
         status:"志愿者"
      })
      .then((res)=>{
         for(let i = 0; i < res.data.length; i++){
            tableData.push(res.data[i])
         }
         console.log(tableData)
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