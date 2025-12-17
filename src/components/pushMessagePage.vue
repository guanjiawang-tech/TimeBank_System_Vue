<template>
   <div class='pushMessagePage'>
        <div class="centered-div">
         <h3>请您输入要发布的内容</h3><br>
         <el-form :model="form" label-width="auto" style="max-width: 98%">
            <el-form-item label="发布标题">
               <el-input v-model="form.announcementTitle" />
            </el-form-item>
            <el-form-item label="发布正文">
               <el-input v-model="form.announcementText" type="textarea" />
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="onSubmit">发布</el-button>
               <el-button>清除</el-button>
            </el-form-item>
         </el-form>
      </div>
   </div>
</template>

<script lang='ts' setup name=''>
import axios from 'axios';
import { reactive } from 'vue'
import stringHandle from '../hooks/stringHandle'
import getDateAndTime from '../hooks/getDateAndTime'
const { generateRandomString } = stringHandle();
const { getCurrentTimeData } = getDateAndTime();

// do not use same name with ref
const form = reactive({
  announcementId: '',
  announcementTitle: '',
  announcementFromtime: '',
  announcementText: '',
})

const onSubmit = () => {
   form.announcementId = generateRandomString(18)
   form.announcementFromtime = getCurrentTimeData()
   console.log(form)
   axios.post('http://localhost:8080/announcement/addAnnouncement',form)
   .then(()=>{
      form.announcementTitle = '';
      form.announcementText = '';
   })
   .catch(()=>{
   })
}

</script>

<style scoped>
.pushMessagePage{
   display: flex;
   justify-content: center; /* 水平居中 */
   align-items: center;    /* 垂直居中 */
   height: 92vh;
}
.centered-div {
   width: 80%;
   padding: 26px;
   background-color: lightblue;
}
</style>