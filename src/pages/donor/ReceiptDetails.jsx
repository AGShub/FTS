import React, { useState, useEffect } from 'react';
import { Card, Typography, Spinner } from "@material-tailwind/react";
import { MdReceipt, MdGroup, MdPayment } from 'react-icons/md';
import Moment from 'moment';
import Layout from '../../layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';


const ReceiptDetails = () => {
    const [loader, setLoader] = useState(false);
    const [donation, setDonation] = useState([]);
    const [membership, setMembership] = useState([]);
    const [famgroup, setFamGroup] = useState([]);
    const {id} = useParams()
  
    
    useEffect(() => {
      
      axios({
        url: BASE_URL+"/api/fetch-donor-receipt-by-id/" + id,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        setDonation(res.data.donor_receipts);
        setMembership(res.data.membership_details);
        setFamGroup(res.data.related_group);
        setLoader(false);
        console.log(res.data);
      });
    }, []);
  
    
  return (
    <Layout>
           <div className="min-h-screen p-2 bg-gray-50">
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="h-12 w-12" color="blue" />
        </div>
      ) : (
        <div className="space-y-2">
          {/* Page Title and Family Group */}
          <div className="flex  justify-between">
            <Typography variant="h5" className="text-gray-800">
              Receipts Details
            </Typography>
            
            {famgroup.map((fam, key) => (
              <div key={key} className="flex items-center gap-2">
                <MdGroup className="text-blue-600 text-lg" />
                <Typography variant="h5" className="text-gray-700">
                  Family Group of:{fam.indicomp_full_name}
                </Typography>
              </div>
            ))}
          </div>

          {/* Donation Details Section */}
          {donation && (
            <Card className="p-3 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <MdReceipt className="text-blue-600 text-xl" />
                <Typography variant="h4" color="blue-gray">
                  Donation Details
                </Typography>
              </div>
              <div className="border-b border-gray-200 mb-2" />
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-max table-auto">
                  <thead>
                    <tr className="bg-blue-gray-50">
                      <TableHeader>R.No</TableHeader>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Date</TableHeader>
                      <TableHeader>Amount</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {donation.map((fam, key) => (
                      <tr 
                        key={key} 
                        className="border-b border-blue-gray-50 hover:bg-blue-gray-50/50 transition-colors"
                      >
                        <TableCell>{fam.receipt_no}</TableCell>
                        <TableCell>{fam.indicomp_full_name}</TableCell>
                        <TableCell>
                          {Moment(fam.receipt_date).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MdPayment className="text-blue-600" />
                            {fam.receipt_total_amount}
                          </div>
                        </TableCell>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}


          <Card className="p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <MdGroup className="text-blue-600 text-xl" />
              <Typography variant="h4" color="blue-gray">
                Membership Details
              </Typography>
            </div>
            <div className="border-b border-gray-200 mb-2" />
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto">
                <thead>
                  <tr className="bg-blue-gray-50">
                    <TableHeader>R.No</TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Amount</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {membership.map((fam, key) => (
                    <tr 
                      key={key} 
                      className="border-b border-blue-gray-50 hover:bg-blue-gray-50/50 transition-colors"
                    >
                      <TableCell>{fam.receipt_no}</TableCell>
                      <TableCell>{fam.individual_company.indicomp_full_name}</TableCell>
                      <TableCell>
                        {Moment(fam.receipt_date).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MdPayment className="text-blue-600" />
                          {fam.receipt_total_amount}
                        </div>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
    </Layout>
  )
}

const TableHeader = ({ children }) => (
    <th className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-2">
      <Typography
        variant="small"
        className="font-medium leading-none text-blue-gray-600"
      >
        {children}
      </Typography>
    </th>
  );
  
  const TableCell = ({ children }) => (
    <td className="p-4">
      <Typography
        variant="small"
        className="font-normal text-blue-600"
      >
        {children}
      </Typography>
    </td>
  );

export default ReceiptDetails