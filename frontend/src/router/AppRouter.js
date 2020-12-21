import React from 'react';
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

import {Login} from '../components/auth/Login';
import {Register} from '../components/auth/Register';
import {NavbarHeader} from '../components/navbar/Navbar';
import {Graphic} from '../components/graphic/index';
import {Users} from '../components/users/Users';

import {useSelector} from 'react-redux'
import {PublicRoute} from './PublicRoute';
import {PrivateRoute} from './PrivateRoute';

export const AppRouter = () => {
    const {uid} = useSelector(state => state.auth);

    return (
        <Router>
            {uid && <NavbarHeader></NavbarHeader>}
            <div>
                <Switch>
                    <PublicRoute exact path="/login" component={Login} isAuthenticated={!!uid}/>
                    <PublicRoute
                        exact
                        path="/register"
                        component={Register}
                        isAuthenticated={!!uid}/>

                    <PrivateRoute exact path="/" component={Users} isAuthenticated={!!uid}/>
                    <PrivateRoute
                        exact
                        path="/graphic"
                        component={Graphic}
                        isAuthenticated={!!uid}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}
