
import React from 'react'
import ReactEcharts from 'echarts-for-react'


function StackedLineChart({ xAxis, data, title, xAxisName, yAxisName, data401, data403, data404, data406, data4xx }) {

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
                name: '4xx',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                showSymbol: false,
                data: data401
            },
            {
                name: '401',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                showSymbol: false,
                data: data401
            },
            {
                name: '403',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                showSymbol: false,
                data: data403
            },
            {
                name: '404',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                showSymbol: false,
                data: data404
            },
            {
                name: '406',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                showSymbol: false,
                data: data406
            },
        ]
    };

    return (
        <div style={{ width: "100%" }}>
            <ReactEcharts option={option} />
        </div>
    )
}

export default StackedLineChart


