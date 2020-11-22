import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Button, Container} from "reactstrap";
import {
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';

import UserContext from "../../context/UserContext";

function SectionNucleoIcons() {

  const [full, setfull] = useState();
  const [short, setshort] = useState();
  const [title, settitle] = useState();
  const { userData, setUserData } = useContext(UserContext);
  

  const submitCustomloggedin = async (e) => {
    try {
      e.preventDefault();

      let config = {
        headers: {
          "x-auth-token": userData.token,
        },
      };

      if (full=="" || full==undefined || full==null) {
        toast.error("Empty Full URL's Aren't Shortened .. !! 🥱", {
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

      if (short=="" || short==undefined || short==null) {
        toast.error('short should not be empty', {
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

      if (title=="" || title==undefined || title==null) {
        toast.error('Title Should Not Be Empty 😣', {
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


      const email = userData.user.email;
      const newQuick = { full, short, email, title };
      const customRegister = await Axios.post(
        "https://tinyweb.herokuapp.com/users/custom",
        newQuick, config
      );

      navigator.clipboard.writeText("tiny-web.netlify.app/"+short)

      toast.success('Shortened Your URL NIGGA..!! 😎 and Copied To Clipboard 😁', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

      toast.success("SHORTENED LINK : "+"tiny-web.netlify.app/"+customRegister.data.addedLink.short, {
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

  return (
    <>
      <div className="section section-dark section-nucleo-icons">

        <Container>
          <h1>CREATE YOUR OWN CUSTOM BACKHALF</h1>
        <FormGroup>
            <Label for="exampleEmail">FULL URL</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Enter FULL URL"
              onChange={(e) => setfull(e.target.value)}
            />

            <br />
            <br />

            <Label for="exampleEmail">CUSTOM BACKHALF</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Enter Custom BackHalf ... Only Emojis Also Work 🤩"
              onChange={(e) => setshort(e.target.value)}
            />

            <br />
            <br />

            <Label for="exampleEmail">GIVE A TITLE</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Enter title"
              onChange={(e) => settitle(e.target.value)}
            />

          </FormGroup>

          <br />
          <br />

          <Button onClick={submitCustomloggedin} color="primary" type="submit">
            CREATE MY CUSTOM SHORT LINK
      </Button>
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionNucleoIcons;
