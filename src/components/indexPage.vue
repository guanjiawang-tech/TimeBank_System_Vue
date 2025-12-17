<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside width="200px" style="background-color: #D1D1D1; height: 98vh;">
            <!-- 菜单栏开始 -->
            <el-row class="tac">
                <el-col :span="24">
                    <h3 class="mb-2" style="margin-left: 26px;">时间银行管理页面</h3>
                    <el-menu
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    class="el-menu-vertical-demo"
                    default-active="/index/auditVoluntary"
                    text-color="#fff"
                    @select="handleSelect"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-sub-menu index="5">
                        <template #title>
                        <el-icon><Discount /></el-icon>
                        <span>志愿管理</span>
                        </template>
                        <router-link class="routerlink" to="/index/uploadActivity"><el-menu-item index="1-1"><el-icon><Upload /></el-icon>发布活动</el-menu-item></router-link>
                        <router-link class="routerlink" to="/index/auditVoluntary"><el-menu-item index="1-2"><el-icon><EditPen /></el-icon>志愿审核</el-menu-item></router-link>
                    </el-sub-menu>
                    <router-link class="routerlink" to="/index/pushMessage">
                      <el-menu-item index="2">
                        <template #title>
                        <el-icon><FolderOpened /></el-icon>
                        <span>信息推送</span>
                        </template>
                      </el-menu-item>
                    </router-link>
                    <router-link class="routerlink" to="/index/suggestBox">
                      <el-menu-item index="3">
                        <template #title>
                        <el-icon><MessageBox /></el-icon>
                        <span>意见箱查看</span>
                        </template>
                      </el-menu-item>
                    </router-link>
                    <el-sub-menu index="4">
                        <template #title>
                        <el-icon><Unlock /></el-icon>
                        <span>帐号及安全</span>
                        </template>
                        <el-sub-menu index="4-1">
                        <template #title>用户管理</template>
                        <router-link class="routerlink" to="/index/volunteerInfo"><el-menu-item index="4-1-1"><el-icon><Memo /></el-icon>志愿者信息</el-menu-item></router-link>
                        <router-link class="routerlink" to="/index/userInfo"><el-menu-item index="4-1-2"><el-icon><Avatar /></el-icon>用户信息</el-menu-item></router-link>
                        <router-link class="routerlink" to="/index/applyVolunteerInfo"><el-menu-item index="4-1-3"><el-icon><Connection /></el-icon>志愿者申请</el-menu-item></router-link>
                        
                        </el-sub-menu>
                        <router-link class="routerlink" to="/index/administratorManage"><el-menu-item index="4-2"><el-icon><Histogram /></el-icon>管理员管理</el-menu-item></router-link>
                        <router-link class="routerlink" to="/index/updatePasswd"><el-menu-item index="4-3"><el-icon><Edit /></el-icon>修改密码</el-menu-item></router-link>
                        
                        
                    </el-sub-menu>
                    <el-menu-item index="5"  @click="logout">
                        <el-icon><Back /></el-icon>
                        <span>退出登录</span>
                    </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <!-- 结束 -->
        </el-aside>
        <el-main style="background-color: #F4F4F4;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts' setup name=''>
import { ElMessage, ElMessageBox } from 'element-plus'
function logout(){
  ElMessageBox.confirm(
    '确定要退出登陆吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      window.location.href = 'http://localhost:5172/';
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}
</script>

<style scoped>

</style>