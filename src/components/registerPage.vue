<template>    
	<view class="registerPage">    
		<view class="registerTitle">  
			<h2><b>欢迎来到时间银行</b></h2>    
			<p>帮助他人亦是帮助自己</p>    
		</view>  
		<view class="registerIndex">
			<view class="input-group">  
				<text class="label">身份证</text>  
				<input type="text" placeholder="请输入您的身份证" v-model="reagisterFormInfo.userID" />  
				<span class="label label-danger" v-if="errors.userID">{{ errors.userID }}</span>
			</view>  
			<view class="input-group">  
				<text class="label">姓名</text>  
				<input type="text" placeholder="请输入您的姓名" v-model="reagisterFormInfo.userName" />  
				<span class="label label-danger" v-if="errors.userName">{{ errors.userName }}</span>
			</view>  
			<view class="input-group">  
				<text class="label">电话号</text>  
				<input type="text" placeholder="请输入您的电话号" v-model="reagisterFormInfo.phone" />  
				<span class="label label-danger" v-if="errors.phone">{{ errors.phone }}</span>
			</view>
			<view class="input-group">  
				<text class="label">密码</text>  
				<input type="password" placeholder="请输入您的密码" v-model="reagisterFormInfo.password" />  
				<span class="label label-danger" v-if="errors.password">{{ errors.password }}</span>
			</view>  
			<view class="input-group">  
				<text class="label">确认密码</text>  
				<input type="password" placeholder="请输入您的确认密码" v-model="reagisterFormInfo.confirmationPassword" />  
				<span class="label label-danger" v-if="errors.confirmationPassword">{{ errors.confirmationPassword }}</span>
			</view>  
		</view>  
		<view class="button">  
			<button @click="goRegister">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>  
			
			<view class="registerToLogin" @click="registerToLogin">
				已有帐号，去<b>登陆</b>
			</view>
		</view> 
	</view>    
</template>
	
<script setup>  
	import { ElMessage, ElMessageBox } from 'element-plus'
	import axios from 'axios';
	import { ref } from 'vue';    
	let reagisterFormInfo = ref({
		userID:'',
		userName:'',
		phone:'',
		password:'',
		confirmationPassword:''
	});

	let errors = ref({
		userID:'',
		userName:'',
		phone:'',
		password:'',
		confirmationPassword:''
	});

	function clearErrors() {
		errors.value = {
			userID:'',
			userName:'',
			phone:'',
			password:'',
			confirmationPassword:''
		};
	}

	function goRegister() {
		clearErrors();

		// 验证身份证号
		const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
		if (!reagisterFormInfo.value.userID || !idCardRegex.test(reagisterFormInfo.value.userID)) {
			errors.value.userID = '身份证格式不正确';
		} else {
			// 校验性别和年龄
			const idCard = reagisterFormInfo.value.userID;
			const gender = (parseInt(idCard.charAt(16), 10) % 2 === 0) ? '女' : '男';
			
			// 提取出生日期，并正确处理年份
			const birthYear = parseInt(idCard.substr(6, 4), 10); // 获取完整的年份，2003 年
			const birthMonth = parseInt(idCard.substr(10, 2), 10); // 获取月份
			const birthDay = parseInt(idCard.substr(12, 2), 10); // 获取日期
			const birthDate = new Date(birthYear, birthMonth - 1, birthDay); // 月份在 Date 对象中是 0-11，所以需要减 1
			
			const today = new Date();
			let age = today.getFullYear() - birthDate.getFullYear();
			const monthDiff = today.getMonth() - birthDate.getMonth();
			if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			
			// 注意：这里我们没有将性别和年龄保存到任何地方，因为您没有在表单中要求这些字段
			// 如果您需要保存它们，可以在reagisterFormInfo中添加相应的属性，并在发送请求时包含它们
		}

		if (!reagisterFormInfo.value.userName) {
			errors.value.userName = '姓名不能为空';
		}
		
		// 验证密码
		if (!reagisterFormInfo.value.password) {
			errors.value.password = '密码不能为空';
		}

		// 验证确认密码
		if (reagisterFormInfo.value.password !== reagisterFormInfo.value.confirmationPassword) {
			errors.value.confirmationPassword = '两次密码输入不一致';
		}

		// 验证电话号码（假设是手机号码）
		const phoneRegex = /^1[3-9]\d{9}$/;
		if (!reagisterFormInfo.value.phone || !phoneRegex.test(reagisterFormInfo.value.phone)) {
			errors.value.phone = '电话号码格式不正确';
		}

		if (Object.values(errors.value).every(error => !error)) {
			console.log(reagisterFormInfo.value)
			// 发送注册请求
			// 注意：这里假设您已经安装了axios，并且服务器地址是正确的
			axios.post('http://localhost:8080/users/insert', {
				userId: reagisterFormInfo.value.userID,
				username: reagisterFormInfo.value.userName,
				phone: reagisterFormInfo.value.phone,
				status: "管理员",
				password: reagisterFormInfo.value.password,
			})
			.then(res => {
				// 假设您有一个全局的ElMessage组件用于显示消息
				// 如果没有，请替换为适合您项目的消息显示方式
				ElMessage.success('注册成功');
				window.location.href = 'http://localhost:5172/'; // 假设这是登录后的重定向地址
			})
			.catch(error => {
				console.error('注册失败', error);
				ElMessage.error('注册失败，您已注册过帐号');
			});
		}
	}

	function registerToLogin() {
		window.location.href = 'http://localhost:5172/';
	}
</script>
    
<style>    
.registerPage {    
	background-color: #ECF9FA;    
	height: 100vh;    
	display: flex;    
	flex-direction: column;    
	align-items: center;    
	padding: 10px;    
	padding-top: 40px;    
	box-sizing: border-box; /* 确保内边距和边框不影响元素的总宽度和高度 */  
}    
    
.registerTitle {    
	width: 100%; /* 修改为100%宽度，以便更好地适应不同屏幕尺寸 */  
	max-width: 600px; /* 设置一个合理的最大宽度 */  
	margin: 0 auto; /* 水平居中 */  
	text-align: center; /* 文本居中 */  
	margin-bottom: 30px; /* 增加底部外边距 */  
}  
  
.registerTitle h2 {  
	font-size: 24px; /* 增加字体大小 */  
	margin-bottom: 10px; /* 增加标题和副标题之间的间距 */  
}  
  
.registerTitle p {  
	font-size: 16px; /* 增加字体大小 */  
	color: #333; /* 设置字体颜色，这里使用深灰色 */  
}  
  
.registerIndex {    
	width: 90%;    
	max-width: 500px; /* 保持最大宽度不变 */  
	margin: 0 auto; /* 水平居中 */  
	padding: 0 15px;  
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */  
	border-radius: 8px; /* 添加圆角 */  
	background-color: #fff; /* 设置背景色为白色，以提高可读性 */  
}    
    
.input-group {  
	display: flex;    
	align-items: center; /* 垂直居中 */  
	margin-bottom: 15px; /* 保持底部外边距不变 */  
	gap: 10px; /* 保持标签和输入框之间的间距不变 */  
	border-bottom: 1px solid #ddd; /* 添加底部边框 */  
}  
  
.input-group:last-child {  
	border-bottom: none; /* 移除最后一个输入组的底部边框 */  
}  
  
.label {    
	width: 100px; /* 稍微增加宽度，以适应可能的中文标签 */  
	text-align: right; /* 保持文本右对齐 */  
	font-size: 16px; /* 增加字体大小 */  
}   

.label-danger{
	color:red;
	width: 160px;
}
.input-group input {    
	flex: 1; /* 保持占据剩余空间 */  
	height: 40px; /* 增加输入框高度 */  
	border: none; /* 移除边框，因为已经通过input-group的边框来区分 */  
	padding-left: 10px; /* 增加内边距 */  
	padding-right: 10px; /* 增加内边距 */  
	font-size: 16px; /* 增加字体大小 */  
	box-sizing: border-box; /* 确保内边距不影响输入框的总宽度 */  
}  
  
.button button {  
	width: 220px; /* 修改为100%宽度，以适应不同屏幕尺寸 */
	margin: 15px auto; /* 修改外边距，使其垂直居中并有一定的间距 */
	font-size: 16px;
	border: none;
	border-radius: 4px;
	background-color: #1BA035;
	color: #fff;
	cursor: pointer; /* 添加鼠标悬停效果 */  
	height: 38px;
}  
  
.button button:hover {  
	background-color: #188a2e; /* 添加鼠标悬停时的背景色变化效果 */  
}  
.registerToLogin{
	position: relative;
	top: 2px;
	right: -18px;
	font-size: 14px;
}
</style>