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
      <h2>用户登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" v-model="loginForm.username" clearable>
            <i slot="prefix" class="el-input__icon el-icon-date"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" clearable>
            <i slot="prefix" class="el-input__icon el-icon-goods"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
      <button class="register" @click="register">立即注册</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs"

// import {req} from '../../req/req.js';
export default {
  name: 'login',
  components: {
  },
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
      },
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          axios({
              url: "/api/userLogin.php",
              method: "POST",
              data: Qs.stringify({
                  username: this.loginForm.username,
                  password: this.loginForm.password
              })
          }).then(resp => {
            if (resp.data !== "") {
              console.log(resp.data);
              sessionStorage.setItem("userName", resp.data.nickname);
              sessionStorage.setItem("userToken", resp.data.usertype);
              this.$store.dispatch('setUser', resp.data.nickname);
              this.$store.dispatch('setToken', resp.data.usertype);
              // console.log(this.$store.state.token);
              this.$router.push({path: '/'});
            } else {
              this.$message('账号或密码错误');
            }
          })
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },
    register() {
      this.$router.push({path: '/register'});      
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    background-color: cadetblue;
    position: relative;
    .loginBox{
      width: 420px;
      height: 380px;
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
          margin-bottom: 23px;
        }
        .el-input{
          margin-top: 20px;
        }
        .el-button{
          width: 100%;
          margin-top: 20px;
        }
      }
      .register{
        background: none;
        border: none;
        color: #fff;
        margin-left: 43%;
        font-size: 14px;
      }
    }
  }
</style>
