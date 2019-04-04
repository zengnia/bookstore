<template>
    <div class="booksearch">
        <h3>书籍下架</h3>
        <!-- 书籍查询 -->
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item size="small">
                <el-input v-model="form.searchbook" placeholder="请输入书名"></el-input>
            </el-form-item>
            <el-form-item size="small">
                <el-button type="primary" @click="bookList">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="tableData"
            height="410"
            style="width: 100%">
            <el-table-column label="书名">
                <template slot-scope="scope">
                    {{ scope.row.bookname  }}
                </template>
            </el-table-column>
            <el-table-column label="作者">
                <template slot-scope="scope">
                    {{ scope.row.author }}
                </template>
            </el-table-column>
            <el-table-column label="原价" width="100">
                <template slot-scope="scope">
                    {{ scope.row.preprice }}
                </template>
            </el-table-column>
            <el-table-column label="定价" width="100">
                <template slot-scope="scope">
                    {{ scope.row.price }}
                </template>
            </el-table-column>
            <el-table-column label="剩余数量" width="100">
                <template slot-scope="scope">
                    {{ scope.row.booknum - scope.row.outnum - scope.row.saleval }}
                </template>
            </el-table-column>
            <el-table-column label="书籍销量">
                <template slot-scope="scope">
                    {{ scope.row.saleval }}
                </template>
            </el-table-column>
            <el-table-column label="入库日期">
                <template slot-scope="scope">
                    {{ scope.row.date }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger" plain
                    @click="handleDelete(scope.row)">下架</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增修改弹框 -->
        <!-- <el-dialog
        title="书籍信息"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <el-form  label-width="80px" :model="addUpdateBook">
                <el-form-item label="书名" prop="bookname">
                    <el-input v-model="addUpdateBook.bookname"></el-input>
                </el-form-item>
                <el-form-item label="原价" prop="preprice">
                    <el-input v-model="addUpdateBook.preprice"></el-input>
                </el-form-item>
                <el-form-item label="定价" prop="price">
                    <el-input v-model="addUpdateBook.price"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="num">
                    <el-input v-model="addUpdateBook.num"></el-input>
                </el-form-item>
                <el-form-item label="入库日期" prop="createdate">
                    <el-input v-model="addUpdateBook.createdate"></el-input>
                </el-form-item>
                <el-form-item label="出库日期" prop="saledate">
                    <el-input v-model="addUpdateBook.saledate"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
        </el-dialog> -->

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
    data() {
        return {
            form: {
                searchbook: ''
            },
            tableData: [],
            addUpdateBook: {
                
            },
            currentPage: 5,
            dialogVisible: false
        }
    },
    methods: {
        // 书籍列表渲染
        bookList() {
            // console.log(this.form.searchbook);
            axios({
                url: "/api/bookSearch.php",
                method: "POST",
                data: Qs.stringify({
                  bookname: this.form.searchbook,
                  status: 2
                })
            }).then(resp => {
                this.tableData = resp.data;
                // console.log(resp.data);
            })
        },
        // 书籍下架
        handleDelete(row) {
            console.log(row.ordernum);
            axios({
                url: "/api/bookRemove.php",
                method: "POST",
                data: Qs.stringify({
                  ordernum: row.ordernum
                })
            }).then(resp => {
                this.$message('下架成功!');
                this.bookList();
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    mounted() {
        this.bookList();
    }
}
</script>


<style lang="less" scoped>
.booksearch{
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