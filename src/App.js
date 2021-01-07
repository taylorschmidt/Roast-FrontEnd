import React from "react";
import {Switch, Route} from 'react-router-dom'



//Components imports
import Home from "./components/Home"
import Main from "./components/Main"
import Layout from "./components/common/Layout"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Profile from "./components/Profile"
import Cafe from "./components/Cafe"
import About from "./components/About"
import Favorites from "./components/Favorites"

import "./css/App.css";

const App = () => {
  return(
    <Layout>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path={'/home'} component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
          
        <Route exact path="/register" component={Signup} />
        <Route exact path="/profile" component={Profile}/>
        <Route path='/cafe' component={Cafe} />
        <Route path='/favorites' component={Favorites}/>
      </Switch>
    </Layout>
  )
}



export default App;
