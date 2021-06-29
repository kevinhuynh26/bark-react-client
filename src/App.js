import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import home from "./pages/home.js";
import users from "./pages/users.js";
import signup from "./pages/signup.js";
import login from "./pages/login.js";
import Navbar from "./components/Navbar.js";
import themeFile from "./util/themeFile.js";
import AuthRoute from "./util/AuthRoute.js";


import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";
import JwtDecode from "jwt-decode";
import axios from "axios";

const theme = createMuiTheme(themeFile);

function App() {
  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = JwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
      window.location.href = "/login";
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUserData());
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/signup" component={signup} />
              <AuthRoute exact path="/login" component={login} />
              <Route exact path="/users/:handle" component={users} />
              <Route exact path="/users/:handle/bark/:barkID" component={users} />              
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
