import React from "react";
import {Switch, Route} from 'react-router-dom'



//Components imports
import Home from "./components/Home"
import Layout from "./components/common/Layout"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Profile from "./components/Profile"

import "./css/App.css";

const App = () => {
  return(
    <Layout>
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/profile" component={Profile}/>
      </Switch>
    </Layout>
  )
}


export default App;
