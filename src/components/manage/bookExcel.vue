<template>
    <div class="bookexcel">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>书籍销售情况</span>
                    </div>
                    <div class="text item">
                        <div id="myEchart" :style="{width: '100%', height: '300px'}"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>书籍评价情况</span>
                    </div>
                    <div class="text item">
                        <div id="myEchart1" :style="{width: '100%', height: '300px'}"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
    data () {
        return {
            booksale: [],
            bookscore: [],
            bookname: []
        }
    },
    mounted(){
        this.drawLine();
        this.drawLine1();
        this.bookSale();
        this.bookScore();
    },
    methods: {
        // 书籍销售情况
        bookSale() {
            axios({
                url: "/api/bookSaleSearch.php",
                method: "POST"
            }).then(resp => {
                // this.tableData = resp.data;
                // console.log(resp.data);
                for (let i = 0; i < resp.data.length;i++) {
                    this.booksale.push(parseInt(resp.data[i].saleval));
                    this.bookname.push(resp.data[i].bookname);
                }
                console.log('booksale:', this.booksale, this.bookname);
            })
        },
        bookScore() {
            axios({
                url: "/api/bookSaleSearch.php",
                method: "POST"
            }).then(resp => {
                // this.tableData = resp.data;
                for (let i = 0; i < resp.data.length;i++) {
                    this.bookscore.push(parseInt(resp.data[i].bookscore));
                }
                console.log('bookscore:', this.bookscore);
            })
        },
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myEchart'))
            // 绘制图表
            myChart.setOption({
                tooltip: {},
                dataZoom: [
                    {   // 这个dataZoom组件，默认控制x轴。
                        type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                        start: 10,      // 左边在 10% 的位置。
                        end: 70         // 右边在 70% 的位置。
                    }
                ],
                xAxis: {
                    data: this.bookname
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: this.booksale
                }]
            });
        },
        drawLine1() {
            let myChart1 = this.$echarts.init(document.getElementById('myEchart1'))
            myChart1.setOption({
                series : [
                    {
                        roseType: 'angle',
                        type: 'pie',
                        radius: '60%',
                        data:[
                            {value:235, name:'百年孤独'},
                            {value:274, name:'莎士比亚戏剧选'},
                            {value:310, name:'厚黑学'},
                            {value:335, name:'白夜行'},
                            {value:400, name:'小王子'}
                        ]
                    }
                ]
            })
        }
    },
    watch:{
        dataArr(val){//监听数据发生改变 刷新图表数据
            this.drawLine();
        }
    },
}
</script>

<style lang="less" scoped>
.bookexcel{
    width: 100%;
    height: 500px;
    overflow: auto;
    display: flex;
    #myEchart{
        margin-right: 80px;
        height: 100% !important;
    }
    .el-row{
        width: 100%;
    }
    .box-card{
        width: 100%;
        height: 380px;
    }
}
</style>