import React, {Component} from 'react'
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
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
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
        onOpenChange={this.onOpenChange}
        style={{ width: 256}}
      >
        {
          this.props.data.map((item, index)=>(
            <SubMenu key={index} title={<span>{this.mapTitle(item.text)}<span>{item.text}</span></span>}>
              {
                item.list.map((newItem, newIndex)=>(
                  <Menu.Item key={`${index}-${newIndex}`}>
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
export default Sider
