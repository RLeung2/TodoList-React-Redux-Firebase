import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { createTodoList } from '../../store/actions/actionCreators';

class HomeScreen extends Component {
    state = {
        name: 'Unknown',
        owner: 'Unknown',
        items: []
    }


    handleNewList = (e) => {
        e.preventDefault()
        this.props.createTodoList(this.state)

    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.id != "") {
            this.props.history.push('/todoList/' + this.props.id);
        }
    }



    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <br />
                        <h4 className="your_lists_heading">Your Lists</h4>
                        <TodoListLinks />
                    </div>
                    <div className="col s8">
                        <div className="banner right">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container right">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
        id: state.todoList.id
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        createTodoList: (todoList) => dispatch(createTodoList(todoList))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['created', 'desc'] },
    ]),
)(HomeScreen);