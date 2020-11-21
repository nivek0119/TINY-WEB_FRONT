
import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";


import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import ExamplesNavbarLOGIN from "components/Navbars/ExamplesNavbarLOGIN.js";

import { ToastContainer, toast } from 'react-toastify';

function RegisterPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const { setUserData } = useContext(UserContext);
  const history = useHistory();


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    console.log('started in regPAGE.js');
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });


  const LoginFun = async (e) => {
    e.preventDefault();
    try {

      if (email=="" || email==undefined || email==null) {
        toast.error('EMAIL Required for login ..!! 🤦‍♂️', {
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

      if (password=="" || password==undefined || password==null) {
        toast.error('How can we Log-in You without Password ..?? 🤨', {
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

      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "https://tinyweb.herokuapp.com/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
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
      <ExamplesNavbarLOGIN />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <div className="filter" />
        <ToastContainer />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome</h3>

                <Form className="register-form">
                  <label>Email</label>
                  <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="text" />

                  <label>Password</label>
                  <Input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />

                  <Button onClick={LoginFun} block className="btn-round" color="danger">
                    LOG ME IN BRO..
                  </Button>
                </Form>

                
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by 
          </h6>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
