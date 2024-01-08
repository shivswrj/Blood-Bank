import React from 'react' //rafce
import Form from '../../components/shared/Form/Form'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner'
import { toast } from 'react-toastify'
const Signup = () => {
  const {loading,error} = useSelector(state => state.auth)
  return (
    <>
      {error && <span>{toast(error)}</span>}
      {loading?<Spinner/> : (
        <div>
          <Form formtype={"signup"} formtitle={"Singup Form"} Submitbtn={"signup"} />
        </div>    
      )}
    </>
  )
}

export default Signup
