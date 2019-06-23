import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LaunchesPage from "../pages/LaunchesPage";
import LaunchPage from "../pages/LaunchPage";
import AboutPage from "../pages/AboutPage";

export class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={LaunchesPage} />
                    <Route path="/launch/:flight_number" component={LaunchPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route component={LaunchesPage} />
                </Switch>
            </Router>
        )
    }
}
export default AppRouter;