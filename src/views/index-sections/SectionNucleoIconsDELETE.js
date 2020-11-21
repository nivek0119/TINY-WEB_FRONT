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


  const { userData, setUserData } = useContext(UserContext);
  const [deleteCustomLink, setdeleteCustomLink] = useState();

  const deleteCustomLinkFunction = async (e) => {
    try {

      e.preventDefault();

      if (deleteCustomLink == "" || deleteCustomLink == undefined || deleteCustomLink == null) {
        toast.error('Empty Custom BackHalf Cant be Deleted 🙄', {
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



      let config = {
        headers: {
          "x-auth-token": userData.token,
        },
      };

      let data = {
        email: userData.user.email,
        short: deleteCustomLink,
      };

      var t = await Axios.post(
        "http://localhost:5000/users/deleteCustom",
        data,
        config
      );

      toast.error('Deleted Your Shortened URL NIGGA..!! 😔', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
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
          <h1>DELETE YOUR CUSTOM BACKHALF</h1>
          <br />
          <h3>Wanna Delete Your Shortened Link ??</h3>
          <h4>Just Enter Backhalf below.</h4>
          <FormGroup>

            <br />
            <br />


            <Label for="exampleEmail"> INPUT BACKHALF</Label>
            <Input
              type="text"
              id="exampleEmail"
              placeholder="Enter BackHalf Here"
              onChange={(e) => setdeleteCustomLink(e.target.value)}
            />

            <br />
            <br />


          </FormGroup>

          <Button onClick={deleteCustomLinkFunction} color="primary" type="submit">
            DELETE YOUR SHORTENED LINK
      </Button>
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionNucleoIcons;
