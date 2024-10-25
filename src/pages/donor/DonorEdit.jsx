import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BASE_URL from '../../base/BaseUrl'
import DonorEditIndv from './DonorEditIndv'
import DonorEditComp from './DonorEditComp'

const DonorEdit = () => {
    const {id} = useParams()
    const [usertype,setUsertype]=useState('')
    useEffect(() => {
        
        axios({
          url: BASE_URL+"/api/fetch-donor-for-edit/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((res) => {
          localStorage.setItem("donType", res.data.individualCompany.indicomp_type);
          setUsertype(res.data.individualCompany.indicomp_type)
    
        });
      }, []);

      if (localStorage.getItem("donType") == "Individual") {
        return (
          <Layout>
            <DonorEditIndv id={id} ></DonorEditIndv>
          </Layout>
        )
      }
  return (
    <Layout>
        <DonorEditComp id={id}  ></DonorEditComp>
    </Layout>
  )
}

export default DonorEdit