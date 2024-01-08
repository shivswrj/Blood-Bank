import React,{useState} from 'react';
import InputType from './InputType';
import {Link} from "react-router-dom"; //use to jump from one page to another without refreshing the page
import { handleLogin, handleSignup } from '../../../services/authService';
const Form = ({formtype , Submitbtn , formtitle}) => {
    const [email,setEmail] = useState('')
    const [password,setPassowrd] = useState('')
    const [role,setRole] = useState('donar')
    const [name,setName] = useState('')
    const [organisationName,setOrganisationName] = useState('')
    const [hospitalName,setHospitalName] = useState('')
    const [website,setWebsite] = useState('')
    const [address,setAddress] = useState('')
    const [phone,setPhone] = useState('')

  return (
    <div>
        <h1>{formtitle}</h1><br/><br/>
        <form onSubmit={(e)=>{
            
            if(formtype==="login"){
                return (handleLogin(e,email,password,role));
            }
            else if(formtype==="signup"){
                return (handleSignup (e,email,password,role,name,organisationName,hospitalName,website,address,phone)); 
            }}}> 

            <input type="radio" name="role" id="donar-role" value={"admin"} onChange={(e)=>setRole(e.target.value)} />
            <label htmlFor="donar-role">Admin</label>
            
            <input type="radio" name="role" id="admin-role" value={"organisation"} onChange={(e)=>setRole(e.target.value)} />
            <label htmlFor="admin-role">Organisation</label>
            
            <input type="radio" name="role" id="hospital-role" value={"donar"} onChange={(e)=>setRole(e.target.value)} defaultChecked/>
            <label htmlFor="hospital-role">Donar</label>
            
            <input type="radio" name="role" id="organisation-role" value={"hospital"} onChange={(e)=>setRole(e.target.value)} />
            <label htmlFor="organisation-role">Hospital</label><br/><br/>

            {
                (() => {
                    // eslint-disable-next-line default-case 
                    switch(true){
                        case formtype === "login":{
                            return (
                                <>
                                    <InputType text_label={"Email Address"} type_input={"email"} value_input={email} onchange_input={(e)=>setEmail(e.target.value)}/><br></br>
                                    <InputType text_label={"Password"} type_input={"password"} value_input={password} onchange_input={(e)=>setPassowrd(e.target.value)}/><br></br>
                                </>
                            );
                        }

                        case formtype === "signup":{
                            return (
                                <>
                                    {(role==="donar" || role==="admin") && (
                                        <InputType text_label={"Name"} type_input={"text"} value_input={name} onchange_input={(e)=>setName(e.target.value)}/>
                                    )}<br></br>
                                    {(role==="organisation") && (
                                        <InputType text_label={"Organisation Name"} type_input={"text"} value_input={organisationName} onchange_input={(e)=>setOrganisationName(e.target.value)}/>
                                    )}<br></br>
                                    {(role==="hospital") && (
                                        <InputType text_label={"Hospital Name"} type_input={"text"} value_input={hospitalName} onchange_input={(e)=>setHospitalName(e.target.value)}/>
                                    )}<br></br>
                                    <InputType text_label={"Email Address"} type_input={"email"} value_input={email} onchange_input={(e)=>setEmail(e.target.value)}/><br></br>                                    
                                    <InputType text_label={"Password"} type_input={"password"} value_input={password} onchange_input={(e)=>setPassowrd(e.target.value)}/><br></br>
                                    <InputType text_label={"Website "} type_input={"text"} value_input={website} onchange_input={(e)=>setWebsite(e.target.value)}/><br></br>
                                    <InputType text_label={"Address"} type_input={"text"} value_input={address} onchange_input={(e)=>setAddress(e.target.value)}/><br></br>
                                    <InputType text_label={"Phone"} type_input={"number"} value_input={phone} onchange_input={(e)=>setPhone(e.target.value)}/><br></br>

                                </>
                            );
                        }
                    }
                })()
            }
            
            <button type='submit'> {Submitbtn} </button>
        </form>
        {
            (()=>{
                if(formtype==="login"){
                    return (<p>Not Register yet? <Link to="/signup">Signup</Link></p>)
                }
                return(<p>Already Registered. <Link to="/login">Login</Link></p>)
            })()
        }
    </div>
  )
}

export default Form
