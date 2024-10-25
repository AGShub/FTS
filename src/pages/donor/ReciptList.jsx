import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import BASE_URL from '../../base/BaseUrl'
import MUIDataTable from 'mui-datatables'
import { IoEyeOutline } from 'react-icons/io5'

const ReciptList = () => {
    const {id} = useParams()
    const [receiptData, setReceiptData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchReceiptData = async () => {
        try {
        
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(`${BASE_URL}/api/fetch-receipts-by-old-id/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setReceiptData(response.data?.receipts);
        } catch (error) {
          console.error("Error fetching receipt list data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchReceiptData();
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
        name: "receipt_no",
        label: "Receipt No",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "individual_company",
        label: "Full Name",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (value) => {
                return value?.indicomp_full_name || "N/A";
            },
        },
    },
      {
        name: "receipt_date",
        label: "Date",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "receipt_exemption_type",
        label: "Exemption Type",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "receipt_donation_type",
        label: "Donation Type",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "receipt_total_amount",
        label: "Amount",
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
             onClick={()=>navigate(`/receipt-view/${id}`)}
              className="flex items-center space-x-2">
                <IoEyeOutline title="View" className="h-5 w-5 cursor-pointer" />
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
      
    };
  return (
   <Layout>
     <div className="mt-5">
        <MUIDataTable
        title='Receipt List'
          data={receiptData ? receiptData : []}
          columns={columns}
          options={options}
        />
      </div>
   </Layout>
  )
}

export default ReciptList