import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/shared/Spinner'
import { toast } from 'react-toastify'
import Layout from '../components/shared/Layout/Layout'
const Home = () => {
  const {loading,error} = useSelector((state)=>state.auth)
  return (
    <Layout>
      {error && <span>{toast(error)}</span>}
      {loading?<Spinner/> : (
        <div>
          HOME
        </div>    
      )}
    </Layout>
  )
}

export default Home

    