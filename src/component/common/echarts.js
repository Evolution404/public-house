import React, {Component} from 'react'

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import  'echarts/lib/chart/bar'
import  'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'

class ECharts extends Component{
  componentDidMount() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.props.id));
      // 绘制图表
      myChart.setOption(this.props.option);
  }
  render(){
    let style={
      width: '100%',
      height: 400,
    }
    if(this.props.style){
      style={
        ...style,
        ...this.props.style,
      }
    }
    return (
      <div id={this.props.id} style={style}></div>
    )
  }
}

export default ECharts
