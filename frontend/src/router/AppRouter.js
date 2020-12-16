import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';

import { Login } from '../components/auth/Login';
import {Register} from '../components/auth/Register';
import { NavbarHeader } from '../components/navbar/Navbar';
import { Graphic } from '../components/users/Graphic';
import { Users } from '../components/users/Users';

export const AppRouter = () => {
    return (
        <Router>
            <NavbarHeader></NavbarHeader>
            <div>
                <Switch>
                    <Route exact path="/login" component={ Login } />      
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/users" component={ Users } />      
                    <Route exact path="/graphic" component={ Graphic } />      
                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
