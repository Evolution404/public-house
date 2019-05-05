import React, {Component} from 'react'
import css from '../../cssConfig'

class Button extends Component{
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
    <Button
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
  return (
    <Button
      onClick={onClick}
      height="20px"
      disable={disable}
      text={text}
    />
  )
}

export {LButton, SButton}

export default Button
