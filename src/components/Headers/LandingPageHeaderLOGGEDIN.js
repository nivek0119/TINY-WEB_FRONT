
import { useHistory } from "react-router-dom";

import UserContext from "../../context/UserContext";

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
import { Alert } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();
  const history = useHistory();

  const [full, setfull] = useState();
  const [short, setshort] = useState();
  const [errormsg, seterrormsg] = useState();

  const { userData, setUserData } = useContext(UserContext);

  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);


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

  const submitQuickLoggedin = async (e) => {
    try {

      if (full == "" || full == undefined || full == null) {
        toast.error("Empty URL's Aren't Shortened .. !! 🥱", {
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

      e.preventDefault();
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
      // console.log("presesd submit Quick");
      //console.log(full);
      // console.log("dauidhuis");
      const email = userData.user.email;
      const newQuick = { full, email };
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

      navigator.clipboard.writeText(quickRegister.data.short)
      toast.success("SHORTENED LINK : " + quickRegister.data.short, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });


    } catch (err) {

      //seterrormsg(err.response.data.msg);
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

  //const notify = () => toast("Wow so easy !");

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/BackImg3.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />


        <Container>
          <div className="motto text-center">


            <h1>WELCOME {userData.user.displayName} !!</h1>
            <br />
            <br />
            <br />
            <br />

            <FormGroup >
              <Input onChange={(e) => setfull(e.target.value)} placeholder="Enter Full URL Here" type="text" />
            </FormGroup>

            <Button onClick={submitQuickLoggedin} className="btn-round" color="neutral" type="button" outline>
              BRO... SHORT THIS URL FOR ME
            </Button>

            <br />
            <br />
            <br />

          </div>
        </Container>

      </div>
    </>
  );
}

export default LandingPageHeader;
