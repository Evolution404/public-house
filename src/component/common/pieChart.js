import React, {Component} from 'react'
import ECharts from '../common/echarts'

class PieChart extends Component {
  render(){
    let option = {
      title: {
        text: this.props.title,
        textStyle: {
          fontSize: 15,
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
      },
      series : [
          {
              name: this.props.desc||'',
              type: 'pie',
              radius : '55%',
              center: ['40%', '50%'],
              data: this.props.data,
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    }
    return <ECharts id={this.props.id} option={option}></ECharts>
  }
}

export default PieChart
