import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getBoard, getLists, addList } from '../actions/data-actions'

import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import List from '../components/List'

class Board extends Component {

    componentWillMount() {
        const board = this.props.match.params.boardId
        this.props.getBoard(board).then(() => this.props.getLists(board));
    }

    render() {
        return (
        <div className="Board">
            <Navbar></Navbar>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="flexor vert-center space-between">
                            <div>
                                {this.props.board ?
                                <h1>{this.props.board.name}</h1> :
                                <h1>Loading Lists</h1>}
                            </div>
                            <div>
                                <Link to="/boards"><h5>Back to Boards</h5></Link>
                            </div>
                        </div>
                    </div>
                    {this.props.lists ?
                    this.props.lists.map(list  => (
                        <div key={list._id} className="col-md-4">
                            <div className="list-holder">
                                <List list={list} />
                            </div>
                        </div>
                    )):
                        <div className="col-md-4"><p>No Lists</p></div>
                    }
                    <div className="col-md-12">
                        <form className="flexor vert-center space-between" onSubmit={(event) => this.props.addList(this.props.board._id, event)}>
                            <div className="form-group width100">
                                <input className="width100 pad-r" type="text" placeholder="Add List" name="list" required/>
                            </div>
                            <div className="form-group">
                                <button type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    board: state.data.board,
    lists: state.data.lists || []
  })
  
  export default connect(mapStateToProps, { getBoard, getLists, addList })(Board);