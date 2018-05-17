import React, { Component } from 'react';
import { connect } from 'react-redux'

import { BrowserRouter, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
                <h1>This is awesome</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    user: state.user.user // matches todos in reducer/index.js and todo-reducer.js
  })
  
  export default connect(mapStateToProps, null)(Home);