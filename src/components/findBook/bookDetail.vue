<template>
    <div class="bookDetail">
        <div class="detail-cont">
            <div class="booksale">
                <div class="bookImg">  
                    <img :src="require('../../../../bookstoreServer/bookImg/'+bookdetail.bookimg)" alt="">                    
                </div>
                <div class="bookIntro">
                    <h4>{{bookdetail.bookname}}</h4>
                    <p>作者： <span>{{bookdetail.author}}</span></p>
                    <p>作品简介： {{bookdetail.intro}}</p>
                    <p class="price">价格： <span>￥{{bookdetail.price}}</span></p>
                    <p>数量： 
                        <el-input-number v-model="bookdetail.booknum" size="mini" :min="1" label="数量"></el-input-number>
                    </p>
                    <p>库存： <span>{{bookdetail.outnum - bookdetail.saleval}}</span></p>
                    <el-button type="primary" size="large" @click="buycar">加入购物车</el-button>
                    <el-button type="warning" size="large" @click="collection">收藏</el-button>
                </div>
            </div>
        </div>
        <!-- 书籍评价 -->
        <div class="remark">
            <el-input
            type="textarea"
            :rows="4"
            placeholder="请对书籍进行评价"
            v-model="remark">
            </el-input>
            <div class="setscore">
                <el-rate
                v-model="bookscore"
                show-text>
                </el-rate>
                <el-button type="primary" size="small" @click="publish">发表</el-button>
            </div>
            <div class="moreremark">
                <h3>更多评价</h3>
            </div>
            <div class="remarkcont" v-for="(remark, index) in remarks" :key="index">
                <div>
                    <p class="user">{{remark.username}}</p>
                    <p class="userremark">{{remark.remarkcont}}</p>
                </div>
                <div class="remarkright">
                    <span>{{remark.remarkdate}}</span>
                    <p>满意度：<span class="bookscore">{{remark.bookscore}}</span></p>                
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
    data() {
        return {
            num: '',
            bookscore: null,
            remark: '',
            bookdetail: {
                bookname: '百年孤独',
                price: '24',
                booknum: '',
                outnum: '102',
                saleval: '12',
                bookimg: ''
            },
            remarks: [
                {username: '张三', remarkcont: '123', remarkdate: '2019-04-22', bookscore: 4}
            ]
        };
    },
    methods: {
        // 获取书籍详细信息
        getBook() {
            // console.log(this.$route.params.bookimg);
            this.bookdetail.bookname = this.$route.params.bookname;
            this.bookdetail.price = this.$route.params.price;
            this.bookdetail.bookimg = this.$route.params.bookimg;
            this.bookdetail.intro = this.$route.params.intro;
            this.bookdetail.outnum = this.$route.params.outnum;
            this.bookdetail.salenum = this.$route.params.salenum;
            this.bookdetail.author = this.$route.params.author;
        },
        // 加入购物车
        buycar() {
            // console.log(this.bookdetail, this.$store.state.currentUser);
            if (this.$store.state.currentUser !== null) {
                axios({
                    url: "/api/addBuycar.php",
                    method: "POST",
                    data: Qs.stringify({
                    bookname: this.bookdetail.bookname,
                    price: this.bookdetail.price,
                    username: this.$store.state.currentUser,
                    buynum: this.bookdetail.booknum,
                    buystatus: 1
                })
                }).then(resp => {
                    console.log(resp.data);
                    if(resp.data == 'suc') {
                        this.$message('添加成功');
                    }
                })
            } else {
                this.$message('请先登录');
            }
        },
        // 收藏
        collection() {
            if (this.$store.state.currentUser !== null) {
                axios({
                    url: "/api/addBuycar.php",
                    method: "POST",
                    data: Qs.stringify({
                        bookname: this.bookdetail.bookname,
                        price: this.bookdetail.price,
                        username: this.$store.state.currentUser,
                        buynum: this.bookdetail.booknum,
                        buystatus: 2
                    })
                }).then(resp => {
                    // console.log(resp.data);
                    if(resp.data == 'suc') {
                        this.$message('添加成功');
                    }
                })
            } else {
                this.$message('请先登录');                
            }
        },
        // 发布
        publish() {
            axios({
                url: "/api/publishRemark.php",
                method: "POST",
                data: Qs.stringify({
                    username: this.$store.state.currentUser,
                    bookname: this.bookdetail.bookname,
                    bookscore: this.bookscore,
                    remarkcont: this.remark
                })
            }).then(resp => {
                console.log(resp.data);
                if (resp.data == "suc") {
                    this.$message('发布成功！');
                    this.getRemark();
                }
                // this.remarks = resp.data;
            })
        },
        // 获取评论
        getRemark() {
            axios({
                url: "/api/getRemark.php",
                method: "POST",
                data: Qs.stringify({
                    bookname: this.bookdetail.bookname
                })
            }).then(resp => {
                // console.log(resp.data);
                this.remarks = resp.data;
            })
        }
    },
    mounted() {
        this.getBook();
        this.getRemark();
    }
};
</script>

<style lang="less" scoped>
.bookDetail{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;    
    .bookname{
        font-size: 18px;
    }
    .detail-cont{
        width: 1200px;
        min-width: 1200px;
        display: flex;
        justify-content: space-between;
        .booksale{
            width: 1200px;
            border: 1px solid #e0e1e4;
            display: flex;
            .bookImg{
                width: 300px;
                height: 340px;
                margin: 10px;
                border: 1px solid #e0e1e4;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .bookIntro{
                margin-left: 40px;
                // margin-top: 10px;
                h4{
                    font-size: 26px;
                    font-weight: 100;
                    color: #666;
                    padding: 0;
                    margin: 20px 0;
                }
                p{
                    color: #666;
                    margin-top: 16px;
                }
                .el-button{
                    margin-top: 20px;
                }
            }
        }
        
    }
    .moreremark{
            padding: 30px 0 0 0;
            border-bottom: 1px solid #e6e6e6;
            h3{
                color: #fff;
                padding:4px 14px;
                background-color: cadetblue;
            }      
    }
    .remark{
        width: 1200px;
        min-width: 1200px;
        margin-top: 30px;
        .setscore{
            margin-top: 10px;
            .el-rate{
                margin-top: 10px;
            }
            display: flex;
            justify-content: space-between;
        }
        .remarkcont{
            border: 1px solid #e0e1e4;
            padding: 10px;
            color: #555;
            display: flex;
            justify-content: space-between;
            &:not(:last-of-type){
                border-bottom: none;
            }
            .user{
                font-size: 18px;
            }
            .userremark{
                font-size: 14px;
                color: #999;
                margin: 20px 0;
            }
            .remarkright{
                width: 160px;
                margin-top: 20px;
                font-size: 14px;
                line-height: 30px;
                .bookscore{
                    color: #fb0;
                    font-size: 18px;
                }
                p{
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
