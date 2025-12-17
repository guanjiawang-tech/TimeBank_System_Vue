<template>
   <div class='auditVoluntaryPage'>
        <h3>志愿审核</h3>
        <el-table :data="tableData" height="690" style="width: 100%">
            <el-table-column prop="name" label="设置" width="220" align="center" >
               <template #default="scope">
                  <el-button type="primary" size="mini" @click="passSettings(scope.row)">审核通过</el-button>
                  <el-button type="danger" size="mini" @click="unpassSettings(scope.row)">否决审核</el-button>
               </template>
            </el-table-column>
            <el-table-column prop="orderType" label="志愿类型" width="120" />
            <el-table-column prop="orderText" label="志愿内容" width="300" />
            <el-table-column prop="username1" label="求助人" width="140" />
            <el-table-column prop="phone1" label="联系方式" width="180" />
            <el-table-column prop="username2" label="志愿者" width="140" />
            <el-table-column prop="phone2" label="联系方式" width="180" />
         </el-table>
   </div>
</template>

<script lang='ts' setup name=''>
import axios from 'axios';
import { reactive } from 'vue'

let tableData = reactive([])

axios.get('http://localhost:8080/order/selectAllOrders')
.then((res)=>{
   for(let i = 0; i < res.data.length; i++){
      tableData.push(res.data[i])
   }
   console.log(tableData)
})

function passSettings(res){
   console.log(res)
   let userIdInfo = res.volunteerUserId;
   let userIdInfodown = res.userId;
   let timeStr = res.time_difference;
   let timeParts = timeStr.split(':');
   // 移除前导零并将结果转换为数字
   let hours = parseInt(timeParts[0], 10);
   let minutes = parseInt(timeParts[1], 10);
   let seconds = parseInt(timeParts[2], 10);
   console.log(hours,minutes,seconds,res.volunteerUserId)
   axios.post('http://localhost:8080/users/updateVolunteerTime',{
      hours:hours,
      minutes:minutes,
      seconds:seconds,
      userId:res.volunteerUserId
   })
   .then((res)=>{
      // axios.get('http://localhost:8080/order/selectAllOrders')
      // .then((res)=>{
      //    for(let i = 0; i < res.data.length; i++){
      //       tableData.push(res.data[i])
      //    }
      //    console.log(tableData)
      // })
   })
   axios.post('http://localhost:8080/order/updateOrders',{
      stage:"已通过",
		orderId:res.orderId,
   })
   .then((res)=>{
   })

   const [hoursStr, minutesStr, secondsStr] = res.time_difference.split(':').map(Number);
		    
   // 由于秒数在本例中总是0，我们可以忽略它
   const hours1 = hoursStr;
   const minutes1 = minutesStr/60; // 将分钟转换为小时的小数部分
   
   // 计算总的小时数（整数小时加上分钟转换的小时）
   const decimalHours1 = hours1 + minutes1;
   let timeInfo = decimalHours1.toFixed(1);
   console.log("aaaa",res.orderType,Number(timeInfo),res.coefficient)
   axios.get('http://localhost:8000/'+res.orderType+'/'+Number(timeInfo)+'/'+res.coefficient)
   .then((res)=>{
      console.log("aaaa",res)
      axios.post('http://localhost:8080/users/updateVolunteerRe/'+userIdInfo+'/'+res.data.price)
      .then((res)=>{
      })
      axios.post('http://localhost:8080/users/updateVolunteerReBack/'+userIdInfodown+'/'+res.data.price)
      .then((res)=>{
      })
      tableData.splice(tableData.length = 0)
      axios.get('http://localhost:8080/order/selectAllOrders')
      .then((res)=>{
         for(let i = 0; i < res.data.length; i++){
            tableData.push(res.data[i])
         }
         console.log(tableData)
      })
   })

}
function unpassSettings(res){
   console.log(res)
   axios.post('http://localhost:8080/order/updateOrders',{
      stage:"未通过",
		orderId:res.orderId,
   })
   .then((res)=>{
      tableData.splice(tableData.length = 0)
      for(let i = 0; i < res.data.length; i++){
         tableData.push(res.data[i])
      }
      console.log(tableData)
   })
}
</script>

<style scoped>

</style>