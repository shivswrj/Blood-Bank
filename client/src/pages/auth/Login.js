import React from 'react'
import Form from '../../components/shared/Form/Form'
import {useSelector} from'react-redux'
import Spinner from '../../components/shared/Spinner'
import { toast } from 'react-toastify'
const Login = () => { 
  const {loading , error} = useSelector(state => state.auth)
  return (
    <>
    {error && <span>{toast(error)}</span>}
    {loading ? <Spinner/> : (
      <div>
        <Form formtype={"login"} Submitbtn={"Login"} formtitle={"Login Form"}></Form>
      </div>
    )}
    </>

  )
}

export default Login
