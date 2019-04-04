<template>
    <div class="bookstockout">
        <h3>书籍出库</h3>
        <!-- 分类查询 -->
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item size="small">
                <el-input v-model="form.searchbook" placeholder="请输入书名"></el-input>
            </el-form-item>
            <el-form-item size="small">
                <el-select v-model="form.status" placeholder="请选择书籍状态">
                    <el-option
                    v-for="item in statuses"
                    :key="item.status"
                    :label="item.status"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="small">
                <el-button type="primary" @click="bookList">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 已入库书籍 -->
        <el-table
            :data="tableData"
            height="400"
            style="width: 100%">
            <el-table-column label="书籍名">
                <template slot-scope="scope">
                    {{ scope.row.bookname  }}
                </template>
            </el-table-column>
            <el-table-column label="书籍类别">
                <template slot-scope="scope">
                    {{ scope.row.bookkind  }}
                </template>
            </el-table-column>
            <el-table-column label="书籍进价">
                <template slot-scope="scope">
                    {{ scope.row.preprice  }}
                </template>
            </el-table-column>
            <el-table-column label="入库数量">
                <template slot-scope="scope">
                    {{ scope.row.booknum }}
                </template>
            </el-table-column>
            <el-table-column label="订单号">
                <template slot-scope="scope">
                    {{ scope.row.ordernum }}
                </template>
            </el-table-column>
            <el-table-column label="作者">
                <template slot-scope="scope">
                    {{ scope.row.author }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status=='1'" size="mini" type="primary" plain @click="stockOut(scope.row)">出库</el-button>
                    <span v-else-if="scope.row.status=='2'">已上架</span>
                </template>
            </el-table-column>
        </el-table>

        <!-- 书籍出库 -->
        <el-dialog
        title="上架"
        :visible.sync="dialogVisible"
        width="30%">
            <el-form :model="book" label-width="80px">
                <el-form-item label="书籍名称" prop="bookname" size="small">
                    <el-input disabled v-model="book.bookname"></el-input>
                </el-form-item>
                <el-form-item label="出库数量" prop="num" size="small">
                    <el-input-number v-model="book.num" :max="this.book.booknum"></el-input-number>
                </el-form-item>
                <el-form-item label="书籍进价" prop="preprice" size="small">
                    <el-input disabled v-model="book.preprice"></el-input>
                </el-form-item>
                <el-form-item label="订单号" prop="ordernum" size="small">
                    <el-input disabled v-model="book.ordernum"></el-input>
                </el-form-item>        
                <el-form-item label="书籍定价" prop="price" size="small">
                    <el-input v-model="book.price"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="intro" size="small">
                    <el-input type="textarea" v-model="book.intro"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="stockOutCancel">取 消</el-button>
                <el-button type="primary" @click="stockOutOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
import Qs from "qs"
export default {
    data() {
        return {
            form: {
                searchbook: '',
                status: ''
            },
            statuses: [
                {id: 2, status: '已上架'},
                {id: 1, status: '未上架'}
            ],
            tableData: [],
            book: {
                bookname: '',
                num: 1,
                author: '',
                ordernum: '',
                booknum: 0,
                preprice: 0,
                price: 0,
                intro: ''
            },
            dialogVisible: false
        }
    },
    methods: {
        // 书籍列表渲染
        bookList() {
            axios({
                url: "/api/bookSearch.php",
                method: "POST",
                data: Qs.stringify({
                  bookname: this.form.searchbook,
                  status: this.form.status
                })
            }).then(resp => {
                this.tableData = resp.data;
                console.log(resp.data);
            })
        },
        // 上架弹框        
        stockOut(row) {
            this.book.bookname = row.bookname;
            this.book.ordernum = row.ordernum;
            this.book.preprice = parseFloat(row.preprice);
            this.book.booknum = parseInt(row.booknum);
            console.log(this.book);
            this.dialogVisible = true;
        },
        // 确认上架书籍
        stockOutOk() {
            axios({
                url: "/api/bookStockOut.php",
                method: "POST",
                data: Qs.stringify({
                  outnum: this.book.num,
                  ordernum: this.book.ordernum,
                  price: this.book.price,
                  intro: this.book.intro
                })
            }).then(resp => {
                // this.tableData = resp.data;
                if (resp.data === 'suc') {
                    this.bookList();
                    this.$message('上架成功');              
                }
                // console.log(resp.data);
            })
            this.dialogVisible = false;
        },
        // 取消上架书籍
        stockOutCancel() {
            this.dialogVisible = false;            
        }
    },
    mounted() {
        this.bookList();
    }
}
</script>


<style lang="less" scoped>
h3{
    margin-bottom: 24px;
    padding: 6px 20px;
    background-color: #f8f8f8;
    color: #8c8c8c;
}
</style>