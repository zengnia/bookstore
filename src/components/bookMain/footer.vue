<template>
    <div class="footer">
    <!-- 底部 -->        
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
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
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
</style>
