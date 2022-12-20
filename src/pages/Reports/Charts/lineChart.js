
import React from 'react'
import ReactEcharts from 'echarts-for-react'


function LineChart({ xAxis, data, title }) {

    const option = {
        title: {
            text: title
        },
        xAxis: {
            type: 'category',
            data: xAxis,
            boundaryGap: false,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data,
                type: 'line'
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


