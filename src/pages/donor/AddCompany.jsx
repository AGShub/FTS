import React, { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import honorific from "../../utils/Honorific";
import company_type from "../../utils/CompanyType";
import belongs_to from "../../utils/BelongTo";
import donor_type from "../../utils/DonorType";
import { toast } from "react-toastify";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const gender = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const csr = [
  {
    value: "0",
    label: "No",
  },
  {
    value: "1",
    label: "Yes",
  },
];

const corrpreffer = [
  {
    value: "Registered",
    label: "Registered",
  },
  {
    value: "Branch Office",
    label: "Branch Office",
  },
  {
    value: "Digital",
    label: "Digital",
  },
];
const AddCompany = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [donor, setDonor] = useState({
    indicomp_full_name: "",
    title: "",
    indicomp_com_contact_name: "",
    indicomp_com_contact_designation: "",
    indicomp_gender: "",
    indicomp_dob_annualday: "",
    indicomp_pan_no: "",
    indicomp_image_logo: "",
    indicomp_remarks: "",
    indicomp_promoter: "",
    indicomp_newpromoter: "",
    indicomp_belongs_to: "",
    indicomp_source: "",
    indicomp_donor_type: "",
    indicomp_type: "",
    indicomp_mobile_phone: "",
    indicomp_mobile_whatsapp: "",
    indicomp_email: "",
    indicomp_website: "",
    indicomp_res_reg_address: "",
    indicomp_res_reg_area: "",
    indicomp_res_reg_ladmark: "",
    indicomp_res_reg_city: "",
    indicomp_res_reg_state: "",
    indicomp_res_reg_pin_code: "",
    indicomp_off_branch_address: "",
    indicomp_off_branch_area: "",
    indicomp_off_branch_ladmark: "",
    indicomp_off_branch_city: "",
    indicomp_off_branch_state: "",
    indicomp_off_branch_pin_code: "",
    indicomp_corr_preffer: "Registered",
    indicomp_csr: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "indicomp_mobile_phone") {
      if (validateOnlyDigits(e.target.value)) {
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "indicomp_mobile_whatsapp") {
      if (validateOnlyDigits(e.target.value)) {
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "indicomp_res_reg_pin_code") {
      if (validateOnlyDigits(e.target.value)) {
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "indicomp_off_branch_pin_code") {
      if (validateOnlyDigits(e.target.value)) {
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setDonor({
        ...donor,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onChangePanNumber = (e) => {
    setDonor({ ...donor, indicomp_pan_no: e.target.value });
  };

  const [states, setStates] = useState([]);
  const fetchStateData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-states`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStates(response.data?.states);
    } catch (error) {
      console.error("Error fetching Life Time data", error);
    } finally {
      setLoading(false);
    }
  };
  const [datasource, setDatasource] = useState([]);
  const fetchDataSource = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-datasource`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDatasource(response.data?.datasource);
    } catch (error) {
      console.error("Error fetching Life Time data", error);
    } finally {
      setLoading(false);
    }
  };
  const [promoter, setPromoters] = useState([]);
  const fetchPromoter = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-promoter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPromoters(response.data?.promoter);
    } catch (error) {
      console.error("Error fetching Life Time data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStateData();
    fetchDataSource();
    fetchPromoter();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    const data = {
      indicomp_full_name: donor.indicomp_full_name,
      title: donor.title,
      indicomp_type: donor.indicomp_type,
      indicomp_com_contact_name: donor.indicomp_com_contact_name,
      indicomp_com_contact_designation: donor.indicomp_com_contact_designation,
      indicomp_gender: donor.indicomp_gender,
      indicomp_dob_annualday: donor.indicomp_dob_annualday,
      indicomp_pan_no: donor.indicomp_pan_no,
      indicomp_image_logo: donor.indicomp_image_logo,
      indicomp_remarks: donor.indicomp_remarks,
      indicomp_promoter: donor.indicomp_promoter,
      indicomp_newpromoter: donor.indicomp_newpromoter,
      indicomp_source: donor.indicomp_source,
      indicomp_mobile_phone: donor.indicomp_mobile_phone,
      indicomp_mobile_whatsapp: donor.indicomp_mobile_whatsapp,
      indicomp_email: donor.indicomp_email,
      indicomp_website: donor.indicomp_website,
      indicomp_res_reg_address: donor.indicomp_res_reg_address,
      indicomp_res_reg_area: donor.indicomp_res_reg_area,
      indicomp_res_reg_ladmark: donor.indicomp_res_reg_ladmark,
      indicomp_res_reg_city: donor.indicomp_res_reg_city,
      indicomp_res_reg_state: donor.indicomp_res_reg_state,
      indicomp_res_reg_pin_code: donor.indicomp_res_reg_pin_code,
      indicomp_off_branch_address: donor.indicomp_off_branch_address,
      indicomp_off_branch_area: donor.indicomp_off_branch_area,
      indicomp_off_branch_ladmark: donor.indicomp_off_branch_ladmark,
      indicomp_off_branch_city: donor.indicomp_off_branch_city,
      indicomp_off_branch_state: donor.indicomp_off_branch_state,
      indicomp_off_branch_pin_code: donor.indicomp_off_branch_pin_code,
      indicomp_corr_preffer: donor.indicomp_corr_preffer,
      indicomp_belongs_to: donor.indicomp_belongs_to,
      indicomp_donor_type: donor.indicomp_donor_type,
      indicomp_csr: donor.indicomp_csr,
    };

    if (id) {
      data.donor_related_id = id;
    }

    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required");
      return;
    }

    axios({
      url: BASE_URL + "/api/create-donor",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      toast.success("Data Inserted Sucessfully");
      navigate("/donor-list");
    });
  };

  return (
    <Layout>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1>Add Company</h1>
        <form id="addIndiv" autoComplete="off">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Personal Details
            </h1>
            <hr className="border-gray-300 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div>
                <Input
                  label="Company Name"
                  required
                  color="blue"
                  name="indicomp_full_name"
                  value={donor.indicomp_full_name}
                  onChange={(e) => onInputChange(e)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Please don't add M/s before name
                </p>
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      Type <span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    label="Type"
                    name="indicomp_type"
                    value={donor.indicomp_type}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    {company_type.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      Title <span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    label="Title"
                    name="title"
                    value={donor.title}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    {honorific.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <Input
                  label="Contact Name"
                  required
                  name="indicomp_com_contact_name"
                  value={donor.indicomp_com_contact_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <Input
                  label="Designation"
                  name="indicomp_com_contact_designation"
                  value={donor.indicomp_com_contact_designation}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      Gender <span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    label="Gender"
                    name="indicomp_gender"
                    value={donor.indicomp_gender}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    {gender.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <Input
                  type="date"
                  label="Annual Day"
                  name="indicomp_dob_annualday"
                  value={donor.indicomp_dob_annualday}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <InputMask
                  mask="aaaaa 9999 a"
                  formatChars={{
                    9: "[0-9]",
                    a: "[A-Z]",
                  }}
                  value={donor.indicomp_pan_no}
                  onChange={(e) => onChangePanNumber(e)}
                >
                  {() => <Input required label="PAN Number" />}
                </InputMask>
              </div>

              <div>
                <Input
                  type="file"
                  label="Upload Logo"
                  disabled
                  name="indicomp_image_logo"
                  value={donor.indicomp_image_logo}
                  onChange={(e) => onInputChange(e)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload Company Logo
                </p>
              </div>

              <div>
                <Input
                  label="Remarks"
                  name="indicomp_remarks"
                  value={donor.indicomp_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      Promoter <span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    label="Promoter"
                    required
                    name="indicomp_promoter"
                    value={donor.indicomp_promoter}
                    onChange={(e) => onInputChange(e)}
                  >
                    {promoter.map((option) => (
                      <MenuItem
                        key={option.indicomp_promoter}
                        value={option.indicomp_promoter}
                      >
                        {option.indicomp_promoter}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {donor.indicomp_promoter === "Other" && (
                <div>
                  <Input
                    label="Promoter"
                    name="indicomp_newpromoter"
                    value={donor.indicomp_newpromoter}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              )}

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      Belongs To <span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    label="Belongs To"
                    name="indicomp_belongs_to"
                    value={donor.indicomp_belongs_to}
                    onChange={(e) => onInputChange(e)}
                  >
                    {belongs_to.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      Source<span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    label="Source"
                    name="indicomp_source"
                    value={donor.indicomp_source}
                    onChange={(e) => onInputChange(e)}
                  >
                    {datasource.map((option) => (
                      <MenuItem key={option.id} value={option.data_source_type}>
                        {option.data_source_type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      Donor Type<span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    label="Donor Type"
                    name="indicomp_donor_type"
                    value={donor.indicomp_donor_type}
                    onChange={(e) => onInputChange(e)}
                  >
                    {donor_type.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      CSR<span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    required
                    label="CSR"
                    name="indicomp_csr"
                    value={donor.indicomp_csr}
                    onChange={(e) => onInputChange(e)}
                  >
                    {csr.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Communication Details
            </h1>
            <hr className="border-gray-300 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div>
                <Input
                  label="Mobile Phone"
                  required
                  type="text"
                  maxLength={10}
                  name="indicomp_mobile_phone"
                  value={donor.indicomp_mobile_phone}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <Input
                  label="WhatsApp"
                  type="text"
                  maxLength={10}
                  name="indicomp_mobile_whatsapp"
                  value={donor.indicomp_mobile_whatsapp}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <Input
                  label="Email"
                  type="email"
                  name="indicomp_email"
                  value={donor.indicomp_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <Input
                  label="Website"
                  name="indicomp_website"
                  value={donor.indicomp_website}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Registered Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div>
                <Input
                  label="House & Street Number"
                  name="indicomp_res_reg_address"
                  value={donor.indicomp_res_reg_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <Input
                  label="Area"
                  name="indicomp_res_reg_area"
                  value={donor.indicomp_res_reg_area}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <Input
                  label="Landmark"
                  name="indicomp_res_reg_ladmark"
                  value={donor.indicomp_res_reg_ladmark}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <Input
                  label="City"
                  required
                  name="indicomp_res_reg_city"
                  value={donor.indicomp_res_reg_city}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      State<span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    required
                    label="State"
                    name="indicomp_res_reg_state"
                    value={donor.indicomp_res_reg_state}
                    onChange={(e) => onInputChange(e)}
                  >
                    {states.map((state) => (
                      <MenuItem key={state.id} value={state.state_name}>
                        {state.state_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <Input
                  label="Pincode"
                  required
                  type="text"
                  maxLength={6}
                  name="indicomp_res_reg_pin_code"
                  value={donor.indicomp_res_reg_pin_code}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Branch Office Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div>
                <Input
                  label="Office & Street Number"
                  name="indicomp_off_branch_address"
                  value={donor.indicomp_off_branch_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <Input
                  label="Area"
                  name="indicomp_off_branch_area"
                  value={donor.indicomp_off_branch_area}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <Input
                  label="Landmark"
                  name="indicomp_off_branch_ladmark"
                  value={donor.indicomp_off_branch_ladmark}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <Input
                  label="City"
                  name="indicomp_off_branch_city"
                  value={donor.indicomp_off_branch_city}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      State<span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    required
                    label="State"
                    name="indicomp_off_branch_state"
                    value={donor.indicomp_off_branch_state}
                    onChange={(e) => onInputChange(e)}
                  >
                    {states.map((state) => (
                      <MenuItem key={state.id} value={state.state_name}>
                        {state.state_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <Input
                  label="Pincode"
                  type="text"
                  maxLength={6}
                  name="indicomp_off_branch_pin_code"
                  value={donor.indicomp_off_branch_pin_code}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm relative bottom-[6px]">
                      Correspondence Preference
                      <span className="text-red-700">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    label="Correspondence Preference"
                    required
                    name="indicomp_corr_preffer"
                    value={donor.indicomp_corr_preffer}
                    onChange={(e) => onInputChange(e)}
                  >
                    {corrpreffer.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                type="submit"
                color="blue"
                onClick={onSubmit}
                disabled={isButtonDisabled}
                className="px-6 py-2"
              >
                Submit
              </Button>

              <Link to="listing">
                <Button color="green" className="px-6 py-2">
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddCompany;
