<template>
    <div class="bookstockin">
        <h3>书籍入库</h3>
        <el-form :model="book" label-width="80px">
            <el-form-item label="书籍名称" prop="bookname" size="small">
                <el-input v-model="book.bookname" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="书籍数量" prop="num" size="small">
                <el-input-number v-model="book.num" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="入库时间" prop="date" size="small">
                <el-date-picker
                    v-model="book.date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="入库人员" prop="username" size="small">
                <el-input v-model="book.username" disabled style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="订单号" prop="order" size="small">
                <el-input v-model="book.order" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="供货商" prop="privide" size="small">
                <el-select v-model="book.privide" placeholder="请选择">
                    <el-option
                    v-for="item in privides"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
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
                date: '2019-03-21',
                username: '张三',
                order: '15445452',
                privide: '新华文轩'
            },
            privides: []
        };
    },
    methods: {
        submit() {
            
        }
    }
}
</script>


<style lang="less" scoped>
.bookstockin{
    h3{
        margin-bottom: 24px;
        padding: 6px 20px;
        background-color: #f8f8f8;
    }
}
</style>