import React, {Component} from 'react'
import css from '../../cssConfig.js'

const commonFontStyle=css.commonFontStyle
function Welcome(props){
  return <span style={{...commonFontStyle, padding:"10px"}}>欢迎: {props.name}</span>
}
class ChangePW extends Component{
  render(){
    return <span style={{...commonFontStyle, padding:"10px"}}>修改密码</span>
  }
}
class Exit extends Component{
  render(){
    return <span style={{...commonFontStyle, padding:"10px"}}>退出登录</span>
  }
}
class RightInfo extends Component{
  constructor(props){
    super(props)
    this.state = {name: props.name}
  }
  render(){
    return (
      <div>
        <Welcome name={this.state.name}/>
        <ChangePW/>
        <Exit/>
      </div>
    )
  }
}
class Header extends Component{
  constructor(props){
    super(props)
    this.state = {name: props.name}
  }
  render(){
    let styleDiv = {
      backgroundColor: css.green,
      height: "76px"
    }
    let fontStyle = {
      fontSize: "28px",
      fontWeight: 700,
      color: "white",
      position: "absolute",
      left: "383px",
      top: "31px",
    }
    let rightStyle = {
      position: "absolute",
      right: "100px",
      top: "50px",
    }
    return (
      <div style={{...styleDiv,
        ...css.borderDeep
      }}>
        <img style={{height: "62px", 
          marginTop: "7px"
        }} src="/images/header.png" alt="" />
        <span style={fontStyle}>公用房管理系统</span>
        <div style={rightStyle}>
          <RightInfo name={this.state.name}/>
        </div>
      </div>
    )
  }
}

export default Header
