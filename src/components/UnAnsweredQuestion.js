import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addVote } from '../actions/authedUser';
import handleSubmitVote from '../actions/questions';
import { addUserVote } from '../actions/users';




class UnAnsweredQuestion extends Component {
    state = { vote: '' }
    handleChange = e => {
        const option = e.target.value;

        this.setState({
            vote: option
        });

    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch, _question, authedUser } = this.props

        dispatch(handleSubmitVote({
            authedUser: authedUser.id,
            qid: _question.id,
            answer: this.state.vote
        })).then(dispatch(addVote({
            qid: _question.id,
            answer: this.state.vote
        }))).then(dispatch(addUserVote({
            qid: _question.id,
            answer: this.state.vote,
            auth: authedUser.id
        })))

        this.setState({
            vote: ''
        });
    }

    render() {
        const { _question, user } = this.props

        return (
            <div>
                <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.avatarURL}`}
                    className='avatar'
                />
                <p>{user.name} asks..  </p>
                <p>would you rather?</p>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="radio"
                        name="vote"
                        value="optionOne"
                        onChange={this.handleChange}
                    />
                    {_question.optionOne.text}
                    <br />

                    <input
                        type="radio"
                        name="vote"
                        value="optionTwo"
                        onChange={this.handleChange}
                    />
                    {_question.optionTwo.text}
                    <br />

                    <button
                        className='btn'
                        type='submit'
                        disabled={this.state.vote === ''}
                    >
                        Vote
                    </button>
                </form>
            </div>
        )
    }
}
function mapStateToProps({ authedUser, users }, question) {
    const _question = question.question
    const user = users[_question.author]
    return {
        authedUser,
        _question,
        user

    }

}

export default connect(mapStateToProps)(UnAnsweredQuestion)
