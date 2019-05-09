import React, {Component} from 'react'
import css from '../../cssConfig'

class MainContainer extends Component{
  render(){
    return <div>
      <div style={{width: "114px",
        height: "37px",
        backgroundColor: "#5a9dd0",
        ...css.commonFontStyle,
        fontSize: "13px",
        lineHeight: "37px",
        textAlign: "center",
        marginLeft: "20px",
        boxSizing: "border-box",
        borderRadius: "5px 5px 0 0",
      }}>{this.props.name}</div>
      <div style={{
        ...css.borderLight,
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
