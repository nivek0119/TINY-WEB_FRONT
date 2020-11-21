
import React, { useState, useEffect } from "react";
import Axios from "axios";

import UserContext from "./context/UserContext";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import LoginPage from "views/examples/LoginPage.js";
import RedirectPage from "views/examples/RedirectPage";



export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post(
                "https://tinyweb.herokuapp.com/users/tokenIsValid",
                null,
                { headers: { "x-auth-token": token } }
            );
            if (tokenRes.data) {
                const userRes = await Axios.get("https://tinyweb.herokuapp.com/users/", {
                    headers: { "x-auth-token": token },
                });
                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <>
            <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }}>
            <div>
                <Switch>
                    
                    <Route
                        path="/landing-page"
                        render={(props) => <LandingPage {...props} />}
                    />
                    
                    <Route
                        path="/register-page"
                        render={(props) => <RegisterPage {...props} />}
                    />
                    <Route
                        path="/Login-page"
                        render={(props) => <LoginPage {...props} />}
                    />
                    <Route
                        path="/:z"
                        render={(props) => <RedirectPage {...props} />}
                    />
                    <Redirect to="/landing-page" />
                </Switch>
                </div>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}