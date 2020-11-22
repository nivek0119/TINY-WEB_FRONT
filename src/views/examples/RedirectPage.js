// reactstrap components
import { Container, Row } from "reactstrap";
import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Button } from 'reactstrap';
import {
  useParams
} from "react-router-dom";



function IndexHeader() {

  let params = useParams();
  const [title, settitle] = useState();
  const [fullLink, setfullLink] = useState();
  var [found, setfound] = useState();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        var getlink = "https://tinyweb.herokuapp.com/users/" + params.z

        const a = await Axios.post(getlink);
        setfound(a.data.found);
        settitle(a.data.title);
        setfullLink(a.data.fullUrl);


      } catch (error) {
        console.log(error);
      }
    };

    checkLoggedIn();
  }, []);

  const yes = async (e) => {
    try {
      e.preventDefault();
      window.location.href = fullLink;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
    <div className="page">
      {found ? (

        <div
          className="page-header section-dark"
          style={{
            backgroundImage:
              "url(" + require("assets/img/antoine-barres.jpg") + ")",
          }}
        >
          <div className="filter" />
          <div className="content-center">
            <Container>
              <div className="title-brand">

                <h1 >{title}</h1>
                <h4 >Full URL : {fullLink}</h4>

                <h3>Do you Want to redirect  ??</h3>

                <br></br>
                <h4>Click yes below</h4>
                <br></br>

                <div className="fog-low">
                  <img alt="..." src={require("assets/img/fog-low.png")} />
                </div>
                <div className="fog-low right">
                  <img alt="..." src={require("assets/img/fog-low.png")} />
                </div>
              </div>

            </Container>
          </div>


          <div
            className="moving-clouds"
            style={{
              backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
            }}
          />

          {/* <h3 className="category category-absolute">
            <Button
              className="title-brand"
              type="button"
              onClick={yes}
            > YES</Button>
          </h3> */}

<h3 className="category category-absolute">
            <Button
              className="title-brand"
              type="submit"
              onClick={yes}
              color="primary"
              
            > YES</Button>
          </h3>

        </div>
        
      ) : (
          <>
            <div
              className="page-header section-dark"
              style={{
                backgroundImage:
                  "url(" + require("assets/img/antoine-barres.jpg") + ")",
              }}
            >
              <div className="filter" />
              <div className="content-center">
                <Container>
                  <div className="title-brand">
                    <h1>NOTHING FOUND NIGGA .. !!</h1>
                    <h1>Recheck the Url</h1>
                    <div className="fog-low">
                      <img alt="..." src={require("assets/img/fog-low.png")} />
                    </div>
                    <div className="fog-low right">
                      <img alt="..." src={require("assets/img/fog-low.png")} />
                    </div>
                  </div>

                </Container>
              </div>
              <div
                className="moving-clouds"
                style={{
                  backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
                }}
              />
            </div>

          </>
        )}
    </div>
  );


}

export default IndexHeader;
