import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getBoards, addBoard, deleteBoard } from '../actions/data-actions'

import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'

class Boards extends Component {
    state = {
        show: false,
        showId: ''
    }
    componentWillMount(){
        this.props.getBoards()
    }
    showDelete = (boardId) => {
        this.setState(state => {
            if(state.show === false){
                state.show = true;
                state.showId = boardId
            } else {
                state.show = false;
                state.showId = ''
            }
            return state;
        })
    }
  render() {
    var boards = this.props.boards.map(board => (
        <div onMouseEnter={() => this.showDelete(board._id)} onMouseLeave={() => this.showDelete(board._id)} className="list-group-item flexor space-between vert-center" key={board._id}>
            <Link to={"/boards/" + board._id}>
                <h4>{board.name}</h4>
            </Link>
            {this.state.show && (this.state.showId === board._id) ?
            <div>
                <h3 className="pointer delete-board" onClick={() => this.props.deleteBoard(board._id)}>X</h3>
            </div> :
            <div><h3 className="white">X</h3></div>
            }
        </div>
    ));

    return (
      <div className="Boards">
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
                <div className="flexor space-between marg-top">
                    <div>
                        <h1>{this.props.user.username}'s Boards</h1>
                    </div>
                    <div>
                        <form onSubmit={this.props.addBoard} className="flexor vert-center">
                            <div className="form-group pad-r">
                                <input type="text" name="name" placeholder="Board Title"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">Add Board</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="list-group">
                    {boards}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    boards: state.data.boards, // matches todos in reducer/index.js and todo-reducer.js
    user: state.user.user
  })
  
  export default connect(mapStateToProps, { getBoards, addBoard, deleteBoard })(Boards);