export default function Invoice(props) {
  const componentRef = useRef();
  const componentRefs = useRef();
  const componentRefp = useRef();
  const [donor, setDonor] = useState([]);
  const [receipts, setReceipts] = useState({});
  const [chapter, setChapter] = useState({});
  const [authsign, setSign] = useState({});
  const [authsign1, setSign1] = useState({});
  const [theId, setTheId] = useState(0);
  const [loader, setLoader]= useState(true);
  const [country, setCountry] = useState({});

  const amountInWords = numWords(receipts.receipt_total_amount);

  const [showmodal, setShowmodal] = useState(false);
  const closegroupModal = () => {
    setShowmodal(false);
  };
  const openmodal = () => {
    setShowmodal(true);
    localStorage.setItem("ftsid", receipts.indicomp_fts_id+'');
  };
  
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "-" + mm + "-" + yyyy;
  

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    setTheId(id);

    axios({
      url: baseURL+"/fetch-receipt-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setReceipts(res.data.receipt);
      setChapter(res.data.chapter);
      setSign(res.data.auth_sign);
      setSign1(res.data.auth_sign);
      setCountry(res.data.country);
      console.log("test",res.data.auth_sign);
      setLoader(false)
      // alert(res.data.individualCompany.indicomp_email);
    });
  }, []);
  // alert(donor.indicomp_fts_id);

  const printReceipt = (e) => {
    e.preventDefault();
    axios({
      url: baseURL+"/print-receipt?id=" + theId,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      window.open(baseURL+"/print-receipt?id=" + theId, '_blank');
      
    })
  };


  const sendEmail = (e) => {
    e.preventDefault();
    axios({
      url: baseURL+"/send-receipt?id=" + theId,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      NotificationManager.success("Email Sent Sucessfully");
      
    })
  };

  const downloadReceipt = (e) => {
    e.preventDefault();
    axios({
      url: baseURL+"/download-receipts?id=" + theId,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      NotificationManager.success("Receipt Downloaded Sucessfully");
      
    }).catch((err) =>{
      NotificationManager.error("Receipt Not Downloaded");
    })
  };
  
  const  handleExportWithFunction  = (e) => {
    savePDF(componentRefp.current, { 
      paperSize:  "auto", 
      margin: 40,
        scale: 0.8,
    });
  }
  
  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="invoice-wrapper">
        <PageTitleBar title="Receipt" match={props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-9 mx-auto" style={{width:'auto'}}>
          {"2022-04-01" <= receipts.receipt_date && (
            <>
            
              

              {/* 1st page  */}
                <RctCard>
                   <div 
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 4
                        ? "none" : "",
                    }}
                  className="invoice-head text-right">
                    <ul className="list-inline">
                      <li>
                        <a  href={baseURL+"/download-receipts?id=" + theId}>
                          <i className="mr-10 ti-download"></i> Download
                        </a>
                      </li> 
                    
                      <li>


                      {receipts!==null && (typeof (receipts.individual_company) !== 'undefined') && receipts.individual_company.indicomp_email!==null &&   
                      <a onClick={(e) => sendEmail(e)} >
                        
                          <i className="mr-10 ti-email"></i> Email<br/>
                          {receipts.receipt_email_count == null &&
                            <small style={{fontSize:'10px'}}>Email Sent 0 Times</small>
                          }
                          {receipts.receipt_email_count !== null &&
                            <small style={{fontSize:'10px'}}>Email Sent {receipts.receipt_email_count} Times </small>
                          }
                        </a>

                    }
                      {receipts!==null && (typeof (receipts.individual_company) !== 'undefined') && receipts.individual_company.indicomp_email == null &&   
                      <>
                      <p style={{color:'red'}}><i className="mr-10 ti-email"></i> Email not found</p>
                          <Button
                          onClick={() => openmodal()}
                          className="mr-10 mb-10"
                          color="success"
                        >
                          Add Email
                        </Button>
                      
                      </>
                          
                    }
            
                    
                      </li>
                      
                      <li>
                        
                        
                            <a  onClick={(e) => printReceipt(e)}>
                              <i className="mr-10 ti-printer"></i> Print Receipt
                            </a>
                        
                        
                      </li> 
                      
                      <li>
                        <ReactToPrint
                          trigger={() => (
                            <a>
                              <i className="mr-10 ti-printer"></i> Print Letter
                            </a>
                          )}
                          content={() => componentRef.current}
                        />
                      </li>
                    </ul>
                  </div> 
                  <div className="p-10" ref={componentRefp} style={{margin: '5px'}}>
                    <img
                        src={require("Assets/receipt/fts_wm.png")}
                        alt="water mark"
                        style={{width:'20cm',height:'20cm',position:'absolute', top:'130px',left:'100px'}}
                        />
                    <div className="d-flex justify-content-between" style={{borderLeft:'1px solid black',borderRight:'1px solid black',borderTop:'1px solid black'}}>
                      <div className="invoice-logo ">
                        <img
                          src={require("Assets/receipt/fts.png")}
                          alt="session-logo"
                          width="80"
                          height="80"
                          style={{margin:'20px',marginLeft:'50px'}}
                        />
                      </div>
                      <div className="address text-center">
                      <img
                          src={require("Assets/receipt/top.png")}
                          alt="session-logo"
                          width="320px"
                          style={{margin:'10px'}}
                        />
                        <h2>
                          <strong>
                            <b>{chapter.chapter_name}</b>
                          </strong>
                        </h2>
                      </div>
                      <div className="invoice-logo mb-30 text-right">
                        <img
                          src={require("Assets/receipt/ekal.png")}
                          alt="session-logo"
                          width="80"
                          height="80"
                          style={{margin:'20px',marginRight:'50px'}}
                        />
                      </div>
                    </div>
                    <div className="text-center" style={{borderLeft:'1px solid black',borderRight:'1px solid black',borderBottom:'1px solid black',marginTop:'-55px'}}>
                      <div className="address text-center">
                        <label style={{paddingLeft:'30px',paddingRight:'30px',fontSize:'11px',marginBottom: '0px'}}>
                          {chapter.chapter_address},{chapter.chapter_city} -{" "}
                          {chapter.chapter_pin}, {chapter.chapter_state}
                        </label>{" "}
                      
                        <label style={{fontSize: '11px',marginBottom: '0px'}}>
                          Email: {chapter.chapter_email} | {chapter.chapter_website}{" "}
                          | Ph : {chapter.chapter_phone} | Mob :{" "}
                          {chapter.chapter_whatsapp}
                        </label>
                        <br />
                      </div>
                    </div>
                    <div className="text-center" style={{borderLeft:'1px solid black',borderRight:'1px solid black'}}>
                      <label style={{fontSize:'14px',marginBottom:'2px',marginTop:'2px'}}>
                        <small>
                          Head Office: Ekal Bhawan, 123/A, Harish Mukherjee Road,
                          Kolkata-26. Web: www.ftsindia.com Ph: 033 - 2454
                          4510/11/12/13 PAN: AAAAF0290L
                        </small>
                      </label>
                      <br />
                    </div>

                    <div className="table-responsive">
                      <Table className="table table-borderless" style={{marginBottom:'0px', borderCollapse: 'collapse'}}>
                        <TableBody>
                          <TableRow>
                            <TableCell style={td_top}>&nbsp;&nbsp;Received with thanks from :</TableCell>
                            <TableCell style={td_top_mid}>&nbsp;&nbsp;Receipt No.</TableCell>
                            <TableCell style={td_top_right}>:</TableCell>
                            <TableCell style={td_top_right1}>
                              <label style={label}>
                                <b>{receipts.receipt_ref_no}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            
                            <TableCell style={{borderLeft: "1px solid black",
                                lineHeight: "1.5",
                                paddingLeft: "30px",
                                paddingTop: "0px",
                                paddingBottom: "0px ",
                                padding: '4px'}} rowSpan="2">
                              <label style={label}>
                                {Object.keys(receipts).length != 0 && (
                                  <div style={{marginTop: '-30px', marginLeft: '10px'}}>
                                    <p style={p_text}>
                                    {receipts.individual_company.indicomp_type != "Individual" && (
                                      <>
                                      M/s
                                      </>
                                    )}
                                    {receipts.individual_company.indicomp_type == "Individual" && (
                                      <>
                                      {receipts.individual_company.title}
                                      </>
                                    )}
                                      {" "}
                                      {

                        
                                        receipts.individual_company
                                          .indicomp_full_name
                                      }
                                    </p>
                                    {receipts.individual_company.hasOwnProperty(
                                      "indicomp_off_branch_address"
                                    ) && (
                                      <div>
                                        <p style={p_text}>
                                          {
                                            receipts.individual_company
                                              .indicomp_off_branch_address
                                          }
                                        </p>
                                        <p style={p_text}>
                                          {
                                            receipts.individual_company
                                              .indicomp_off_branch_area
                                          }
                                        </p>
                                        <p style={p_text}>
                                          {
                                            receipts.individual_company
                                              .indicomp_off_branch_ladmark
                                          }
                                        </p>
                                        <p style={p_text}>
                                          {
                                            receipts.individual_company
                                              .indicomp_off_branch_city
                                          }
                                          -{" "}
                                          {
                                            receipts.individual_company
                                              .indicomp_off_branch_pin_code
                                          }
                                          ,
                                          {
                                            receipts.individual_company
                                              .indicomp_off_branch_state
                                          }
                                        </p>
                                      </div>
                                    )}
                                    {receipts.individual_company.hasOwnProperty(
                                      "indicomp_res_reg_address"
                                    ) && (
                                      <div>
                                        <p style={p_text}>
                                          {
                                            receipts.individual_company
                                              .indicomp_res_reg_address
                                          }
                                        </p>
                                        <p style={p_text}>
                                          {
                                            receipts.individual_company
                                              .indicomp_res_reg_area
                                          }
                                        </p>
                                        <p style={p_text}>
                                          {
                                            receipts.individual_company
                                              .indicomp_res_reg_ladmark
                                          }
                                        </p>
                                        <p style={p_text}>
                                          {
                                            receipts.individual_company
                                              .indicomp_res_reg_city
                                          }
                                          -{" "}
                                          {
                                            receipts.individual_company
                                              .indicomp_res_reg_pin_code
                                          }
                                          ,
                                          {
                                            receipts.individual_company
                                              .indicomp_res_reg_state
                                          }
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </label>
                              
                            </TableCell>
                            <TableCell style={td_top_mid1}>&nbsp;&nbsp; Date</TableCell>
                            <TableCell style={td_top_right}>:</TableCell>
                            <TableCell style={td_top_right1}>
                              <label style={label}>
                                <b>{Moment(receipts.receipt_date).format('DD-MM-YYYY')}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={td_top_mid}>&nbsp;On account of</TableCell>
                            <TableCell style={td_top_right}>:</TableCell>
                            <TableCell style={td_top_right1}>
                              <label style={label}>
                                <b>{receipts.receipt_donation_type}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                          <TableCell style={td_left}>
                            &nbsp;&nbsp;
                            {country.map((coustate,key) => (
                                <>
                                  {coustate.state_country == "India" && (
                                    <>
                                      PAN No :{" "}
                                    </>
                                  )}
                                </>
                              ))}
                              
                            
                            
                              <label style={label}>
                                <b>
                                  {Object.keys(receipts).length != 0 && (
                                    <div>
                                      {country.map((coustate1,key) => (
                                        <>
                                          {coustate1.state_country == "India" && (
                                        
                                        <p style={{fontSize:'13px'}}>
                                          {
                                            receipts.individual_company
                                              .indicomp_pan_no
                                          }
                                        </p>
                                        )}
                                        </>
                                      ))} 
                                    </div>
                                  )}
                                </b>
                              </label>
                            </TableCell>
                            <TableCell style={td_top_mid1}>&nbsp;&nbsp; Pay Mode</TableCell>
                            <TableCell style={td_top_right}>:</TableCell>
                            <TableCell style={td_top_right1}>
                              <label style={label}>
                                <b>{receipts.receipt_tran_pay_mode}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={td_left}>
                            &nbsp;&nbsp; Amount in words :{" "}
                              <label style={label}>
                                <b style={{textTransform: 'capitalize'}}>{amountInWords} Only</b>
                              </label>
                            </TableCell>
                            <TableCell style={td_top_mid1}>&nbsp;&nbsp;Amount</TableCell>
                            <TableCell style={td_top_right}>:</TableCell>
                            <TableCell style={td_top_right1}>
                              Rs.{" "}
                              <label style={label}>
                                <b >{receipts.receipt_total_amount}</b>
                              </label>{" "}
                              /-
                              <br />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={td_left} colSpan="4">
                            &nbsp;&nbsp;Reference :{" "}
                              <label style={label}>
                                <b style={{fontSize: '13px'}}>{receipts.receipt_tran_pay_details}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan="1" style={{borderLeft:'1px solid black', borderBottom:'1px solid black'}}>
                              {receipts.receipt_exemption_type == "80G" && (
                                <div style={{fontSize: '13px'}}>
                                
                                  &nbsp;&nbsp; 
                                  {receipts.receipt_date > "2021-05-27"   && (
                                    <>
                                      Donation is exempt U/Sec.80G of the <br/>Income Tax Act 1961 vide Order No. AAAAF0290LF20214 Dt. 28-05-2021.
                                    </>
                                  )}
                                  {receipts.receipt_date <= "2021-05-27"   && (
                                    <>
                                      This donation is eligible for deduction U/S 80(G) of the
                                  <br />
                                  &nbsp;&nbsp; 
                                      Income Tax Act 1961 vide order NO:DIT(E)/3260/8E/73/89-90 Dt. 13-12-2011.
                                    </>
                                  )}
                                </div>
                              )}
                              {receipts.receipt_exemption_type != "80G" && (
                                <div style={{fontSize: '13px'}}>
                                  
                                </div>
                              )}
                            </TableCell>
                            <TableCell colSpan="3" style={{borderBottom:'1px solid black', borderRight:'1px solid black', textAlign:'right',fontSize: '13px'}}>
                              For Friends of Tribals Society
                              <br />
                              <br />
                              {authsign.length >0 && (
                                <>
                                  {authsign.map((sig,key) => (
                                <>
                                  {sig.indicomp_full_name}
                                </>
                              ))}
                                </>
                              )}
                              <br />
                              {chapter.auth_sign}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </RctCard>
              
            </>
          )}
          

          
            <Modal isOpen={showmodal} toggle={() => closegroupModal()}>
        <ModalHeader toggle={() => closegroupModal()}>Donor Email</ModalHeader>
        <ModalBody>
          <Selectdonor id={receipts.indicomp_fts_id} />
          
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
          </div>
        </div>
      </div>
      </>}
    </div>
  );
}
