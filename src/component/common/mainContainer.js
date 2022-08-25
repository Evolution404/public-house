import React, {Component} from 'react'
import { Breadcrumb, Icon } from 'antd'
import css from '../../cssConfig'

class MainContainer extends Component{
  render(){
    return <div>
      <Breadcrumb style={{marginBottom: 20}}>
        <Breadcrumb.Item href="">
          <Icon type="home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item>{this.props.name.replace('公用房', '房屋')}</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{
        border: '2px solid #001529',
        borderRadius: 5,
      }}>
        <div style={{padding: '10px 20px',
          fontSize: "14px",
          fontWeight: "400",
          color: "#333",
        }}>
          {this.props.children}
        </div>
      </div>
    </div>
  }
}
export default MainContainer
