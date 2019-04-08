<template>
    <div id="bookmainpage">
        <!-- 首页的内容 -->
        
        <!-- 热门书籍 -->
        <div class="hotbook">
            <el-row :gutter="18">
                <!-- 轮播图 -->
                <el-col :span="18" class="banner">
                    <el-carousel :interval="5000" arrow="always" height="324px">
                        <el-carousel-item v-for="(item, index) in dataimg" :key="index">
                            <img :src=item.image>                            
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
                <!-- 手风琴 -->
                <el-col :span="6" class="collapse">
                    <h3>书籍畅销榜</h3>
                    <el-collapse v-model="activeName" accordion>
                        <el-collapse-item :title=b.titlename :name=b.num v-for="(b, index) in books" :key="index">
                            <div class="imgprice">
                                <div>
                                    <img :src=b.image>                            
                                </div>
                                <div>
                                    <span>原价：￥{{b.price}} </span>
                                    <span class="countprice"> 现价：￥{{b.countprice}}</span>
                                    <p>{{b.introduce}}</p>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-col>
            </el-row>
        </div>
        <!-- 书籍模块 -->
        <book-module></book-module>
        <!-- 底部 -->
        <div class="footer">
            <div class="footerCont">
                <ul>
                    <li>关于我们</li>
                    <li>联系我们</li>
                    <li>加入我们</li>
                    <li>合作伙伴</li>
                    <li>
                        <img src="../../assets/images/1554716288.png" alt="">
                    </li>
                </ul>
                <p>四川师范大学计算机科学学院2015级4班曾妮&emsp;指导老师：韩鸿宇</p>
                <p>完成时间2018年4月10日</p>
            </div>
        </div>
    </div>
</template>

<script>
import BookModule from './bookModule';
export default {
    data() {
        return {
            activeName: '1',
            dataimg:[
                {image: require('../../assets/images/banner1.jpg')},
                {image: require('../../assets/images/banner2.jpg')},
                {image: require('../../assets/images/banner3.jpg')}
            ],
            books:[
                {
                    titlename: '百年孤独',
                    num: '1',
                    image: require('../../assets/images/bngd.jpg'),
                    price: 48,
                    countprice: 36,
                    introduce: '这是一条书籍简要介绍文字。' 
                },
                {
                    titlename: '大数据时代',
                    num: '2',
                    image: require('../../assets/images/dsjsd.jpg'),
                    price: 36,
                    countprice: 24,
                    introduce: '这是一条书籍简要介绍文字。'                      
                },
                {
                    titlename: '三体',
                    num: '3',
                    image: require('../../assets/images/st.jpg'),
                    price: 98,
                    countprice: 76,
                    introduce: '这是一条书籍简要介绍文字。'                     
                },
                {
                    titlename: '白夜行',
                    num: '4',
                    image: require('../../assets/images/byx.jpg'),
                    price: 48,
                    countprice: 36,
                    introduce: '这是一条书籍简要介绍文字。'                      
                }
            ]
        }
    },
    components: {
        BookModule,
    }
}
</script>

<style lang="less" scoped>
    #bookmainpage{
        width: 100%;
        margin-top: 20px;
        .hotbook{
            display: flex;
            justify-content: center;
            .el-row{
                width: 1200px;
                min-width: 1200px;
                .banner{
                    padding-left: 0;
                    padding-right: 20px;
                }
                .collapse{
                    h3{
                        margin-bottom: 10px;
                        color: cadetblue;
                    }
                    .imgprice{
                        display: flex;
                        justify-content: flex-start;
                        img{
                            margin-right: 20px;
                        }
                        span{
                            font-size: 14px;
                            display: inline-block;
                            margin-right: 10px;
                            color: #909399;
                            text-decoration:line-through;
                        }
                        .countprice{
                            font-size: 18px;
                            text-decoration:none;                            
                            color: red;
                        }
                    }
                    img{
                        width: 60px;
                    }
                }
            }
            
        }
        .footer{
            height: 200px;
            background-color: #f0f1f4;
            margin-top: 60px;
            display: flex;
            justify-content: center;
            .footerCont{
                width: 800px;
                min-width: 800px;
                ul{
                    list-style: none;
                    text-decoration: none;
                    margin-top: 30px;
                    display: flex;
                    justify-content: space-around;
                    li{
                        color: cadetblue;
                        cursor: pointer;
                        img{
                            width: 94px;
                        }
                    }
                }
                p{
                    text-align: center;
                    color: cadetblue;
                    font-size: 14px;
                    margin-top: 10px;
                }
            }
        }
    }
</style>
