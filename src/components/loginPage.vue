<template>
   <view class="loginPage">  
		<view class="loginTitle">  
			<h2><b>欢迎来到时间银行管理系统</b></h2>  
			<p>帮助他人亦是帮助自己</p>  
		</view>  
		<view class="loginIndex">
			<input type="text" placeholder="请输入证件号或手机号" v-model="loginPageVal.account"/>  
			<input type="password" placeholder="请输入您的密码" v-model="loginPageVal.password"/> <!-- 注意：type="safe-password" 不是有效的HTML输入类型，应使用 type="password" -->  
		</view>  
		<view class="button">
			<button style="background-color: #1BA035; color: #fff;" @click="toLoginPage">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
			<button @click="toRegisterPage">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
		</view>
	</view>  
</template>

<script lang='ts' setup name=''>
import axios from 'axios';
import { onMounted, reactive } from 'vue';

let loginPageVal = reactive({
    account: '',
    password:''
})
function toRegisterPage(){
    window.location.href = 'http://localhost:5172/registere';
}
function toLoginPage(){
    console.log(loginPageVal)
    axios.post('http://localhost:8080/users/toLogin',{
        userId:loginPageVal.account,
        password:loginPageVal.password
    })
   .then((res)=>{
        console.log(res)
        if (res.data) { 
            window.location.href = 'http://localhost:5172/index/auditVoluntary';
         }
        
   })
   .catch(()=>{
   })
}
</script>

<style scoped>
.loginPage {  
	background-color: #ECF9FA;  
	height: 100vh;  
	display: flex;  
	flex-direction: column; /* 垂直布局 */  
	align-items: center; /* 垂直居中 */  
	padding: 20px;
	padding-top: 40px;
}  
  
.loginTitle {  
	width: 70%;  
	text-align: center;  
	margin-bottom: 20px; /* 添加底部外边距以分隔标题和输入框 */  
}  
  
.loginIndex { 
	width: 70%; /* 与 .loginTitle 保持一致 */  
	display: flex;  
	flex-direction: column; /* 垂直堆叠输入框 */  
	align-items: center; /* 输入框垂直居中（在这个上下文中可能不是必需的，因为输入框默认会垂直堆叠） */  
	padding: 0 15px; /* 可选：为输入框添加一些水平内边距 */  
}  
  
.loginIndex input {  
    height: 32px;  
    /* 明确设置其他边框为0或none，虽然这通常是默认的 */
    border-top: 0; 
    border-right: 0; 
    border-left: 0; 
    border-bottom: 1px solid black;  /* 保留底部边框 */
    width: calc(100% - 20px); /* 考虑左右内边距后的宽度 */  
    padding-left: 8px;  
    padding-right: 8px;  
    margin-bottom: 18px; /* 添加底部外边距以分隔输入框 */
    background-color: transparent;
    font-size: 18px;
}
.button button{
	width: 240px;
	margin: 12px;
    height: 42px;
	border: none;
    font-size: 16px;
}
.selectBox {  
    width: 100%;  
    height: 36px;
	border: none;
    border-bottom: 1px solid black;
    padding-left: 8px;
    padding-right: 8px;
    background-color: transparent;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
	padding-left: 12px;
	font-size: 16px;
}
.selectBox::after {  
    content: '\25BC';
    position: absolute;  
    right: 10px;
    top: 50%;  
    transform: translateY(-50%);  
    pointer-events: none;
    color: black;
}
</style>