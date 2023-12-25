import React from 'react'

const InputType = ({value_input , onchange_input , name_input , type_input , text_label}) => {
  return (
    <div>
        <label>{text_label}</label><br/><br/>
        <input name={name_input} type={type_input} id="input-type-form" value={value_input} onChange={onchange_input}/>
    </div>
  )
}

export default InputType
