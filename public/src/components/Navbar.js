import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, authenticate, signupUser, logout } from '../actions/user-actions'
import history from '../history'

import { NavLink } from 'react-router-dom'

class Navbar extends Component {

    attemptLogin = () => {
        history.push('/boards')
        console.log('SUCCESS')
    }

    render() {
        return (
            <nav className="navbar">
                <div className="flexor width100 space-between vert-center">
                    <NavLink to='/'>
                        <div>
                            <img src="https://www.placehold.it/40x40"/>
                        </div>
                    </NavLink>
                    {this.props.user._id ?
                    <div>
                        <h5 className="marg0">{this.props.user.username}</h5>
                        <p onClick={this.props.logout} className="marg0 pointer">logout</p>
                    </div>
                    : //else
                    <div>
                        <p><span className="pointer" data-toggle="modal" data-target="#loginModal">Login</span> OR <span className="pointer" data-toggle="modal" data-target="#singupModal">Sign Up</span></p>
                    </div>}
                </div>
                {/* Login Modal */}
                <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sign Up</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(event) => this.props.loginUser(event).then(() => { this.attemptLogin() })}>
                                    <input type="text" name="email" placeholder="Email"/>
                                    <input type="password" name="password" placeholder="Password"/>
                                    <button className="btn btn-success" type="submit">Login</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-outline-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SignUp Modal */}
                <div className="modal fade" id="singupModal" tabIndex="-1" role="dialog" aria-labelledby="signupModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sign Up</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.props.signupUser}>
                                    <input type="text" name="username" placeholder="username"/>
                                    <input type="text" name="email" placeholder="Email"/>
                                    <input type="password" name="password" placeholder="Password"/>
                                    <button className="btn btn-success" type="submit">Register User</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-outline-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user // matches todos in reducer/index.js and todo-reducer.js
  })
  
export default connect(mapStateToProps, { loginUser, authenticate, signupUser, logout })(Navbar);