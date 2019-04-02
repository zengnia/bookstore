<template>
    <div class="userinfor">
        <h3>用户管理</h3>
        <!-- 查询用户 -->
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item size="small">
                <el-input v-model="form.searchuser" placeholder="查询用户"></el-input>
            </el-form-item>
            <el-form-item size="small">
                <el-button type="primary" @click="userList">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 用户表格 -->
        <el-table
            :data="tableData"
            height="400"
            style="width: 100%">
            <el-table-column label="序号">
                <template slot-scope="scope">
                    {{ scope.$index  }}
                </template>
            </el-table-column>
            <el-table-column label="用户名">
                <template slot-scope="scope">
                    {{ scope.row.username  }}
                </template>
            </el-table-column>
            <el-table-column label="邮箱">
                <template slot-scope="scope">
                    {{ scope.row.email  }}
                </template>
            </el-table-column>
            <el-table-column label="昵称">
                <template slot-scope="scope">
                    {{ scope.row.nickname  }}
                </template>
            </el-table-column>
            <el-table-column label="创建日期">
                <template slot-scope="scope">
                    {{ scope.row.createdate }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.userid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>  

        <!-- 分页 -->
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Qs from "qs"
export default {
    data () {
        return {
            form: {
                searchuser: ''
            },
            tableData: [],
            currentPage: 5
        }
    },
    methods: {
        // 用户信息渲染
        userList() {
            axios({
                url: "/api/userInfo.php",
                method: "POST",
                data: Qs.stringify({
                  username: this.form.searchuser
                })
            }).then(resp => {
                this.tableData = resp.data;
                // console.log(resp.data);
            })
        },
        handleEdit() {
            this.dialogVisible = true;            
        },
        // 删除用户
        handleDelete(id) {
            this.$confirm('是否继确认删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    axios({
                        url: "/api/userDel.php",
                        method: "POST",
                        data: Qs.stringify({
                        userid: id
                        })
                    }).then(resp => {
                        if (resp.data == 'suc') {
                            this.userList();                            
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })
                }).catch(() => {});
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    mounted() {
        this.userList();
    }
}
</script>


<style lang="less" scoped>
    .userinfor{
        h3{
            margin-bottom: 24px;
            padding: 6px 20px;
            background-color: #f8f8f8;
            color: #8c8c8c;
        }
        .el-table{
            height: 440px;
        }
        .block{
            margin-top: 20px;
        }
    }
</style>