<template>
    <div id="bookmain">
        <!-- 通用导航模块 -->

        <!-- 顶部导航栏(登录注册) -->
        <div class="header">
            <div class="header-container">
                <img src="../../assets/images/logo.png" alt="logo">
                <div class="login-regist">
                    <el-button type="text" v-show="!this.$store.state.isLogin">
                        <router-link to="/login">登录</router-link>
                    </el-button>
                    <el-button type="text" v-show="!this.$store.state.isLogin">
                        <router-link to="/register">注册</router-link>
                    </el-button>
                    <span v-show="this.$store.state.isLogin"> 你好！{{this.$store.state.currentUser}} </span>                    
                    <el-button type="text" v-show="this.$store.state.isLogin" @click="back">退出登录</el-button>
                    <el-button type="text" v-show="showManage">
                        <router-link to="/manage"> 管理员入口 </router-link>                        
                    </el-button>
                </div>
            </div>
        </div>
        <!-- 副导航栏 -->
        <div class="menu">
            <el-menu :default-active="this.$route.path" router mode="horizontal">
                <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                    {{ item.navItem }}
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 首页内容 -->
        <router-view></router-view>
    </div>      
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1',
            navList:[
                {name:'/',navItem:'首页'},
                {name:'/findBook',navItem:'书籍一览'},
                {name:'/personCenter',navItem:'个人中心'},
            ],
            showManage: false,
            username: ''
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //   判断是否登录
      isLogin() {
          if (sessionStorage.getItem('userName')&&sessionStorage.getItem('userToken')) {
              this.$store.commit('userStatus', sessionStorage.getItem('userName'));
              this.username = this.$store.state.currentUser;
            //   console.log(this.username);
          } else {
              this.$store.commit('userStatus', null);
          }
          return this.$store.getters.isLogin;
      },
        
      managerEnter() {
          if(this.$store.state.token === '1') {
            this.$store.commit('userStatus', sessionStorage.getItem('userToken'));              
            this.showManage = true;
            // console.log('1',this.showManage);  
            this.isLogin();          
          }
        //   console.log(this.$store.state.token);
      },

      // 退出登录
      back() {
          sessionStorage.setItem("userName", null);
          sessionStorage.setItem("userToken", '');
          this.$router.push('/login');
      }

    },
    mounted() {
        this.managerEnter();
        this.isLogin();
    },
    components: {
    }
}
</script>

<style lang="less" scoped>
    #bookmain{
       .header{
           width: 100%;
           height: 40px;
           background-color: #000;
           opacity: 0.4;
           display: flex;
           justify-content: center;
           z-index: 999;
           position: fixed;
           top: 0;
           left: 0;
           .header-container{
               width: 1200px;
               min-width: 1200px;
               display: flex;
               justify-content: space-between;
               .el-button{
                   a{
                       color: cadetblue;
                   }
               }
               span{
                    color: #fff;                   
               }
           }
       }
       .menu{
           width: 100%;
           margin-top: 40px;
           display: flex;
           justify-content: center;
           border-bottom: 1px solid #e6e6e6;
           .el-menu{
               width: 1200px;
               min-width: 1200px;
               border: none;
           }
       }
       img{
           width: 100px;
       } 
    }

</style>
