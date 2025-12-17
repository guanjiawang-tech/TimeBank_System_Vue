<template>
   <div class='uploadActivityPage'>
      <div class="centered-div">
         <h3>发布活动</h3>
         <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="活动名称">
               <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="所需志愿者">
               <el-input v-model="form.number" />
            </el-form-item>
            <el-form-item label="所在社区">
               <el-input v-model="form.live" />
            </el-form-item>
            <el-form-item label="活动时间">
               <el-date-picker
                  v-model="form.date"
                  type="datetimerange"
                  start-placeholder="Start Date"
                  end-placeholder="End Date"
                  :default-time="defaultTime1"
               />
            </el-form-item>
            <el-form-item label="请选择所在地区">
               <el-cascader :options="options" @change="onFinish" clearable />
            </el-form-item>
            <el-form-item label="上传活动图片">
               <el-upload limit="1" action="#" list-type="picture-card" @change="handleFileChange" :auto-upload="false">
                  <el-icon><Plus /></el-icon>

                  <template #file="{ file }">
                     <div>
                     <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                     <span class="el-upload-list__item-actions">
                        <span
                           class="el-upload-list__item-preview"
                           @click="handlePictureCardPreview(file)"
                        >
                           <el-icon><zoom-in /></el-icon>
                        </span>
                        <span
                           v-if="!disabled"
                           class="el-upload-list__item-delete"
                           @click="handleRemove(file)"
                        >
                           <el-icon><Delete /></el-icon>
                        </span>
                     </span>
                     </div>
                  </template>
               </el-upload>

               <el-dialog v-model="dialogVisible">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
               </el-dialog>

               
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="onSubmit">Create</el-button>
               <el-button>Cancel</el-button>
            </el-form-item>
         </el-form>
      </div>
   </div>
</template>

<script lang='ts' setup name=''>
import { ElMessage } from 'element-plus'
import axios from 'axios';
import { reactive, ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import stringHandle from '../hooks/stringHandle'
const { generateRandomString } = stringHandle();

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleFileChange = (file: UploadFile) => {
   console.log(file.raw)
   const formData = new FormData();
   formData.append('file', file.raw); // 假设 file.raw 是 File 对象
   fetch(`http://localhost:3000/activityImg/upload`, {
   method: 'POST',
   body: formData,
   });
}

const options = ref([])
// 处理位置数据
const convertDataToNestedOptions = (data) => {  
  const provincesMap = new Map();  
  
  data.forEach(item => {  
    const { locationNo, locationInfoProvinces, locationInfoCities, locationInfoCounties } = item;  
  
    if (!provincesMap.has(locationInfoProvinces)) {  
      provincesMap.set(locationInfoProvinces, {  
        label: locationInfoProvinces,  
        value: locationInfoProvinces,
        children: []  
      });  
    }  
  
    const province = provincesMap.get(locationInfoProvinces);  
  
    let cityExists = province.children.find(child => child.label === locationInfoCities);  
    if (!cityExists) {  
      cityExists = {  
        label: locationInfoCities,  
        value: locationInfoCities, // 或者使用其他唯一标识符作为value  
        children: []  
      };  
      province.children.push(cityExists);  
    }  
  
    const county = {  
      label: locationInfoCounties,  
      value: locationNo, // 或者使用其他唯一标识符或显示文本作为value  
      code: locationNo // 使用locationNo作为区域代码  
    };  
  
    // 注意：这里我们不再需要为county设置两个value属性  
    cityExists.children.push(county);  
  });  
  
  return provincesMap.values();  
};

axios.get('http://localhost:8080/location/locationInfo')
.then((res)=>{
   console.log(res)
   const newOptions = convertDataToNestedOptions(res.data);  
   options.value.splice(0, options.value.length); // 清空数组  
   newOptions.forEach(option => {  
      options.value.push(option); // 添加新选项  
   });  
   console.log(options.value);
})
.catch(()=>{
})



// 日期转换
function parseAndFormatDate(dateString) {
    // 创建一个Date对象（注意：这可能会忽略时区信息）
    let date = new Date(dateString);
    
    // 手动解析月份（因为getMonth()返回的是0-11的索引）
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthIndex = dateString.match(/\s(\w{3})\s/)[1]; // 匹配月份缩写
    let monthNumber = monthNames.indexOf(monthIndex) + 1; // 转换为1-12的数字
    // 提取年份和日期
    let year = date.getFullYear();
    let day = date.getDate();
    let time = dateString.substring(16, 24)
    
   //  console.log(dateString,time)
    // 格式化日期为YYYY-MM-DD
    let formattedDate = `${year}-${monthNumber < 10 ? '0' : ''}${monthNumber}-${day < 10 ? '0' : ''}${day}`;
    
    return formattedDate+' '+time;
}

// do not use same name with ref
const form = reactive({
  name: '',
  number: '',
  live: '',
  date: '',
})

let fieldValue = ref('');
let locationCode = ref('');
function onFinish(selectedValues) { 
   // console.log(selectedValues)
	fieldValue.value = selectedValues
   locationCode.value = fieldValue.value[2]
   // console.log(locationCode.value)
}

const onSubmit = () => {
   // console.log(form)
   // console.log(parseAndFormatDate(String(form.date[0])))
   // console.log(parseAndFormatDate(String(form.date[1])))
   // console.log(locationCode.value)
   let Id = generateRandomString(20)
   // console.log(Id)
   axios.post('http://localhost:8080/activity/insertActivity',{
      activityId:Id,
      activityName:form.name,
      activityLocationNo:locationCode.value,
      activityUserId:'211282200402142410',
      activityStartTime:parseAndFormatDate(String(form.date[0])),
      activityOverTime:parseAndFormatDate(String(form.date[1])),
      activityVolunteerNumber:form.number,
      activityLocationInfo:form.live,
   })
   .then((res)=>{
      ElMessage({
         message: '操作成功.',
         type: 'success',
      })
   })
   .catch(()=>{
   })
   axios.post('http://localhost:3000/activityImg/updateImgName',{
      newFileName: Id
   })
   .then((res)=>{
   })
   .catch(()=>{
   })
}
// axios.post('http://localhost:8080/forum/insertForum',forumData)
//    .then(()=>{
//       router.go(-1);
//    })
//    .catch(()=>{
//       ElNotification({
//          title: '提示',
//          message: '添加失败',
//          duration: 0,
//       })
//    })
</script>

<style scoped>
.uploadActivityPage{
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