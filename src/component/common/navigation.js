import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'
import {
  HashRouter as Router,
  Link
} from "react-router-dom"

const SubMenu = Menu.SubMenu

class Sider extends Component {
  // submenu keys of first level
  rootSubmenuKeys = []

  state = {
    openKeys: [],
    selectedKeys: [],
  }
  // 根据路由信息设置打开和激活的导航信息
  initState = (pathname)=>{
    this.props.data.forEach(item=>{
      item.list.forEach(newItem=>{
        if(newItem.path.split('/')[1]===pathname.split('/')[1]){
          this.setState({openKeys:[item.text],
            selectedKeys: [`${item.text}-${newItem.name}`]})
        }
      })
    })
  }
  componentDidMount(){
    let pathname = this.props.location.pathname
    this.initState(pathname)
  }
  componentWillReceiveProps(nextProps) {
    let pathname = this.props.location.pathname
    if(nextProps.data.length!==this.props.data.length)
      nextProps.data.forEach(item=>{
        item.list.forEach(newItem=>{
          if(newItem.path.split('/')[1]===pathname.split('/')[1]){
            this.setState({openKeys:[item.text],
              selectedKeys: [`${item.text}-${newItem.name}`]})
          }
        })
      })
    if (nextProps.location.pathname !== this.props.location.pathname) {
      let pathname = nextProps.location.pathname
      this.initState(pathname)
    } 
  }
  onOpenChange = (openKeys) => {
    openKeys = openKeys.filter(key => !this.state.openKeys.includes(key))
    this.setState({ openKeys })
  }
  onSelect = ({ item, key, selectedKeys })=>{
    this.setState({selectedKeys})
  }
  mapTitle = (text)=>{
    // 传入菜单标题返回对应的图标
    let mapData = {
      '信息管理': <Icon type="idcard" />,
      '公用房查询': <Icon type="search" />,
      '核算管理': <Icon type="money-collect" />,
      '绩效管理': <Icon type="line-chart" />,
      '动态监测': <Icon type="delete" />,
      '会议室管理': <Icon type="team" />,
      '公寓管理': <Icon type="diff" />,
      '系统管理': <Icon type="setting" />,
    }
      return mapData[text]
  }
  // 传入子菜单标题,返回对应的图标
  mapItem = (text)=>{
    let mapData = {
      '信息管理-基础信息管理': <Icon type="idcard" />,
      '信息管理-公用房列表': <Icon type="search" />,
      '信息管理-公用房新增': <Icon type="money-collect" />,
      '信息管理-公用房变更': <Icon type="line-chart" />,
      '信息管理-公用房变更审核': <Icon type="delete" />,
      '信息管理-我的公用房': <Icon type="team" />,
      '信息管理-公用房改造': <Icon type="diff" />,
      '信息管理-公用房改造审核': <Icon type="setting" />,
      '公用房查询-条件查询': <Icon type="diff" />,
      '公用房查询-楼宇查询': <Icon type="setting" />,
      '核算管理-总体核算': <Icon type="team" />,
      '核算管理-单位核算': <Icon type="diff" />,
      '核算管理-个人核算': <Icon type="setting" />,
      '绩效管理-数据导入': <Icon type="idcard" />,
      '绩效管理-工作量查看': <Icon type="search" />,
      '绩效管理-教学单位绩效': <Icon type="money-collect" />,
      '绩效管理-科研单位绩效': <Icon type="line-chart" />,
      '绩效管理-商业用房绩效': <Icon type="delete" />,
      '绩效管理-实验室绩效': <Icon type="team" />,
      '绩效管理-教室绩效': <Icon type="diff" />,
      '会议室管理-会议室预约': <Icon type="idcard" />,
      '会议室管理-预约审批': <Icon type="search" />,
      '会议室管理-我的预约': <Icon type="money-collect" />,
      '会议室管理-使用统计': <Icon type="line-chart" />,
      '系统管理-单位管理': <Icon type="idcard" />,
      '系统管理-参数管理': <Icon type="search" />,
      '系统管理-楼宇管理': <Icon type="money-collect" />,
      '系统管理-人员信息管理': <Icon type="line-chart" />,
      '系统管理-用户管理': <Icon type="delete" />,
      '系统管理-补贴面积': <Icon type="team" />,
    }
      return mapData[text]
  }

  render() {
    return (
      <Router>
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={this.state.selectedKeys}
        onOpenChange={this.onOpenChange}
        onSelect={this.onSelect}
        style={{ width: '100%', height: '100vh'}}
      >
        {
          this.props.data.map((item, index)=>(
            <SubMenu key={item.text} title={<span>{this.mapTitle(item.text)}<span>{item.text}</span></span>}>
              {
                item.list.map((newItem, newIndex)=>(
                  <Menu.Item key={`${item.text}-${newItem.name}`}>
                    <Link to={newItem.path}>{this.mapItem(item.text+'-'+newItem.name)}{newItem.name}</Link>
                  </Menu.Item>
                ))
              }
            </SubMenu>
          ))
        }
      </Menu>
      </Router>
    )
  }
}
export default withRouter(Sider)
