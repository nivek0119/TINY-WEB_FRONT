
import { useHistory } from "react-router-dom";
import {
  Button,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";




// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  const history = useHistory();

  const [full, setfull] = useState();
  const [short, setshort] = useState();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  const submitQuick = async (e) => {
    try {

      e.preventDefault();
      // console.log("presesd submit Quick");
      console.log(full);
      // const email = userData.user.email;
      const newQuick = { full };
      const quickRegister = await Axios.post(
        "http://localhost:5000/users/quick",
        newQuick
      );
    } catch (err) {
      //err.response.data.msg && seterror(err.response.data.msg);
      console.log(err);
    }
  };

  
  // const Login = async (e) => {
  //   e.preventDefault();
  //   try {
  //     history.push("/Login-Page");
  //   } catch (err) {
  //     //err.response.data.msg && setError(err.response.data.msg);
  //   }
  // };

  // const Register = async (e) => {
  //   e.preventDefault();
  //   try {
  //     history.push("/Register-Page");
  //   } catch (err) {
  //     //err.response.data.msg && setError(err.response.data.msg);
  //   }
  // };

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/BackImg1.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        
        
        <Container>
          <div className="motto text-center">

          <h1>WELCOME NIGGA !!</h1>
            <br />
            <br />
            <br />
            
            <br />

              <FormGroup >
                <Input onChange={(e) => setfull(e.target.value)} placeholder="Enter Full URL Here" type="text" />
              </FormGroup>

              <Button onClick={submitQuick} className="btn-round" color="neutral" type="button" outline>
              BRO... SHORT THIS URL FOR ME
            </Button>


            
            {/* <br />
            <br />
            <br />
            <h3>OR SIMPLY</h3>
            <br />
            <br />
            <br />
            <Button onClick={Register} className="btn-round" color="neutral" type="button" outline>
              REGISTER 
            </Button>
            
            <Button onClick={Login} className="btn-round" color="neutral" type="button" outline>
              LOGIN 
            </Button> */}
            
          </div>
        </Container>
        
      </div>
    </>
  );
}

export default LandingPageHeader;
