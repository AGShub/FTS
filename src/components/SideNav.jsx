import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  TableCellsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
const SideNav = ({ openSideNav, setOpenSideNav }) => {
  const sidenavRef = useRef(null);
  const { pathname } = useLocation();

  // Hardcoded sidenavType to "dark"
  const sidenavType = "dark";

  const sidenavTypes = {
    dark: "bg-blue-200",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // close sidebar when clicking outside

  useEffect(() => {
    function handClickOutside(e) {
      if (sidenavRef.current && !sidenavRef.current.contains(e.target)) {
        setOpenSideNav(false);
      }
    }

    document.addEventListener("mousedown", handClickOutside);
    return () => {
      document.removeEventListener("mousedown", handClickOutside);
    };
  }, [setOpenSideNav]);

  // Close sidebar on route change
  useEffect(() => {
    setOpenSideNav(false);
  }, [pathname, setOpenSideNav]);

  return (
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSideNav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-[272px] rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/brand" className="flex items-center justify-center p-3">
          <div className="flex items-center">
            <img
              src="https://agsrb.online/static/media/fts1.616cc323.png"
              alt="Logo"
              className="h-16 w-48"
            />
            
          </div>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSideNav(false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
         

          <li>
            <NavLink to="/home">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <FaRegUser className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Dashboard
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
     
          <li>
            <NavLink to="/donor-list">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <LuUsers className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Donor
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/member-list">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <LuUsers className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Member
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          
          

          
        </ul>
      </div>
      <div className=" fixed bottom-5 left-1/4 font-bold text-blue-gray-700 border-b border-dashed border-black   flex items-center ">Version: 1.0.5</div>
    </aside>
   
  );
};
export default SideNav;
