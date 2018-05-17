import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getBoard, getLists } from '../actions/data-actions'

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
                        {this.props.board ?
                        <h1>{this.props.board.name}</h1> :
                        <h1>Loading Lists</h1>}
                    </div>
                    {this.props.lists ?
                    this.props.lists.map(list  => (
                        <div key={list._id} className="col-md-4">
                            <div className="list-holder">
                                <List list={list} />
                            </div>
                        </div>
                    )):
                        <div></div>
                    }
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    board: state.data.board,
    lists: state.data.lists
  })
  
  export default connect(mapStateToProps, { getBoard, getLists })(Board);