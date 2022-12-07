import React from 'react'
import ReactEcharts from 'echarts-for-react'


function BarChart({ YAxis = [], Succeeded = [], Failed = [], Running = [] }) {

    const option = {
        title: {
            text: 'Work Flow Status'
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
                itemStyle: { normal: { color: '#50C878' } },
                type: 'bar',
                data: Succeeded
            },
            {
                name: 'Running',
                type: 'bar',
                itemStyle: { normal: { color: '#0078d4' } },
                data: Running
            },
            {
                name: 'Failed',
                itemStyle: { normal: { color: '#FF5733' } },
                type: 'bar',
                data: Failed
            }
        ]
    };

    return (

        <div style={{ width: '50%', height: "auto" }}>
            <ReactEcharts option={option} />
        </div>

    )
}

export default BarChart
