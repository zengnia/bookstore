<template>
    <div class="bookmodule">
        <div class="book">
            <!-- 书籍展示 -->
            <div class="moduleheader">
                <h3>热门书籍</h3>
                <a href="#">> 更多</a>
            </div>
            <div class="modulecontent">
                <el-row>
                    <el-col :span="4">
                        <div @click="bookDetail">
                            <div class="bookintro">
                                <img src="../../assets/images/book1.jpg" alt="">
                            </div>
                            <p>
                                <i class="hot"></i>
                                <span>百年孤独</span>  
                            </p>
                            <p class="price">
                                <span>￥38</span>
                                <span>￥45</span>
                            </p>
                        </div>                 
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    methods: {
        bookDetail() {
            
            this.$router.push('/bookDetail');
        }
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
                height: 260px;
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
                    margin: 6px;                    
                }
                .price{
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                }
                .price :first-child{
                    color: red;
                    font-size: 20px;
                }
                .price :last-child{
                    text-decoration: line-through;
                    font-size: 16px;
                    color: #d2d2d2;
                    line-height: 32px;
                }
            }
        }
    }
</style>
