import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { ContextPanel } from '../../utils/ContextPanel';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';
import { CiEdit, CiReceipt } from 'react-icons/ci';
import { IoEyeOutline } from "react-icons/io5";
import MUIDataTable from 'mui-datatables';

const DonorList = () => {
    const [donorData, setDonorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {isPanelUp} = useContext(ContextPanel)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
      
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-donors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDonorData(response.data?.individualCompanies);
      } catch (error) {
        console.error("Error fetching Factory data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonorData();
    setLoading(false);
  }, []);


  

  const columns = [
    {
      name: "slNo",
      label: "SL No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },

    {
      name: "indicomp_full_name",
      label: "Full Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "indicomp_type",
      label: "Type",
      options: {
        filter: true,
        sort: false,
      },
    },
   
    {
      name: "indicomp_spouse_name",
      label: "Spouse",
      options: {
        display:false
      },
    },
    {
      name: "indicomp_com_contact_name",
      label: "Contact",
      options: {
        display:false
      },
    },
    {
      name: "spouse_contact",
      label: "Spouse/Contact",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const indicompType = tableMeta.rowData[2]; // Assuming "Type" is the 3rd column (index 2)
          const spouseName = tableMeta.rowData[3];   // Assuming "indicomp_spouse_name" is the 4th column (index 3)
          const contactName = tableMeta.rowData[4];  // Assuming "indicomp_com_contact_name" is the 5th column (index 4)
    
          if (indicompType === "Individual") {
            return spouseName; 
          } else {
            return contactName; 
          }
        },
      },
    },
    
    {
      name: "indicomp_mobile_phone",
      label: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "indicomp_email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
   
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <div className="flex gap-2">
            <div 
            onClick={()=>navigate(`/donor-edit/${id}`)}
            className="flex items-center space-x-2">
              <CiEdit title="Edit" className="h-5 w-5 cursor-pointer" />
            </div>
            <div 
           onClick={()=>navigate(`/donor-view/${id}`)}
            className="flex items-center space-x-2">
              <IoEyeOutline title="View" className="h-5 w-5 cursor-pointer" />
            </div>
            <div 
            
            className="flex items-center space-x-2">
              <CiReceipt title="Reciept" className="h-5 w-5 cursor-pointer" />
            </div>
            
            </div>
          );
        },
      },
    },
  ];
  const options = {
    selectableRows: "none",
    elevation: 0,
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    customToolbar: () => {
      return (
        <div className=' flex justify-end gap-2'>
        <Link
        to="/add-indivisual"
        className="btn btn-primary text-center text-xs md:text-right text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
      >
        + Indivisual
      </Link>
        <Link
        to="/add-company"
        className="btn btn-primary text-center text-xs md:text-right text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
      >
        + Company
      </Link>
      </div>
      );
    },
  };
  return (
    <Layout>
        <div className="mt-5">
        <MUIDataTable
        title='Donor List'
          data={donorData ? donorData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  )
}

export default DonorList