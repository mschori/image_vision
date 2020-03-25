import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import GoogleVision from "./GoogleVisionApi/GoogleVision";
import './App.css';

const App = () => {
    return <Router>
        <Switch>
            <Route path="/">
                <GoogleVision/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    </Router>
};

export default App;