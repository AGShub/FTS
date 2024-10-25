import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { ContextPanel } from '../../utils/ContextPanel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';
import { CiMail } from 'react-icons/ci';
import MUIDataTable from 'mui-datatables';

const MemberList = () => {
    const [memberData, setMemberData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {isPanelUp} = useContext(ContextPanel)
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchDonorData = async () => {
        try {
        
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(`${BASE_URL}/api/fetch-members`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setMemberData(response.data?.individualCompanies);
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
        name: "factory_address",
        label: "Address",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "indicomp_com_contact_name",
        label: "Spouse/Contact",
        options: {
          filter: true,
          sort: false,
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
            
              <div 
            
              className="flex items-center space-x-2">
                <CiMail title="Edit" className="h-5 w-5 cursor-pointer" />
              </div>
              
              
            
            );
          },
        },
      },
    ];
    const options = {
      selectableRows: "none",
      elevation: 0,
      // rowsPerPage: 5,
      // rowsPerPageOptions: [5, 10, 25],
      responsive: "standard",
      viewColumns: true,
      download: false,
      print: false,
      
    };
  return (
    <Layout>
         <div className="mt-5">
        <MUIDataTable
        title='Member List'
          data={memberData ? memberData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  )
}

export default MemberList