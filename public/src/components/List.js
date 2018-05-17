import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getTasks } from '../actions/data-actions'

class List extends Component {

    componentWillMount() {
        this.props.getTasks({
            boardId: this.props.list.boardId, 
            listId: this.props.list._id
        })
    }
  render() {
    return (
      <div className="List">
        <h1>{this.props.list.name}</h1>
        {(this.props.tasks[this.props.list._id]) ? 
        this.props.tasks[this.props.list._id].map(task => (
            <div>
                <p>{task.body}</p>
            </div>
        ))
        : (!this.props.tasks[this.props.list._id]) ?
            <div>
                <p>No Tasks</p>
            </div>
        :
        <div><p>Loading</p></div>
        }
      </div>
    );
  }
}

// ownProps allows you to pass props through the normal way and through redux
const mapStateToProps = (state, ownProps) => ({
    tasks: state.data.tasks
  })
  
export default connect(mapStateToProps, { getTasks })(List);