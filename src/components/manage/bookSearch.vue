<template>
    <div class="booksearch">
        <h3>书籍查询</h3>
         <!-- 书籍查询 -->
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item size="small">
                <el-input v-model="form.searchbook" placeholder="请输入书名"></el-input>
            </el-form-item>
            <el-form-item size="small">
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-button type="primary" size="small" @click="addBook">新增</el-button>                                
        </el-form>
        <el-table
            :data="tableData"
            height="410"
            style="width: 100%">
            <el-table-column label="序号" width="80">
                <template slot-scope="scope">
                    {{ scope.$index  }}
                </template>
            </el-table-column>
            <el-table-column label="书名">
                <template slot-scope="scope">
                    {{ scope.row.bookname  }}
                </template>
            </el-table-column>
            <el-table-column label="原价">
                <template slot-scope="scope">
                    {{ scope.row.price }}
                </template>
            </el-table-column>
            <el-table-column label="定价">
                <template slot-scope="scope">
                    {{ scope.row.countprice }}
                </template>
            </el-table-column>
            <el-table-column label="数量">
                <template slot-scope="scope">
                    {{ scope.row.num }}
                </template>
            </el-table-column>
            <el-table-column label="入库日期">
                <template slot-scope="scope">
                    {{ scope.row.createdate }}
                </template>
            </el-table-column>
            <el-table-column label="出库日期">
                <template slot-scope="scope">
                    {{ scope.row.saledate }}
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
        title="书籍信息"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <el-form  label-width="80px" :model="addUpdateBook">
                <el-form-item label="书名" prop="bookname">
                    <el-input v-model="addUpdateBook.bookname"></el-input>
                </el-form-item>
                <el-form-item label="原价" prop="price">
                    <el-input v-model="addUpdateBook.price"></el-input>
                </el-form-item>
                <el-form-item label="定价" prop="countprice">
                    <el-input v-model="addUpdateBook.countprice"></el-input>
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
        </el-dialog>

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
export default {
    data() {
        return {
           form: {
               searchbook: ''
           },
           tableData: [
                {
                    bookname: '11',
                    price: 12.5,
                    countprice: 6.5,
                    num: 100,
                    createdate: '2015-11-12',
                    saledate: '2015-11-20'
                }
            ],
            addUpdateBook: {
                
            },
            currentPage: 5,
            dialogVisible: false
        }
    },
    methods: {
        onSubmit() {

        },
        addBook() {
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
    }
}
</script>


<style lang="less" scoped>
.booksearch{
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