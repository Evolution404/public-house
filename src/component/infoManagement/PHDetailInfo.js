import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import API from '../../api'
import {message, Button, Row, Col} from 'antd'
import DetailHelper from './detailHelper'
class PHDetailInfo extends Component{
  state = {
    id:'',
    detailInfo: {},
    infoLoading: true,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      let id = nextProps.match.params.id
      this.initDetailInfo(id)
    } 
  }
  componentDidMount(){
    let id = this.props.match.params.id
    this.initDetailInfo(id)
  }
  print = ()=>{
    window.document.body.innerHTML =
      window.document.getElementById('printArea').innerHTML
    window.print()
    window.location.reload()
  }
  initDetailInfo = id=>{
    if(id===':id') {
      message.error('无效的id')
      return
    }
    this.setState({id, infoLoading: true})
    API.getPHDetailInfo(id)
    .then(rs=>{
      this.setState({detailInfo: rs})
    })
    .catch(err=>{
      message.error('加载信息失败')
      if(err.response)
        message.error(err.response.data.title)
    })
    .finally(()=>{
      this.setState({infoLoading: false})
      // TODO 对接删除
      let detailInfo = {
        dept: '计算机科学与技术学院',
        usingNature: '学院用房',
        secondaryNature: '专业实验室',
        building: '研学楼',
        floor: '6楼',
        roomNum: '604室',
        usingArea: '100.4平方米',
        personnel: [{name:'张三', id:1},{name: '李四', id: 2}],
        head: [{name: '张三', id:1}],
        fireHead: [{name: '张三', id:1}],
        drawings: ['https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg'],
        housePic: ['https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg'],
        houseDesc: 'this is houseDesc',
        equipment: ['投影仪', '音响', '麦克风'],
        peopleNum: '5-10人',
        historyInfo: [
          {
            id: 'id',
            house: '111house',
            time: 'xxx-xxx',
            personnel: 'personnel',
            usingNature: '学院用房',
          },
        ],
      }
      this.setState({detailInfo})
    })
  }
  render(){
    return (
      <MainContainer name="统计查询">
        <Row>
          <Col span={12}>
            <h2 style={{textAlign: 'right'}}>公用房详细信息</h2>
          </Col>
          <Col offset={4} span={2}><Button onClick={this.print}
            type="primary">打印</Button></Col>
          <Col span={2}><Button type="primary">导出到文件</Button></Col>
        </Row>
        <Split></Split>
        <div id='printArea'>
          <DetailHelper {...this.state.detailInfo}></DetailHelper>
        </div>
      </MainContainer>
    )
  }
}

export default PHDetailInfo
