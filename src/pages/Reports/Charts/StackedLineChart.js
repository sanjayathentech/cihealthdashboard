
import React from 'react'
import ReactEcharts from 'echarts-for-react'


function StackedLineChart({ xAxis, data, title, xAxisName, yAxisName, data401, data403, data404, data406, data4xx, series }) {

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

        series: series
    };

    return (
        <div style={{ width: "100%" }}>
            <ReactEcharts option={option} />
        </div>
    )
}

export default StackedLineChart


