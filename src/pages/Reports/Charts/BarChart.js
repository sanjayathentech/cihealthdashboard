import React from 'react'
import ReactEcharts from 'echarts-for-react'


function BarChart({ YAxis, Succeeded, Failed }) {

    const option = {
        title: {
            text: 'World Population'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'category',
            data: YAxis
        },
        series: [
            {
                name: 'Succeeded',
                type: 'bar',
                data: Succeeded
            },
            {
                name: 'Failed',
                type: 'bar',
                data: Failed
            }
        ]
    };

    return (

        <div>
            <ReactEcharts option={option} />
        </div>

    )
}

export default BarChart
