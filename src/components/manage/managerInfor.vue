<template>
    <div class="managerinfor">
        <h3>管理员管理</h3>
         <!-- 查询用户 -->
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item size="small">
                <el-input v-model="form.searchuser" placeholder="查询管理员"></el-input>
            </el-form-item>
            <el-form-item size="small">
                <el-button type="primary" @click="managerList">查询</el-button>
            </el-form-item>
            <el-button type="primary" size="small" @click="addUser">新增</el-button>                                
        </el-form>
        <!-- 用户表格 -->
        <el-table
            :data="tableData"
            height="410"
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
                    type="primary"
                    @click="handleEdit(scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.userid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增修改弹框 -->
        <el-dialog
        title="管理员信息"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <el-form  label-width="80px" :model="addUpdateUser" :rules="rules" ref="addUpdateUser">
                <el-form-item label="编号" prop="userid" v-show="false">
                    <el-input v-model="addUpdateUser.userid"></el-input>
                </el-form-item>
                <el-form-item label="管理员名" prop="username">
                    <el-input :disabled="managerName(addUpdateUser.userid)" v-model="addUpdateUser.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="addUpdateUser.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUpdateUser.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addUpdateUser.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pwdagain">
                    <el-input type="password" v-model="addUpdateUser.pwdagain"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addOrUpdateCancel">取 消</el-button>
                    <el-button type="primary" @click="addOrUpdateOk(addUpdateUser.userid)">确 定</el-button>
                </span>
        </el-dialog>

        <!-- 分页 -->
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
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
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.addUpdateUser.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            form: {
                searchuser: ''
            },
            addUpdateUser: {
                userid: '',
                username: '',
                nickname: '',
                email: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入管理员名称', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
                pwdagain: [
                    { validator: validatePass, required: true, trigger: 'blur' }
                ]
            },
            tableData: [],
            currentPage: 5,
            dialogVisible: false            
        }
    },
    methods: {
        // 管理员列表渲染
        managerList() {
            axios({
                url: "/api/managerInfo.php",
                method: "POST",
                data: Qs.stringify({
                  username: this.form.searchuser
                })
            }).then(resp => {
                this.tableData = resp.data;
                // console.log(resp.data);
            })
        },
        // 管理员名的禁用
        managerName(id) {
            if(id){
                return true;
            }else{
                return false;
            }
        },
        // 打开新增管理员弹框
        addUser() {
            this.addUpdateUser = {};
            this.dialogVisible = true;   
        },
        // 打开修改管理员弹框
        handleEdit(row) {
            this.dialogVisible = true;
            axios({
                url: "/api/managerSearch.php",
                method: "POST",
                data: Qs.stringify({
                    userid: row.userid
                })
            }).then(resp => {
                this.addUpdateUser = resp.data;
                this.addUpdateUser.pwdagain = resp.data.password;
            })
        },
        // 取消新增或修改
        addOrUpdateCancel() {
            this.dialogVisible = false;
            this.$refs.addUpdateUser.resetFields();
        },
        // 确认新增或修改
        addOrUpdateOk(id) {
            if(id){
                // 修改
                this.$refs.addUpdateUser.validate((valid) => {
                    if (valid) {
                        axios({
                            url: "/api/managerUpdate.php",
                            method: "POST",
                            data: Qs.stringify({
                                userid: this.addUpdateUser.userid,
                                nickname: this.addUpdateUser.nickname,
                                email: this.addUpdateUser.email,
                                password: this.addUpdateUser.password
                            })
                        }).then(resp => {
                            if (resp.data === "suc") {
                                this.$message('修改成功！');
                                this.dialogVisible = false;
                                this.$refs.addUpdateUser.resetFields();
                                this.managerList();
                            }
                        })
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }else{
                // 新增
                this.$refs.addUpdateUser.validate((valid) => {
                    if (valid) {
                        axios({
                            url: "/api/managerAdd.php",
                            method: "POST",
                            data: Qs.stringify({
                                username: this.addUpdateUser.username,
                                nickname: this.addUpdateUser.nickname,
                                email: this.addUpdateUser.email,
                                password: this.addUpdateUser.password,
                            })
                        }).then(resp => {
                            // console.log(resp.data);
                            if(resp.data === 'suc') {
                                this.dialogVisible = false;
                                this.$refs.addUpdateUser.resetFields();
                                this.managerList();
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        },
        // 删除管理员
        handleDelete(id) {
            this.$confirm('是否确认删除该用户?', '提示', {
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
                            this.managerList();                            
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
        this.managerList();
    }
}
</script>


<style lang="less" scoped>
    .managerinfor{
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