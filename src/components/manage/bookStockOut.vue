<template>
    <div class="bookstockout">
        <h3>书籍出库</h3>
        <el-form :model="book" label-width="80px">
            <el-form-item label="书籍名称" prop="bookname" size="small">
                <el-input v-model="book.bookname" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="书籍数量" prop="num" size="small">
                <el-input-number v-model="book.num" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="订单号" prop="order" size="small">
                <el-input v-model="book.order" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="进价" prop="preprice" size="small">
                <el-input v-model="book.preprice" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="定价" prop="price" size="small">
                <el-input v-model="book.price" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="订单号" prop="order" size="small">
                <el-input v-model="book.order" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item size="small">
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            book: {
                bookname: '',
                num: 1,
                order: '',
                preprice: 23,
                price: 13,
                order: '486841'
            }
        }
    },
    methods: {
        submit() {
            
        }
    }
}
</script>


<style lang="less" scoped>
h3{
    margin-bottom: 24px;
    padding: 6px 20px;
    background-color: #f8f8f8;
}
</style>