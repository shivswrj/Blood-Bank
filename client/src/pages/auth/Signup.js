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
        <div className="row g-0">
        <div className="col-md-8 form-banner ">
          <img src="./assets/images/banner2.png" alt="registerImage" />
        </div>
        < div className="col-md-4 form-container">
          <Form formtype={"signup"} formtitle={"Singup Form"} Submitbtn={"Signup"} />
        </div>  
        </div>  
      )}
    </>
  )
}

export default Signup
