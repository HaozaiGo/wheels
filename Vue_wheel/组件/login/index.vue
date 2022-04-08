<!--
 * @Author: xiaohao
 * @Date: 2021-12-14 17:35:59
 * @LastEditTime: 2022-01-05 15:35:53
 * @LastEditors: Please set LastEditors
 * @Description: 中信环境登录 login
 * @FilePath: \vue-Mrbs-Service\src\views\login\index.vue
-->
<template>
  <div class="login_bg">
    <div class="earth">
      <!-- <img src="@/assets/login/Africa.png" alt="" srcset=""> -->
    </div>
    <div class="content">
      <div style="text-align: center" class="content_position">
        <div class="abs">
          <div>
            <img src="@/assets/login/logo1.png" alt="中信环境技术" srcset="" />
          </div>
          <div style="width: 40vw">
            <span class="title">中信环境水务运营管理系统demo</span>
          </div>
          <!-- 账号 -->
          <div class="input_row">
            <span class="headerTit">*账号</span>
            
            <el-input placeholder="请输入内容" v-model="form.username" size="large">
              <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
               <img src="@/assets/login/account.png" alt="账号" slot="prefix" style="width:20px">
            </el-input>
          </div>
          <!-- 密码 -->
          <div class="input_row">
            <span class="headerTit">*密码</span>
           
            <el-input placeholder="请输入内容" v-model="form.password" size="large" type="password">
              <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
              <img src="@/assets/login/password.png" alt="账号" slot="prefix" style="width:20px">
            </el-input>
          </div>
          <div class="checkPassWord">
            <el-checkbox v-model="checked" text-color="#000">记住密码</el-checkbox>
            <span class="forgetPass">忘记密码？</span>
          </div>
        
            <div class="loginIn">
               <img src="@/assets/login/arrow.png" alt="登录" srcset="" class="arrPosition"> 
            </div>
           
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      checked:false, //记住密码
      form:{
        username:'',
        password:'',
      }
    }
  }
};
</script>

<style lang="scss" scoped>

$base_width:45vw;



.login_bg {
  height: 100%;
  background-image: url("../../assets/login/bg1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  .content {
    float: right;
    width: $base_width;
    height: 100%;
    .content_position {
      height: 100%;
      position: relative;
      .abs {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.title {
  font-size: 36px;
  line-height: 111px;
  //  clear: both;
  color: #1079c8;
}
.el-input{
  width: 400px;
 

}
  ::v-deep .el-input__inner{
     border-radius: 20px;
  }
 ::v-deep .el-input__prefix{
  top: 10px;
  left: 8px;
}
::v-deep .el-checkbox__label{
  font-size: 14px;
  color: #424242 !important;
}

.input_row{
  margin-top: 55px;
}
.headerTit{
  color: #0494FE;
  margin-right: 15px;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 14px;
}
.checkPassWord{
  width: 380px;
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
}
.forgetPass{
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
}
.loginIn{
  margin: 10px auto;
  margin-top: 75px;
  background-color: #0091FF;
  width:55px;
  height: 55px;
  border-radius: 50%;
  cursor: pointer;
  .arrPosition{
    width: 28px;
    margin-top: 18px;
  }
}
.loginIn:hover{
   background-color: #0091ff7c;
}

.earth{
  position: absolute;
  left: -650px;
  top: -100px;
  background-image: url("../../assets/login/Africa.png");
  background-position: center;
  background-size: cover;
  display: inline-block;
  
  animation: rotation 280s linear infinite reverse;
   width: 1750px;
   height: 1450px;
//   img{
//   width: 1600px;
//   // height: 100vh;   
// }
}

@keyframes rotation {
  0% {transform: rotate(0deg);}
  100%{transform: rotate(360deg);}
}

</style>