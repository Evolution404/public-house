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
  componentDidMount(){
    let pathname = this.props.location.pathname
    this.props.data.forEach(item=>{
      item.list.forEach(newItem=>{
        if(newItem.path.split('/')[1]===pathname.split('/')[1])
          this.setState({openKeys:[item.text],
            selectedKeys: [`${item.text}-${newItem.name}`]})
      })
    })
  }
  onOpenChange = (openKeys) => {
    this.setState({ openKeys })
  }
  onSelect = ({ item, key, selectedKeys })=>{
    this.setState({selectedKeys})
  }
  mapTitle = (text)=>{
    // 传入菜单标题返回对应的title
    let mapData = {
      '信息管理': <Icon type="edit" />,
      '统计查询': <Icon type="form" />,
      '核算管理': <Icon type="copy" />,
      '绩效管理': <Icon type="scissor" />,
      '动态监测': <Icon type="delete" />,
      '会议室管理': <Icon type="snippets" />,
      '公寓管理': <Icon type="diff" />,
      '系统管理': <Icon type="setting" />,
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
        style={{ width: 256}}
      >
        {
          this.props.data.map((item, index)=>(
            <SubMenu key={item.text} title={<span>{this.mapTitle(item.text)}<span>{item.text}</span></span>}>
              {
                item.list.map((newItem, newIndex)=>(
                  <Menu.Item key={`${item.text}-${newItem.name}`}>
                    <Link to={newItem.path}>{newItem.name}</Link>
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
