import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

import Home from './components/Home'
import Boards from './components/Boards'
import Board from './components/Board'

import { authenticate } from './actions/user-actions'

class App extends Component {
  componentWillMount(){
    this.props.authenticate()
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/boards" component={Boards} />
            <Route exact path={"/boards" + "/:boardId"} component={Board} />
        </Switch>
      </Router>
    );
  }
}


export default connect(null, { authenticate })(App);