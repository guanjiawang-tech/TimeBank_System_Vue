import { createRouter, createWebHistory } from 'vue-router';
 
// 引入组件
import indexPage from './components/indexPage.vue';
import uploadActivityPage from './components/uploadActivityPage.vue';
import auditVoluntaryPage from './components/auditVoluntaryPage.vue';
import pushMessagePage from './components/pushMessagePage.vue';
import suggestBoxPage from './components/suggestBoxPage.vue';
import volunteerInfoPage from './components/volunteerInfoPage.vue';
import userInfoPage from './components/userInfoPage.vue';
import applyVolunteerInfoPage from './components/applyVolunteerInfoPage.vue';
import administratorManagePage from './components/administratorManagePage.vue';
import updatePasswdPage from './components/updatePasswdPage.vue';
import loginPage from './components/loginPage.vue';
import registerPage from './components/registerPage.vue';
 
// 定义路由
const routes = [
  { path: '/', component: loginPage, },
  { path: '/registere', component: registerPage, },
  { path: '/index', component: indexPage, children: [
    { path: 'uploadActivity', component: uploadActivityPage },
    { path: 'auditVoluntary', component: auditVoluntaryPage },
    { path: 'pushMessage', component: pushMessagePage },
    { path: 'suggestBox', component: suggestBoxPage },
    { path: 'volunteerInfo', component: volunteerInfoPage },
    { path: 'userInfo', component: userInfoPage },
    { path: 'applyVolunteerInfo', component: applyVolunteerInfoPage },
    { path: 'administratorManage', component: administratorManagePage },
    { path: 'updatePasswd', component: updatePasswdPage },
  ]},
  
];
 
// 创建router实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});
 
export default router;