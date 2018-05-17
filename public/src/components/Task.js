import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getComments, addComment } from '../actions/data-actions'

class Task extends Component {
    componentWillMount() {
        this.props.getComments({
            boardId: this.props.task.boardId, 
            listId: this.props.task.listId,
            taskId: this.props.task._id
        })
    }

    render() {
        return (
            <div className="marg-top">
                <div className="">
                <div>
                <h4>{this.props.task.body}</h4>
                </div>
                </div>
                {this.props.comments[this.props.task._id] ? 
                this.props.comments[this.props.task._id].map(comment => (
                    <div key={comment._id}>
                        <h6>{comment.body}</h6>
                    </div>
                ))
                : (this.props.comments[this.props.task._id] === undefined) ?
                  <div></div>
                : <div></div>
                }
                <div>
                    <form className="" onSubmit={(event) => this.props.addComment(this.props.task, event)}>
                        <textarea className="width100" placeholder={"Add Comment to " + this.props.task.body} name="comment"></textarea>
                        <button type="submit" className="btn btn-block btn-success">Comment</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    comments: state.data.comments || []
  })
  
export default connect(mapStateToProps, { getComments, addComment })(Task);