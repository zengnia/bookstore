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
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增修改弹框 -->
        <el-dialog
        title="管理员信息"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <el-form  label-width="80px" :model="addUpdateUser">
                <el-form-item label="编号">
                    <el-input v-model="addUpdateUser.id"></el-input>
                </el-form-item>
                <el-form-item label="管理员名">
                    <el-input v-model="addUpdateUser.username"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
        return {
            form: {
                searchuser: ''
            },
            addUpdateUser: {
                id: '',
                username: ''
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
        addUser() {
            this.dialogVisible = true;                        
        },
        handleEdit() {
            this.dialogVisible = true;            
        },
        handleDelete() {

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
        }
        .el-table{
            height: 440px;
        }
        .block{
            margin-top: 20px;
        }
    }
</style>