<template>
    <div class="findbook">
        <!-- 分类查询书籍 -->
        <div class="searchbook">
            <div class="search">
                <el-radio-group v-model="kind" size="medium">
                    <el-radio-button label="全部" ></el-radio-button>            
                    <el-radio-button label="人文" ></el-radio-button>
                    <el-radio-button label="名著"></el-radio-button>
                    <el-radio-button label="科幻"></el-radio-button>
                    <el-radio-button label="言情"></el-radio-button>
                    <el-radio-button label="战争"></el-radio-button>
                    <el-radio-button label="教育"></el-radio-button>
                    <el-radio-button label="其他"></el-radio-button>
                </el-radio-group>
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item size="small">
                        <el-input v-model="form.searchbook" placeholder="请输入书名"></el-input>
                    </el-form-item>
                    <el-form-item size="small">
                        <el-button type="primary" @click="getBooks">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 查询到的书籍 -->
            <div class="bookshow">
                <el-row>
                    <el-col :span="4" v-for="(book, index) in books" :key="index">
                        <div @click="bookDetail(book)">
                            <div class="bookintro">
                                <img :src="require('../../../../bookstoreServer/bookImg/'+book.bookimg)">
                            </div>
                            <p>
                                <span>{{book.bookname}}</span>  
                            </p>
                            <p class="price">
                                <span>￥{{book.price}}</span>
                            </p>
                            <p>
                                <el-rate v-model="book.bookscore" disabled show-score text-color="#ff9900" score-template="{value}">
                                </el-rate>
                            </p>
                        </div>                 
                    </el-col>
                </el-row>
            </div>  
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Qs from "qs"
export default {
    data() {
        return {
            kind: '全部',
            books: [],
            form: {
                searchbook: ''
            }
        }
    },
    methods: {
         // 点击查看书籍详情
        bookDetail(book) {
            // Bus.$emit('book', book);
            this.$router.push({
                name: 'bookDetail',
                params: {
                    bookname: book.bookname,
                    price: book.price,
                    bookimg: book.bookimg,
                    intro: book.intro,
                    outnum: book.outnum,
                    salenum: book.salenum,
                    author: book.author
                }
            });
        },
        getBooks() {
            axios({
                url: "/api/allBook.php",
                method: "POST",
                data: Qs.stringify({
                  bookname: this.form.searchbook,
                  bookkind: this.kind
                })
            }).then(resp => {
                this.books = resp.data;
                for (let i = 0; i < resp.data.length; i++) {
                    resp.data[i].bookscore = parseInt(resp.data[i].bookscore);
                }
            })
        }
    },
    mounted() {
        this.getBooks();
    }
}
</script>

<style lang="less" scoped>
.findbook{
    width: 100%;
    display: flex;
    justify-content: center;
    .searchbook{
        width: 1200px;
        min-width: 1200px;
        .search{
            display: flex;
            justify-content: space-between;
            margin-top: 20px;          
        }
        .bookshow{
            margin-top: 14px;
            .el-col{
                height: 265px;
                border: 1px solid #e6e6e6;
                .bookintro{
                    border: 1px solid #e6e6e6;
                    margin: 6px;
                    display: flex;
                    justify-content: center;
                    img{
                        margin: 10px;
                    }
                }
                span{
                    margin-left: 6px;  
                    color: #555;
                    display: inline-block;
                    vertical-align: middle;
                }
                p{
                    margin-left: 6px;                    
                }
                .price{
                    font-size: 16px;
                    line-height: 30px;
                    span{
                        color: red;
                    }
                }
            }
        }
    }
}
</style>
