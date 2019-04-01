<template>
    <div class="bookexcel">
        <div id="myEchart" :style="{width: '400px', height: '300px'}"></div>
        <div id="myEchart1" :style="{width: '400px', height: '300px'}"></div>
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
                title: { text: '书籍出库情况' },
                tooltip: {},
                xAxis: {
                    data: ["百年孤独","白夜行","莎士比亚戏剧选","小王子","厚黑学"]
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
                title: { text: '书籍入库情况' },                
                series : [
                    {
                        roseType: 'angle',
                        name: '访问来源',
                        type: 'pie',
                        radius: '70%',
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
    display: flex;
    #myEchart{
        margin-right: 80px;
    }
}
</style>