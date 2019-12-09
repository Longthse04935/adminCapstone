import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Template from './admin/Template';
import Account from './admin/Account';
import ChartRevenue from './admin/ChartRevenue';
import ChartTrip from './admin/ChartTrips';
import CatNLocation from './admin/CateNLoc';
import GuiderContract from './admin/GuiderContract';
import PostGuider from './admin/PostGuider';
import Review from './admin/Review';
import Login from './auth/Login';
import Logout from './auth/Logout';
import AdminLayout from './layout/AdminLayout';
import PublicLayout from './layout/PublicLayout';
import PrivateRoute from './layout/PrivateRoute';
import PublicRoute from './layout/PublicRoute';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      decisionPage:false,
      JSX: <Template handleClick={(e)=>this.handleClick(e)}/>
    }
  }

  handleClick = (event) =>{
    this.setState({ decisionPage: !this.state.decisionPage });
    event.preventDefault();
  };
  
  render() {
    let {decisionPage,JSX} = this.state;
    return (
      <Router>
        <Switch>
          <PrivateRoute path='/guiderContract' layout={AdminLayout} component={GuiderContract} exact />
          <PrivateRoute path='/' layout={AdminLayout} component={GuiderContract} exact />
          <PrivateRoute path='/account' layout={AdminLayout} component={Account} exact />
          <PrivateRoute path='/chartRevenue' layout={AdminLayout} component={ChartRevenue} exact />
          <PrivateRoute path='/chartTrip' layout={AdminLayout} component={ChartTrip} exact />
          <PrivateRoute path='/cateNLoc' layout={AdminLayout} component={CatNLocation} exact />
          <PrivateRoute path='/guider/:guider_id' layout={AdminLayout} component={PostGuider} exact />
          <PrivateRoute path='/review/:post_id' layout={AdminLayout} component={Review} exact />


          <PublicRoute path='/users/login' layout={PublicLayout} component={Login} />
          <PublicRoute path='/users/logout' layout={PublicLayout} component={Logout} />
        </Switch>
      </Router>
    );
  }
}

export default App;