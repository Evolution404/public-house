import React, {Component} from 'react'
import ECharts from './echarts'

class Histogram extends Component{
  render(){
    let xAxisData = []
    let legendData = []
    for(let k in this.props.data){
      xAxisData.push(k)
      for(let v in this.props.data[k]){
        if(legendData.indexOf(v) < 0)
          legendData.push(v)
      }
    }
    let data = legendData.map(legend=>{
      let tempData = []
      for(let k in this.props.data){
        tempData.push(this.props.data[k][legend])
      }
      return{
            name: legend,
            type: 'bar',
            barGap: 0,
            data: tempData,
      }
    })
    let option = {
      title: {
        text: this.props.title,
        textStyle: {
          fontSize: 15,
        },
      },
      color: ['#003366', '#006699', '#4cabce', '#e5323e'],
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      legend: {
          data: legendData,
          top: 20
      },
      toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
          }
      },
      calculable: true,
      xAxis: [
          {
              type: 'category',
              axisTick: {show: false},
              data: xAxisData,
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: data,
    }
    return <ECharts id={this.props.id} option={option}></ECharts>
  }
}
export default Histogram