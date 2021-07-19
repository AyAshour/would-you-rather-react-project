import React, { Component } from 'react'
import { connect } from 'react-redux'




class Question extends Component {
    render() {
        const { question } = this.props

        return (
            <div>
                <p>would you rather?</p>
                <span>{question.optionOne.text}</span><br />
                <span>{question.optionTwo.text}</span>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }, question) {
    const _question = question.question
    return {
        authedUser,
        _question

    }

}

export default connect(mapStateToProps)(Question)
