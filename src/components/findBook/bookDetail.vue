<template>
    <div class="bookDetail">
        <div class="detail-cont">
            <div class="booksale">
                <div class="bookImg">    
                </div>
                <div class="bookIntro">
                    <h4>百年孤独</h4>
                    <p class="price">原价： <span>￥37</span></p>
                    <p>现价： <span>￥27</span></p>
                    <p>数量： 
                        <el-input-number v-model="num" size="mini" :min="1" label="数量"></el-input-number>
                    </p>
                    <p>库存： <span>30</span></p>
                    <el-button type="primary" size="large">加入购物车</el-button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 1
        };
    }
};
</script>

<style lang="less" scoped>
.bookDetail{
    display: flex;
    justify-content: center;
    margin-top: 40px;    
    .bookname{
        font-size: 18px;
    }
    .detail-cont{
        width: 1200px;
        min-width: 1200px;
        display: flex;
        justify-content: space-between;
        .booksale{
            width: 800px;
            border: 1px solid #999;
            display: flex;
            .bookImg{
                width: 300px;
                height: 380px;
                margin: 10px;
                border: 1px solid #999;
            }
            .bookIntro{
                margin-left: 40px;
                margin-top: 10px;
                h4{
                    font-size: 20px;
                    font-weight: 100;
                    color: #666;
                    padding: 0;
                }
                p{
                    color: #666;
                    margin-top: 16px;
                }
                .price{
                    text-decoration: line-through;
                }
                .el-button{
                    margin-top: 20px;
                }
            }
        }
        
    }
}
</style>
