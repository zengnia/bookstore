<template>
    <div class="bookmodule">
        <div class="book">
            <!-- 书籍展示 -->
            <!-- 热门书籍 -->
            <div class="moduleheader">
                <h3>热门书籍</h3>
                <a href="#">> 更多</a>
            </div>
            <div class="modulecontent">
                <el-row>
                    <el-col :span="4" v-for="(book, index) in books" :key="index">
                        <div @click="bookDetail(book)">
                            <div class="bookintro">
                                <img :src="require('../../../../bookstoreServer/bookImg/'+book.bookimg)" alt="">
                            </div>
                            <p>
                                <i class="hot"></i>
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
            <!-- 好评入流 -->
            <div class="moduleheader">
                <h3>好评入流</h3>
                <a href="#">> 更多</a>
            </div>
            <div class="modulecontent">
                <el-row>
                    <el-col :span="4" v-for="(book, index) in goodbooks" :key="index">
                        <div @click="bookDetail(book)">
                            <div class="bookintro">
                                <img :src="require('../../../../bookstoreServer/bookImg/'+book.bookimg)" alt="">
                            </div>
                            <p>
                                <i class="hot"></i>
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
            <!-- 新书一览 -->
            <div class="moduleheader">
                <h3>新书一览</h3>
                <a href="#">> 更多</a>
            </div>
            <div class="modulecontent">
                <el-row>
                    <el-col :span="4" v-for="(book, index) in newbooks" :key="index">
                        <div @click="bookDetail(book)">
                            <div class="bookintro">
                                <img :src="require('../../../../bookstoreServer/bookImg/'+book.bookimg)" alt="">
                            </div>
                            <p>
                                <i class="hot"></i>
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
            <!-- 好书推荐 -->
            <div class="moduleheader">
                <h3>好书推荐</h3>
                <a href="#">> 更多</a>
            </div>
            <div class="modulecontent">
                <el-row>
                    <el-col :span="4" v-for="(book, index) in groombooks" :key="index">
                        <div @click="bookDetail(book)">
                            <div class="bookintro">
                                <img :src="require('../../../../bookstoreServer/bookImg/'+book.bookimg)" alt="">
                            </div>
                            <p>
                                <i class="hot"></i>
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
import Bus from "../../assets/js/Bus.js";
import axios from "axios";
import Qs from "qs"
export default {
    data() {
        return {
            books: [
                {bookimg: 'bngd.jpg', bookname: '百年孤独',price: 0,bookscore: 5}
            ],
            goodbooks: [
                {bookimg: 'bngd.jpg', bookname: '百年孤独',price: 0,bookscore: 5}
            ],
            newbooks: [
                {bookimg: 'bngd.jpg', bookname: '百年孤独',price: 0,bookscore: 5}
            ],
            groombooks: [
                {bookimg: 'bngd.jpg', bookname: '百年孤独',price: 0,bookscore: 5}
            ]
        };
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
        // 热门书籍渲染
        hotBookList() {
            axios({
                url: "/api/hotbook.php",
                method: "POST",
            }).then(resp => {
                this.books = resp.data;
                for (let i = 0; i < resp.data.length; i++) {
                    resp.data[i].bookscore = parseInt(resp.data[i].bookscore);
                }
            })
        },
        // 好评入流渲染
        goodBookList() {
            axios({
                url: "/api/goodbook.php",
                method: "POST",
            }).then(resp => {
                this.goodbooks = resp.data;
                for (let i = 0; i < resp.data.length; i++) {
                    resp.data[i].bookscore = parseInt(resp.data[i].bookscore);
                }
            })
        },
        // 新书一览渲染
        newBookList() {
            axios({
                url: "/api/newbook.php",
                method: "POST",
            }).then(resp => {
                this.newbooks = resp.data;
                for (let i = 0; i < resp.data.length; i++) {
                    resp.data[i].bookscore = parseInt(resp.data[i].bookscore);
                }
            })
        },
        // 好书推荐渲染
        groomBookList() {
            axios({
                url: "/api/groombook.php",
                method: "POST",
            }).then(resp => {
                this.groombooks = resp.data;
                for (let i = 0; i < resp.data.length; i++) {
                    resp.data[i].bookscore = parseInt(resp.data[i].bookscore);
                }
            })
        },
    },
    mounted() {
        this.hotBookList();
        this.goodBookList();
        this.newBookList();
        this.groomBookList();
    }
}
</script>

<style lang="less" scoped>
    .bookmodule{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .book{
        width: 1200px;
        min-width: 1200px;
        color: #fff;
        .moduleheader{
            display: flex;
            justify-content: space-between;
            padding: 30px 0 0 0;
            border-bottom: 1px solid #e6e6e6;
            h3{
                padding:4px 14px;
                background-color: cadetblue;
            }      
            a{
              text-decoration: none;
              color: cadetblue;       
            }
        }
        .modulecontent{
            .el-col{
                height: 265px;
                border: 1px solid #e6e6e6;
                border-top: none;
                .bookintro{
                    border: 1px solid #e6e6e6;
                    margin: 6px;
                    display: flex;
                    justify-content: center;
                    img{
                        margin: 10px;
                    }
                }
                .hot{
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    vertical-align: middle;                
                    background: url('../../assets/images/hot.png')no-repeat;
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
</style>
