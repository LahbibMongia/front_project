import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// context & guards
import { AuthProvider } from "context/AuthContext.js";
import ProtectedRoute from "components/ProtectedRoute.js";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import ProfileBs from "views/auth/Profile-bs.js";
import EditProfileBs from "views/auth/EditProfile-bs.js"; 
import Index from "views/Index.js";

// Configure Axios Request Interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Configure Axios Response Interceptor to handle expired tokens
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        {/* add routes with layouts */}
        <ProtectedRoute path="/admin" component={Admin} adminOnly />
        <Route path="/auth" component={Auth} />
        {/* add routes without layouts */}
        <Route path="/landing" exact component={Landing} />
        <ProtectedRoute path="/profile" exact component={Profile} />
        <ProtectedRoute path="/profile-bs" exact component={ProfileBs} />
        <ProtectedRoute path="/edit-profile-bs" exact component={EditProfileBs} />
        <Route path="/" exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
