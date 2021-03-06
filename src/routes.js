import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './pages/Main'
import Box from './pages/Box'

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/boxes/:id" component={Box}/>
        </Switch>
    </Router>
)

export default Routes