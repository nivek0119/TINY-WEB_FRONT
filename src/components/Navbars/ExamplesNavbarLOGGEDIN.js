
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import UserContext from "../../context/UserContext";
import { Alert } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";

function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });



  const logout = () => {
    console.log("cliscked logOut");
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };


  return (
    
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/landing-page"
            target="blank"
            tag={Link}
          >
            {/* <img src="Logo.png" /> */}
            <img style={{
              height: 50,
              width: 200,
            }} src="Logo.png" />
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>

            <NavItem>
              <Button onClick={logout} className="btn-round" color="neutral" type="button" outline>
              <b style={{
                color:"black",
                paddingtop:1
              }}>LOGOUT</b>
            </Button>
            </NavItem>


            {/* <NavItem>

            <Button onClick={Login} className="btn-round" color="neutral" type="button">
              <b style={{
                color:"black",
                paddingtop:1
              }}>LOGIN</b>


            <Button onClick={Login} className="btn-round" color="neutral" type="button" outline>
              LOGIN 
            </Button>
            </NavItem>
            
            {/* <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.github.com/CreativeTimOfficial?ref=creativetim"
                target="_blank"
                title="Star on GitHub"
              >
                <i className="fa fa-github" />
                <p className="d-lg-none">GitHub</p>
              </NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default ExamplesNavbar;
