import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getTasks, addTask, deleteList } from '../actions/data-actions'

import Task from '../components/Task'

class List extends Component {

    componentWillMount() {
        this.props.getTasks({
            boardId: this.props.list.boardId, 
            listId: this.props.list._id
        })
    }
  render() {
    const daTasks = this.props.tasks[this.props.list._id] ? 
            this.props.tasks[this.props.list._id].map(task => (
                <Task key={task._id} task={task} />
            ))
            : <div></div>
    return (
      <div className="List">
        <div className="flexor space-between">
            <div><h1>{this.props.list.name}</h1></div>
            <div className="pointer" onClick={() => this.props.deleteList(this.props.list)}><p>X</p></div>
        </div>
        <div>
            <form className="" onSubmit={(event) => this.props.addTask(this.props.list, event)}>
                <input className="width100" placeholder="Add Task" name="task" />
                <button type="submit" className="btn btn-block btn-primary">Task</button>
            </form>
        </div>
        {daTasks}
      </div>
    );
  }
}

// ownProps allows you to pass props through the normal way and through redux
const mapStateToProps = (state, ownProps) => ({
    tasks: state.data.tasks || []
  })
  
export default connect(mapStateToProps, { getTasks, addTask, deleteList })(List);