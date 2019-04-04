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
export default {
    data () {
        return {

        }
    },
    mounted(){
        this.drawLine();
        this.drawLine1();
    },
    methods: {
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
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
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
    }

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