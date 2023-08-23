import React from 'react';
import { Pay } from './Pay';
import { Success } from './Success';
import {Route, Router} from 'react-router-dom' 

const Apps = () => { 
    return( 
        <Router >
                <Route path="/pay">
                    <Pay />
                </Route>
                <Route path="/success">
                    <Success />
                </Route>
        </Router>
    );
}

export {Apps};