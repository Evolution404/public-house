import React, {Component} from 'react'
import css from '../../cssConfig'
import {Button, Icon} from 'antd'

class MyButton extends Component{
  render(){
    let height = this.props.height
    let width = this.props.width
    let isDisable = this.props.disable
    let onClick = isDisable?null:this.props.onClick
    return (
      <button
        onClick={onClick}
        style={{backgroundColor:css.blue,
          borderRadius: "5px",
          height, width,
          ...css.commonFontStyle,
          fontSize: "13px",
          opacity: isDisable?0.5:1,
          cursor: isDisable?"not-allowed":"pointer",
          padding: '0 3px',
          minWidth: '48px',
        }}
      >{this.props.text}</button>
    )
  }
}

function LButton({onClick, text, disable}) {
  return (
    <MyButton
      onClick={onClick}
      width="105px"
      height="33px"
      disable={disable}
      text={text}
    />
  )
}
function SButton({onClick, text, disable}) {
  if(disable)
    return <span></span>
  if(text==='X删除')
    return <Icon onClick={onClick} type="delete" />
  if(text==='修改'||text==='修改查看'||text==='变更'||text==='更新')
    return <Icon onClick={onClick} type="edit" />
  if(text==='详细')
    return <Icon onClick={onClick} type="search" />
  return (
    <MyButton
      onClick={onClick}
      height="20px"
      disable={disable}
      text={text}
    />
  )
}
// 增加
function AddButton(props){
  return <Button {...props} type="primary">
    <Icon type="edit"></Icon>{props.children}</Button>
}

// 删除
function DelButton(props){
  return <Button {...props} type="primary">
    <Icon type="delete"></Icon>{props.children}</Button>
}
// 导入
function ImButton(props){
  /*return <Button {...props} type="primary">
    <Icon type="import"></Icon>{props.children}</Button>*/
   return <div></div>
}
// 导出
function ExButton(props){
  /*return <Button {...props} type="primary">
    <Icon type="export"></Icon>{props.children}</Button>*/
   return <div></div>
}
// 搜索
function SearchButton(props){
  return <Button {...props} type="primary">
    <Icon type="search"></Icon>{props.children}</Button>
}
// 刷新
function RefreshButton(props){
  return <Button {...props} type="primary">
    <Icon type="sync"></Icon>{props.children}</Button>
}
// 打印
function PrintButton(props){
  /*return <Button {...props} type="primary">
    <Icon type="printer"></Icon>{props.children}</Button>*/
   return <div></div>
}
// 上传
function UploadButton(props){
  /*return <Button {...props} type="primary">
    <Icon type="upload"></Icon>{props.children}</Button>*/
   return <div></div>
}
// 保存
function SaveButton(props){
  return <Button {...props} type="primary">
    <Icon type="save"></Icon>{props.children}</Button>
}
// 上一步
function PrevButton(props){
  return <Button {...props} type="primary">
    <Icon type="arrow-left"></Icon>{props.children}</Button>
}
// 下一步
function NextButton(props){
  return <Button {...props} type="primary">
    {props.children}<Icon type="arrow-right"></Icon></Button>
}
// 核算
function AccButton(props){
  return <Button {...props} type="primary">
    <Icon type="pie-chart"></Icon>{props.children}</Button>
}
// 审批
function AuditButton(props){
  return <Button {...props} type="primary">
    <Icon type="audit"></Icon>{props.children}</Button>
}
// 确定
function ConfirmButton(props){
  return <Button {...props} type="primary">
    <Icon type="check"></Icon>{props.children}</Button>
}
// 时间
function CalendarButton(props){
  return <Button {...props} type="primary">
    <Icon type="calendar"></Icon>{props.children}</Button>
}
// 重置
function ResetButton(props){
  return <Button {...props} type="primary">
    <Icon type="reload"></Icon>{props.children}</Button>
}

const TButton = {
  AddButton,
  DelButton,
  ImButton,
  ExButton,
  SearchButton,
  RefreshButton,
  PrintButton,
  UploadButton,
  SaveButton,
  PrevButton,
  NextButton,
  AccButton,
  AuditButton,
  ConfirmButton,
  CalendarButton,
  ResetButton,
}

export {LButton, SButton, TButton}

export default Button
