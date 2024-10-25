import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Moment from 'moment';
import { Card, Typography, Button, Spinner } from "@material-tailwind/react";
import { MdPerson, MdBusiness, MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';

import Layout from '../../layout/Layout'
import BASE_URL from '../../base/BaseUrl';
import axios from 'axios';

const DonorView = () => {
    // States
  const [loader, setLoader] = useState(false);
  const [donor, setDonor] = useState(null);
  const [donorfam, setDonorFam] = useState([]);
  const [company, setCompany] = useState([]);
  const [famgroup, setFamGroup] = useState([]);

  const navigate = useNavigate()
  const {id} = useParams()

  // Fetch data useEffect would go here
  useEffect(() => {
    // Add your data fetching logic here
    axios({
        url: BASE_URL+"/api/fetch-donor-by-id/" + id,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        setDonor(res.data.individualCompany);
        setDonorFam(res.data.family_details);
        setCompany(res.data.company_details);
        setFamGroup(res.data.related_group);
        setLoader(false);
        console.log(res.data);
      });
  }, []);

  const relId = donor?.indicomp_related_id;
  const indid = donor?.id;

  const handleRecipt = () =>{
    navigate(`/receipt-details/${indid}`)
  }
  const handleOldRecipt = () =>{
    navigate(`/receipt-list/${indid}`)
  }

  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="h-12 w-12" color="blue" />
      </div>
    );
  }
  return (
   <Layout>
   <div className="p-2">
      {donor && (
        <div className="space-y-4">
          {/* Header Section */}
          <div >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Typography  variant="h5" className="text-gray-800">
                  Donor Details
                </Typography>
              {famgroup.map((fam, key) => (
                <Typography key={key} variant="h5" className="text-gray-800">
                  Family Group of : {fam.indicomp_full_name}
                </Typography>
              ))}
            </div>
          </div>

          {/* Main Donor Card */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <Typography variant="h3" className="text-blue-900">
                  {donor.indicomp_type === "Individual" ? 
                    `${donor.title} ${donor.indicomp_full_name}` :
                    `M/s ${donor.indicomp_full_name}`
                  }
                </Typography>
                <Typography variant="h6" className="text-gray-600">
                  FTS Id: {donor.indicomp_fts_id}
                </Typography>
              </div>
              <div className="flex gap-2">
                {localStorage.getItem("user_type_id") != 4 && (
                  <>
                    <div onClick={handleOldRecipt}>
                      <Button color="red" size="sm">
                        Old Receipts
                      </Button>
                    </div>
                    <div onClick={handleRecipt}>
                      <Button color="red" size="sm">
                        Receipts Details
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="border-b border-gray-200 my-2" />

            {/* Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {donor.indicomp_type === "Individual" ? (
                <>
                  <InfoField 
                    label="Father Name" 
                    value={donor.indicomp_father_name}
                    icon={<MdPerson />}
                  />
                  <InfoField 
                    label="Mother Name" 
                    value={donor.indicomp_mother_name}
                    icon={<MdPerson />}
                  />
                  <InfoField 
                    label="Spouse Name" 
                    value={donor.indicomp_spouse_name}
                    icon={<MdPerson />}
                  />
                  <InfoField 
                    label="DOA" 
                    value={donor.indicomp_doa ? 
                      Moment(donor.indicomp_doa).format('DD-MM-YYYY') : 
                      'N/A'
                    }
                  />
                  <InfoField 
                    label="DOB" 
                    value={donor.indicomp_dob_annualday ? 
                      Moment(donor.indicomp_dob_annualday).format('DD-MM-YYYY') : 
                      'N/A'
                    }
                  />
                  <InfoField 
                    label="Gender" 
                    value={donor.indicomp_gender}
                  />
                </>
              ) : (
                <>
                  <InfoField 
                    label="Contact Name" 
                    value={donor.indicomp_com_contact_name}
                    icon={<MdPerson />}
                  />
                  <InfoField 
                    label="Designation" 
                    value={donor.indicomp_com_contact_designation}
                  />
                  <InfoField 
                    label="Gender" 
                    value={donor.indicomp_gender}
                  />
                  <InfoField 
                    label="Annual Day" 
                    value={donor.indicomp_dob_annualday ? 
                      Moment(donor.indicomp_dob_annualday).format('DD-MM-YYYY') : 
                      'N/A'
                    }
                  />
                  <InfoField 
                    label="CSR" 
                    value={donor.indicomp_csr}
                  />
                </>
              )}
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-6">
              <InfoField 
                label="Belongs To" 
                value={donor.indicomp_belongs_to}
              />
              <InfoField 
                label="PAN Number" 
                value={donor.indicomp_pan_no}
              />
              <InfoField 
                label="Promoter" 
                value={donor.indicomp_promoter}
              />
              <InfoField 
                label="Source" 
                value={donor.indicomp_source}
              />
              <InfoField 
                label="Donor Type" 
                value={donor.indicomp_donor_type}
              />
              <InfoField 
                label="Type" 
                value={donor.indicomp_type}
              />
            </div>

            <div className="mt-6">
              <InfoField 
                label="Remarks" 
                value={donor.indicomp_remarks}
                fullWidth
              />
            </div>

            {/* Communication Section */}
            <Typography variant="h5" className="mt-8 mb-4">
              Communication Details
            </Typography>
            <div className="border-b border-gray-200 mb-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoField 
                label="Mobile" 
                value={donor.indicomp_mobile_phone}
                icon={<MdPhone />}
              />
              <InfoField 
                label="WhatsApp" 
                value={donor.indicomp_mobile_whatsapp}
                icon={<MdPhone />}
              />
              <InfoField 
                label="Email" 
                value={donor.indicomp_email}
                icon={<MdEmail />}
              />
              <InfoField 
                label="Website" 
                value={donor.indicomp_website}
              />
            </div>

            {/* Address Section */}
            <Typography variant="h5" className="mt-8 mb-4">
              Correspondence Details
            </Typography>
            <div className="border-b border-gray-200 mb-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AddressField
                label="Residence Address"
                address={donor.indicomp_res_reg_address ? {
                  address: donor.indicomp_res_reg_address,
                  area: donor.indicomp_res_reg_area,
                  landmark: donor.indicomp_res_reg_ladmark,
                  city: donor.indicomp_res_reg_city,
                  state: donor.indicomp_res_reg_state,
                  pincode: donor.indicomp_res_reg_pin_code
                } : null}
              />
              <AddressField
                label="Office Address"
                address={donor.indicomp_off_branch_address ? {
                  address: donor.indicomp_off_branch_address,
                  area: donor.indicomp_off_branch_area,
                  landmark: donor.indicomp_off_branch_ladmark,
                  city: donor.indicomp_off_branch_city,
                  state: donor.indicomp_off_branch_state,
                  pincode: donor.indicomp_off_branch_pin_code
                } : null}
              />
            </div>
          </Card>

          {/* Family Details Section */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h5">Family Details</Typography>
              {localStorage.getItem("user_type_id") != 2 &&
               localStorage.getItem("user_type_id") != 3 &&
               localStorage.getItem("user_type_id") != 4 && (
                <Link to={`/add-indivisual/${relId}`}>
                  <Button color="red" size="sm">
                    + Add Family Member
                  </Button>
                </Link>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr className="bg-blue-gray-50">
                    <TableHeader>FTS</TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>DOB</TableHeader>
                    <TableHeader>Mobile</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {donorfam.map((fam, key) => (
                    <tr key={key} className="border-b border-blue-gray-50">
                      <TableCell>{fam.indicomp_fts_id}</TableCell>
                      <TableCell>{fam.indicomp_full_name}</TableCell>
                      <TableCell>
                        {fam.indicomp_dob_annualday ? 
                          Moment(fam.indicomp_dob_annualday).format('DD-MM-YYYY') : 
                          'N/A'
                        }
                      </TableCell>
                      <TableCell>{fam.indicomp_mobile_phone}</TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Company Details Section */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h5">Company Details</Typography>
              {localStorage.getItem("user_type_id") != 2 &&
               localStorage.getItem("user_type_id") != 3 &&
               localStorage.getItem("user_type_id") != 4 && (
                <Link to={`/add-company/${relId}`}>
                  <Button color="red" size="sm">
                    + Add Company
                  </Button>
                </Link>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr className="bg-blue-gray-50">
                    <TableHeader>FTS</TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>DOB</TableHeader>
                    <TableHeader>Mobile</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {company.map((fam, key) => (
                    <tr key={key} className="border-b border-blue-gray-50">
                      <TableCell>{fam.indicomp_fts_id}</TableCell>
                      <TableCell>{fam.indicomp_full_name}</TableCell>
                      <TableCell>
                        {fam.indicomp_dob_annualday ? 
                          Moment(fam.indicomp_dob_annualday).format('DD-MM-YYYY') : 
                          'N/A'
                        }
                      </TableCell>
                      <TableCell>{fam.indicomp_mobile_phone}</TableCell>
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


// Reusable Components
const InfoField = ({ label, value, icon, fullWidth }) => (
    <div className={`${fullWidth ? 'col-span-full' : ''}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-blue-gray-500">{icon}</span>}
        <Typography variant="small" className="font-medium text-blue-gray-500">
          {label}
        </Typography>
      </div>
      <Typography className="text-gray-900">
        {value || 'N/A'}
      </Typography>
    </div>
  );
  
  const AddressField = ({ label, address }) => (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <MdLocationOn className="text-blue-gray-500" />
        <Typography variant="small" className="font-medium text-blue-gray-500">
          {label}
        </Typography>
      </div>
      <Typography className="text-gray-900">
        {address ? 
          `${address.address}, ${address.area}, ${address.landmark}, ${address.city}, ${address.state} - ${address.pincode}` : 
          'N/A'
        }
      </Typography>
    </div>
  );
  
  const TableHeader = ({ children }) => (
    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
      <Typography variant="small" className="font-medium text-blue-gray-500">
        {children}
      </Typography>
    </th>
  );
  
  const TableCell = ({ children }) => (
    <td className="p-4">
      <Typography variant="small" className="text-blue-gray-600">
        {children}
      </Typography>
    </td>
  );

export default DonorView