import React from 'react'

const InputType = ({value_input , onchange_input ,labelFor, name_input , InputType , text_label}) => {
  return (
    <>
  <div>
        
        <label htmlFor={labelFor} className="form-label">
        {text_label}   </label><br/><br/>
        <input name={name_input}   type={InputType} id="input-type-form" value={value_input} onChange={onchange_input}/>
    </div>
    </>
  )
}

export default InputType
