
import React, { useState } from "react";
import Axios from "axios";

import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

import ExamplesNavbarREGISTER from "components/Navbars/ExamplesNavbarREGISTER.js";

import { ToastContainer, toast } from 'react-toastify';

function RegisterPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();



  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    console.log('started in regPAGE.js');
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });


  const registerFun = async (e) => {

    e.preventDefault();
    try {

      if (email == "" || email == undefined || email == null) {
        toast.error('Username Field should not be empty', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return
      }

      if (displayName == "" || displayName == undefined || displayName == null) {
        toast.error('Display Name Field should not be empty', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return
      }

      if (password == "" || password == undefined || password == null) {
        toast.error('PASSWORD Field should not be empty', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return
      }

      if (passwordCheck == "" || passwordCheck == undefined || passwordCheck == null) {
        toast.error('Re-Enter Password Field should not be empty', {
          position: "bottom-right",
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

      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("https://tinyweb.herokuapp.com/users/register", newUser);
      const loginRes = await Axios.post("https://tinyweb.herokuapp.com/users/login", {
        email,
        password,
      });
      toast.success('Registered Succesfully , Login to continue', {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
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
      <ExamplesNavbarREGISTER />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/federico-beccari.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <ToastContainer />
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto" style={{
                background: "black"
              }}>
                <h3 className="title mx-auto">Welcome</h3>


                <Form className="register-form">
                  <label>Username</label>
                  <Input onChange={(e) => setEmail(e.target.value)} placeholder="Username" type="text" />

                  <label>DISPLAY NAME</label>
                  <Input onChange={(e) => setDisplayName(e.target.value)} placeholder="display name" type="text" />

                  <label>Password</label>
                  <Input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />

                  <label>Re-enter password</label>
                  <Input onChange={(e) => setPasswordCheck(e.target.value)} placeholder="Re-enter password" type="password" />

                  <Button onClick={registerFun} block className="btn-round" color="danger">
                    Register
                  </Button>
                </Form>


              </Card>
            </Col>
          </Row>
        </Container>
        
      </div>
    </>
  );
}

export default RegisterPage;
