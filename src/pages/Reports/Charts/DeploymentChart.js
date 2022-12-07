import React from 'react'
import ReactEcharts from 'echarts-for-react'


function DeploymentChart({ YAxis = [], Active = [], InActive = [] }) {

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
                name: 'Active',
                itemStyle: { normal: { color: '#50C878' } },
                type: 'bar',
                data: Active
            },
            {
                name: 'InActive',
                type: 'bar',
                itemStyle: { normal: { color: '#0078d4' } },
                data: InActive
            },
        ]
    };

    return (

        <div style={{ width: '50%', height: "auto" }}>
            <ReactEcharts option={option} />
        </div>

    )
}

export default DeploymentChart
