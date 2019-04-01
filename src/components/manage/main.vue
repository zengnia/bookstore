<template>
    <div class="managemain">
        <el-container>
            <el-header>
                <img src="../../assets/images/logo.png" alt="">
                <router-link to="/">回到首页</router-link>
            </el-header>
            <el-container>
                <el-aside width="202px">
                    <el-menu
                    default-active="this.$route.path"
                    router
                    :default-openeds="open_list"
                    unique-opened
                    active-text-color="#4b7a7b"
                    text-color="#fff"
                    >
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item index="/manage">用户信息</el-menu-item>                            
                            <el-menu-item index="/manage/managerinfor">管理员信息</el-menu-item>                            
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>书籍管理</span>
                            </template>
                            <el-menu-item index="/manage/booksearch">书籍查询</el-menu-item>                            
                            <el-menu-item index="/manage/bookstockin">书籍入库</el-menu-item>                            
                            <el-menu-item index="/manage/bookstockout">书籍出库</el-menu-item>                            
                            <el-menu-item index="/manage/bookexcel">销售情况</el-menu-item>                            
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open_list: ["1"],        
        }
    }
}
</script>

<style lang="less" scoped>
    html, body, .managemain{
        height: 100%;
        width: 100%;
    }
    .el-header{
        background-color: cadetblue;
        display: flex;
        justify-content: space-between;
        img{
            width: 100px;
            padding: 10px 25px;
        }
        a{
            font-size: 14px;
            margin-top: 20px;
            text-decoration: none;
            color: #fff;
        }
    }
    .el-container{
        height: 100%;
        .el-aside{
            background-color: cadetblue;
            .el-menu{
                background-color: cadetblue;
                span,i{
                    color: #fff;
                }
                .el-menu-item{
                    background-color: cadetblue;  
                    color: #fff;              
                }
                .el-menu-item:hover{
                    color: #fff !important;
                    background-color: #4b7a7b !important;   
                }
                .el-submenu__title{
                    color: #fff !important;
                    background-color: #4b7a7b !important;                       
                }
            }
        }
       
    }
</style>
