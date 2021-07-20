import React, { Component } from 'react'
import { connect } from 'react-redux'
import UnAnsweredQuestion from './UnAnsweredQuestion'

class QuestionView extends Component {
    calculateVotes = (optionOne, optionTwo) => {
        let totalVotes = optionOne.votes.length + optionTwo.votes.length
        let op1 = {
            votes: optionOne.votes.length,
            percent: ((optionOne.votes.length / totalVotes) * 100).toFixed(2)
        }
        let op2 = {
            votes: optionTwo.votes.length,
            percent: ((optionTwo.votes.length / totalVotes) * 100).toFixed(2)
        }
        return { totalVotes, op1, op2 }
    }
    authedUserVote = (answers, questionId) => {
        return Object.keys(answers).includes(questionId) ? answers[questionId] : null
    }
    render() {
        const { id, optionOne, optionTwo } = this.props._question
        const { name, avatarURL } = this.props.user
        const { totalVotes, op1, op2 } = this.calculateVotes(optionOne, optionTwo)
        const { authedUser } = this.props
        const authedUserOption = this.authedUserVote(authedUser.answers, id)
        return (
            <div>
                {this.props.ui === 'answered' ?
                    <div>
                        <img
                            src={avatarURL}
                            alt={`Avatar of ${avatarURL}`}
                            className='avatar'
                        />
                        <p>{name} asks</p>
                        <p>would you rather?</p>
                        <ul>
                            <li>
                                <p>{optionOne.text}</p>
                                <span>
                                    votes:{op1.votes} out of {totalVotes} votes
                                </span><br />
                                <span>
                                    percentage: {op1.percent}%
                                </span><br />
                                {authedUserOption === 'optionOne' && <span>
                                    you voted here
                                </span>}
                            </li>
                            <li>
                                <p>{optionTwo.text}</p>
                                <span>
                                    votes:{op2.votes} out of {totalVotes} votes
                                </span><br />
                                <span>
                                    percentage: {op2.percent}%
                                </span><br />
                                {authedUserOption === 'optionTwo' && <span>
                                    you voted here
                                </span>}
                            </li>
                        </ul>

                    </div>
                    :
                    <UnAnsweredQuestion question={this.props._question} />
                }
            </div >
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props) {
    const answeredQ = questions.answeredQ
    const unAnsweredQ = questions.unAnsweredQ
    const { id } = props.match.params
    let ui = ''
    let _question = null

    let query = answeredQ.filter(q => q.id === id)

    if (query.length !== 0) {
        _question = query[0]
        ui = 'answered'
    } else {
        _question = unAnsweredQ.filter(q => q.id === id)[0]
        ui = 'unAnswered'
    }

    console.log('$$$$', _question.author, id, _question, ui)
    const user = users[_question.author]

    return {
        authedUser,
        user,
        _question,
        ui

    }
}
export default connect(mapStateToProps)(QuestionView)