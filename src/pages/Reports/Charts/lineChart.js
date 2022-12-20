
import React from 'react'
import ReactEcharts from 'echarts-for-react'


function LineChart({ xAxis, data, title, xAxisName, yAxisName }) {

    const option = {
        legend: {
            orient: 'horizontal',
            x: 'right',
            top: 'center',
            rotate: 30,
            textStyle: { color: 'red' },
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
            nameGap: 50,
            type: 'category',
            data: xAxis,
            boundaryGap: false,
            lineStyle: {
                type: 'dashed'
                // ...
            },
        },
        yAxis: {
            name: yAxisName,
            nameGap: 30,
            nameLocation: "middle",
            type: 'value'
        },

        series: [
            {
                // name: yAxisName,
                data: data,
                type: 'line',
                areaStyle: {},
                showSymbol: false,
            }
        ]
    };

    return (
        <div style={{ width: "100%" }}>
            <ReactEcharts option={option} />
        </div>
    )
}

export default LineChart


