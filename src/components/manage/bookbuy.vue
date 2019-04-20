<template>
    <div class="booksearch">
        <h3>用户购书情况</h3>
        <el-table
            :data="tableData"
            height="410"
            style="width: 100%">
            <el-table-column label="用户名">
                <template slot-scope="scope">
                    {{ scope.row.username  }}
                </template>
            </el-table-column>
            <el-table-column label="书名">
                <template slot-scope="scope">
                    {{ scope.row.bookname  }}
                </template>
            </el-table-column>
            <el-table-column label="书籍价格">
                <template slot-scope="scope">
                    {{ scope.row.price  }}
                </template>
            </el-table-column>
            <el-table-column label="书籍数量">
                <template slot-scope="scope">
                    {{ scope.row.buynum  }}
                </template>
            </el-table-column>
            <el-table-column label="购买日期">
                <template slot-scope="scope">
                    {{ scope.row.buydate  }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary" plain
                    @click="handleDelete(scope.row)">发货</el-button>
                </template>
            </el-table-column>
        </el-table>

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
            tableData: [],
            currentPage: 5
        }
    },
    methods: {
        // 书籍购买列表
        bookList() {
            // console.log(this.form.searchbook);
            axios({
                url: "/api/bookBuyList.php",
                method: "POST"
            }).then(resp => {
                this.tableData = resp.data;
                console.log(resp.data);
            })
        },
        // 书籍下架
        handleDelete(row) {
            this.$confirm('是否出货？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    axios({
                        url: "/api/buybookOut.php",
                        method: "POST",
                        data: Qs.stringify({
                        id: row.id
                        })
                    }).then(resp => {
                        this.$message('出架成功!');
                        this.bookList();
                    })
                }).catch(() => {
            });
            
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