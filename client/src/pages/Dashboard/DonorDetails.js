import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";

const DonorDetails = () => {
  const location = useLocation();
  const { donor } = location.state;

  return (
    <Layout>
      <div>
        <h2>Donor Details</h2>
        <p>Name: {donor.name}</p>
        <p>Email: {donor.email}</p>
        <p>Phone: {donor.phone}</p>
        <p>Time & Date: {moment(donor.createdAt).format("DD/MM/YYYY hh:mm A")}</p>
      </div>
    </Layout>
  );
};

export default DonorDetails;
