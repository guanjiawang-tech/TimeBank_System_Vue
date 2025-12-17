<template>
   <div class='updatePasswdPage'>
        updatePasswdPage
        <h3>志愿者信息</h3>
        <el-table :data="tableData" height="670" style="width: 100%">
            <el-table-column prop="userId" label="帐号" width="180" />
            <el-table-column prop="password" label="密码" width="120" />
            <el-table-column prop="username" label="姓名" width="120" />
            <el-table-column prop="phone" label="电话" width="120" />
            <el-table-column label="设置" align="center">
               <template #default="scope">
                  <el-button type="primary" size="mini" @click="deleteSettings(scope.row)">修改密码</el-button>
               </template>
            </el-table-column>
         </el-table>
   </div>
</template>

<script lang='ts' setup name=''>
import axios from 'axios';
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

let tableData = reactive([])

axios.get('http://localhost:8080/users/findAll')
.then((res)=>{
   for(let i = 0; i < res.data.length; i++){
      tableData.push(res.data[i])
   }
   console.log(tableData)
})
.catch(()=>{
})

function deleteSettings(res){
   console.log(res)
   ElMessageBox.prompt('请输入更新后的密码', '提示', {
    confirmButtonText: '完成',
    cancelButtonText: '返回',
    inputPattern:/./,
    inputErrorMessage: '不能为空',
   })
    .then(({ value }) => {
      axios.post('http://localhost:8080/users/updatePassword',{
         userId:res.userId,
         password:value,
      })
      .then((res)=>{
         tableData.splice(tableData.length = 0)
         axios.get('http://localhost:8080/users/findAll')
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
      ElMessage({
        type: 'success',
        message: `您的密码更新成功:${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}

</script>

<style scoped>

</style>