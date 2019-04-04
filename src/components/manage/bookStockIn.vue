<template>
    <div class="bookstockin">
        <h3>书籍入库</h3>
        <el-form :model="book" label-width="80px">
            <el-form-item label="书籍名称" prop="bookname" size="small">
                <el-input v-model="book.bookname" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="书籍作者" prop="author" size="small">
                <el-input v-model="book.author" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="入库数量" prop="num" size="small">
                <el-input-number v-model="book.num" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="书籍进价" prop="preprice" size="small">
                <el-input v-model="book.preprice" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="入库时间" prop="date" size="small">
                <el-input v-model="book.date" disabled style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="入库人员" prop="username" size="small">
                <el-input v-model="book.username" disabled style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="订单号" prop="order" size="small">
                <el-input v-model="book.order" disabled style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item label="书籍分类" prop="kind" size="small">
                <el-select v-model="book.kind" placeholder="请选择">
                    <el-option
                    v-for="item in kinds"
                    :key="item.value"
                    :label="item.value"
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
import axios from "axios";
import Qs from "qs"
export default {
    data() {
        return {
            book: {
                bookname: '',
                num: 1,
                author: '',
                preprice: 0,
                date: '',
                username: '',
                order: '',
                kind: ''
            },
            kinds: [
                {id: 0, value: '人文'},
                {id: 1, value: '名著'},
                {id: 2, value: '科幻'},
                {id: 3, value: '言情'},
                {id: 4, value: '战争'},
                {id: 5, value: '教育'},
                {id: 6, value: '其他'},
            ]
        };
    },
    methods: {
        submit() {
            axios({
                url: "/api/bookStockIn.php",
                method: "POST",
                data: Qs.stringify({
                  bookname: this.book.bookname,
                  booknum: this.book.num,
                  author: this.book.author,
                  preprice: this.book.preprice,
                  date: this.book.date,
                  user: this.book.username,
                  ordernum: this.book.order,
                  bookkind: this.book.kind
                })
            }).then(resp => {
                this.$confirm('是否继续入库书籍?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'primary'
                    }).then(() => {
                        this.getOrder();
                        this.book.bookname = '';
                        this.book.num = 1;
                        this.book.preprice = 0;
                        this.book.author = '';
                    }).catch(() => {
                        this.$router.push({path: '/manage/bookStockOut'});
                    });
                // console.log(resp.data);
            })
        },
        // 获取时间，随机订单号和入库人员
        getOrder() {
            var timestamp = (new Date()).getTime();
            this.book.order = timestamp;
            this.book.username = this.$store.state.currentUser;
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDay();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let seconds = date.getSeconds();
            if (month < 10) {
                month = '0' + month;
            } 
            if (day < 10) {
                day = '0' + day;
            }
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (seconds < 10) {;
                seconds = '0' + seconds
            }
            this.book.date = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds;
        }
    },
    mounted() {
        this.getOrder();
    }
}
</script>


<style lang="less" scoped>
.bookstockin{
    h3{
        margin-bottom: 24px;
        padding: 6px 20px;
        background-color: #f8f8f8;
        color: #8c8c8c;
    }
}
</style>