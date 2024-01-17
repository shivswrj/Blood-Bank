import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';
import Layout from '../components/shared/Layout/Layout';
import Modal from '../components/shared/modal/Modal';
const Home = () => {
  const {loading,error} = useSelector((state)=>state.auth);
  return (
    <Layout>
      {error && <span>{alert (error)}</span>}
      {loading?(<Spinner/> : 
        <div>
          HOME
        </div>    
      ): (
        <>
      <h4 className="ms-4"  
      data-bs-toggle="modal" 
      data-bs-target="#staticBackdrop"
      style = {{ cursor : "pointer"}}
      >

        <i className="fa-solid fa-plus text-success py-4"></i>
        Add Inventory


      </h4>
      <Modal/>
        </>)}
    </Layout>
  );
};

export default Home;

    