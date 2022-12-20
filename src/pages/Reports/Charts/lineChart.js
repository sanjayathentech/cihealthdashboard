
import React from 'react'
import ReactEcharts from 'echarts-for-react'


function LineChart({ xAxis, data, title, xAxisName, yAxisName }) {

    const option = {
        legend: {},
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
        },
        yAxis: {
            name: yAxisName,
            nameGap: 50,
            nameLocation: "middle",
            type: 'value'
        },
        series: [
            {
                data: data,
                type: 'line',
                areaStyle: title === "Failed Request" ? {} : null,
                showSymbol: false,
            }
        ]
    };

    return (
        <div style={{ width: '100%' }}>
            <ReactEcharts option={option} style={{ height: "500px" }} />
        </div>
    )
}

export default LineChart


