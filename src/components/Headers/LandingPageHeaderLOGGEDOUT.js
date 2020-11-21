import { useHistory } from "react-router-dom";
import {
  Button,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Label,
} from "reactstrap";

import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LandingPageHeader() {
  let pageHeader = React.createRef();

  const history = useHistory();

  const [full, setfull] = useState();

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
      if (full=="" || full==undefined || full==null) {
        toast.error('Dont Dare To Proceed with Empty Input 😶', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return
      }
      
      if (!full.startsWith("https://")) {
        toast.error('Full link should start with " https:// " 🙃', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return
      }
      
      toast.info('Processing Please Wait ... 🤑🤑', {
        position: "bottom-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

      const newQuick = { full };
      const quickRegister = await Axios.post(
        "https://tinyweb.herokuapp.com/users/quick",
        newQuick
      );

      navigator.clipboard.writeText(quickRegister.data.short)

      toast.success('Shortened Your URL NIGGA..!! 😎 and Copied To Clipboard 😁', {
        position: "bottom-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

      
      toast.success("SHORTENED LINK : "+quickRegister.data.short, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });


    } catch (err) {
      toast.error(err.response.data.msg, {
        position: "bottom-right",
        autoClose: 6500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };

  const BackImg = ["assets/img/BackImg1.jpg"];

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

          <h1>YO NIGGA !!</h1>
            <br />
            <br />
            <br />
            
            <br />

              <FormGroup >
              <Label for="exampleEmail">ENTER THE FULL URL BELOW</Label>
                <Input onChange={(e) => setfull(e.target.value)} placeholder="Enter Full URL Here" type="text" />
              </FormGroup>

              <Button onClick={submitQuick} className="btn-round" color="neutral" type="button" outline>
              BRO... SHORT THIS URL FOR ME
            </Button>
            
          </div>
        </Container>
        
      </div>
    </>
  );
}

export default LandingPageHeader;
