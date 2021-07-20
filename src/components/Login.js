import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { handleLogin } from '../actions/shared';

class Login extends Component {
    state = {
        authID: '',
        redirect: false,
        to: '/'
    }
    handleChange = (e) => {
        this.setState({ authID: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, questions, users } = this.props
        const id = this.state.authID
        dispatch(handleLogin(id, users, questions))
        this.setState({ redirect: true });

        if (this.props.location.state)
            this.setState({ to: this.props.location.state.from });
    }

    render() {
        const { users } = this.props
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Select user to login:
                    <select onChange={this.handleChange}>
                        <option key={0} value={''}>select user:</option>
                        {Object.keys(users).map((key, i) => (
                            <option key={i} value={users[key].id}>{users[key].name}</option>
                        ))}
                    </select>
                </label>
                <br />
                <button
                    className='btn'
                    type='submit'
                    disabled={this.state.authID === ''}
                >
                    Login
                </button>
                {
                    this.state.redirect &&

                    <Redirect to={this.state.to} />

                }
            </form>

        );
    }
}
function mapStateToProps({ users, questions }) {
    return {
        users,
        questions
    }
}
export default withRouter(connect(mapStateToProps)(Login))