
import React, {  useContext } from "react";
import UserContext from "../../context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ExamplesNavbarLOGGEDIN from "components/Navbars/ExamplesNavbarLOGGEDIN.js";
import ExamplesNavbarLOGGEDOUT from "components/Navbars/ExamplesNavbarLOGGEDOUT.js";
import LandingPageHeaderLOGGEDIN from "components/Headers/LandingPageHeaderLOGGEDIN.js";
import LandingPageHeaderLOGGEDOUT from "components/Headers/LandingPageHeaderLOGGEDOUT.js";
import SectionNucleoIconsCUSTOM from "views/index-sections/SectionNucleoIconsCUSTOM.js";
import SectionNucleoIconsDELETE from "views/index-sections/SectionNucleoIconsDELETE.js";
import SectionNucleoIconsTABLE from "views/index-sections/SectionNucleoIconsTABLE.js";





function LandingPage() {


  const { userData, setUserData } = useContext(UserContext);

  
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });



  return (
    <div className="page">
      {userData.user ? (
        <div>
          
          <ExamplesNavbarLOGGEDIN />
          <LandingPageHeaderLOGGEDIN />
          <ToastContainer />
        
          
          <SectionNucleoIconsCUSTOM />
          <SectionNucleoIconsTABLE />
          <SectionNucleoIconsDELETE />

          <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by 
          </h6>
        </div>
          
          

        </div>
      ) : (

          <>
            <ExamplesNavbarLOGGEDOUT />
            <LandingPageHeaderLOGGEDOUT />
            <ToastContainer />
            <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by 
          </h6>
        </div>

          </>
        )}
    </div>
  );
}

export default LandingPage;
