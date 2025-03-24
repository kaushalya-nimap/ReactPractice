import React from "react"
const TextError = (props) => {
    console.log(props)
    return (
        <div style={{fontSize:"9px",color:"#fd397a",marginLeft:"1px"}}>
            {props.children}
        </div>
    )
}
export default TextError