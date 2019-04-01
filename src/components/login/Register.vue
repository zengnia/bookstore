<template>
  <div class="login">
    <vue-particles
        color="#fff"
        :particleOpacity="0.8"
        :particlesNumber="50"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.6"
        :linesDistance="200"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi">
    </vue-particles>
    <div class="loginBox">
      <h2>用户注册</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
        <el-form-item prop="user" label="用户名">
          <el-input placeholder="请输入用户名" v-model="loginForm.user" clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称">
          <el-input placeholder="请输入昵称" v-model="loginForm.nickname" clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input placeholder="请输入邮箱" v-model="loginForm.email" clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd" label="密码">
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.pwd" clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwdagain" label="确认密码">
          <el-input type="password" placeholder="请再次输入密码" v-model="loginForm.pwdagain" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs"
export default {
  name: 'login',
  components: {
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.loginForm.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        user: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        pwdagain: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ]
      },
      loginForm: {
        user: '',
        nickname: '',
        email: '',
        pwd: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          axios({
              url: "/api/userReg.php",
              method: "POST",
              data: Qs.stringify({
                  username: this.loginForm.user,
                  nickname: this.loginForm.nickname,
                  email: this.loginForm.email,
                  password: this.loginForm.pwd
              })
          }).then(resp => {
            // console.log(resp.data);
            
            if (resp.data == 'suc') {
              // this.$message('注册成功');
              this.$router.push({path: '/login'});            
            }
          })
        } else {
          // alert('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="less">
.login{
    background-color: cadetblue;
    position: relative;
    width: 100%;
    height: 100%;
    .loginBox{
      width: 620px;
      height: 640px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      h2{
       border-bottom: 1px solid #fff;
       font-weight: 100; 
       color: #fff; 
       padding: 14px;
      }
      .el-form{
        margin-top: 20px;
        margin-left: 10%;
        width: 80%;
        .el-form-item{
            margin-bottom: 0;
            .el-input{
                margin-top: 20px;
            }
            .el-form-item__label{
                color: #fff !important;
                line-height: 80px !important;
            }
            .el-button{
                width: 100%;
                margin-top: 20px;
                
            }
        }
        
      }
    }
  }
</style>

