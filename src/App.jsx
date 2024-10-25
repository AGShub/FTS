import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../src/pages/profile/Profile"
import ChangePassword from  "./pages/profile/ChangePassword"





import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Home from "./pages/dashboard/Home";
import DonorList from "./pages/donor/DonorList";
import AddIndivisual from "./pages/donor/AddIndivisual";
import AddCompany from "./pages/donor/AddCompany";
import MemberList from "./pages/member/MemberList";
import DonorView from "./pages/donor/DonorView";
import ReceiptDetails from "./pages/donor/ReceiptDetails";
import ReciptList from "./pages/donor/ReciptList";
import DonorEdit from "./pages/donor/DonorEdit";
import ReceiptView from "./pages/donor/ReceiptView";


const App = () => {
  return (
    <>
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/home" element={<Home />} />
        <Route path="/donor-list" element={<DonorList />} />
        <Route path="/add-indivisual/:id" element={<AddIndivisual />} />
        <Route path="/add-indivisual" element={<AddIndivisual />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/add-company/:id" element={<AddCompany />} />
        <Route path="/member-list" element={<MemberList />} />
        <Route path="/donor-view/:id" element={<DonorView />} />
        <Route path="/receipt-details/:id" element={<ReceiptDetails />} />
        <Route path="/receipt-list/:id" element={<ReciptList />} />
        <Route path="/donor-edit/:id" element={<DonorEdit />} />
        <Route path="/receipt-view/:id" element={<ReceiptView />} />
        
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        {/* <Route
          path="*"
          element={<ProtectedRoute element={<Navigate to="/" />} />}
        /> */}
      </Routes>
   
    </>
  );
};

export default App;
