
import React from 'react'
import ReactEcharts from 'echarts-for-react'


function StackedChart2({ xAxis, data, title, xAxisName, yAxisName, data3xx, data5xx }) {

    const option = {
        legend: {
            orient: 'vertical',
            x: 'right',
            top: 'center',
        },
        title: {
            text: title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },

        xAxis: {
            name: xAxisName,
            nameLocation: "middle",
            nameGap: 30,
            type: 'category',
            data: xAxis,
            boundaryGap: false,
        },
        yAxis: {
            name: yAxisName,
            nameGap: 30,
            nameLocation: "middle",
            type: 'value'
        },

        series: [
            {
                name: '3xx',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                showSymbol: false,
                data: data3xx
            },
            {
                name: '5xx',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                showSymbol: false,
                data: data5xx
            },

        ]
    };

    return (
        <div style={{ width: "100%" }}>
            <ReactEcharts option={option} />
        </div>
    )
}

export default StackedChart2


