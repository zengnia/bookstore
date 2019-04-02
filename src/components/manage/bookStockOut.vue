<template>
    <div class="bookstockout">
        <h3>书籍出库</h3>
        <!-- 已入库书籍 -->
        <el-table
            :data="tableData"
            height="400"
            style="width: 100%">
            <el-table-column label="序号">
                <template slot-scope="scope">
                    {{ scope.$index  }}
                </template>
            </el-table-column>
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
            <el-table-column label="状态">
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary" plain
                    @click="stockOut()">出库</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 书籍出库 -->
        <el-dialog
        title="出库"
        :visible.sync="dialogVisible"
        width="30%">
            
            <el-form :model="book" label-width="80px">
                <el-form-item label="书籍名称" prop="bookname" size="small">
                    <el-input v-model="book.bookname"></el-input>
                </el-form-item>
                <el-form-item label="出库数量" prop="num" size="small">
                    <el-input-number v-model="book.num" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="订单号" prop="order" size="small">
                    <el-input v-model="book.order"></el-input>
                </el-form-item>        
                <el-form-item label="书籍定价" prop="price" size="small">
                    <el-input v-model="book.price"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="intro" size="small">
                    <el-input type="textarea" v-model="book.order"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    bookname: '123',

                }
            ],
            book: {
                bookname: '',
                num: 1,
                order: '',
                price: 13,
                intro: ''
            },
            dialogVisible: false
        }
    },
    methods: {
        submit() {
            
        },
        // 出库
        stockOut() {
            this.dialogVisible = true;
        }
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