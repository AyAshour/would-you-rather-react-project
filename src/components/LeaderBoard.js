import React, { Component } from 'react'
import { connect } from 'react-redux'


class LeaderBoard extends Component {
    render() {
        const { leaders } = this.props
        return (
            <div>
                <h3 className='center'>Leader board</h3>
                <ul>
                    {leaders.map((l) => (
                        <li key={l.id}>
                            <img
                                src={l.avatarURL}
                                alt={`Avatar of ${l.avatarURL}`}
                                className='avatar'
                            />
                            <p>{l.name}</p>
                            <p>score: {l.score}</p>
                            <p>answered questions: {l.answered}</p>
                            <p>created questions: {l.created}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users, questions }) {

    const allQuestions = questions.unAnsweredQ.concat(questions.answeredQ)
    let _users = []
    for (const u in users) {
        _users.push({
            id: u,
            name: users[u].name,
            avatarURL: users[u].avatarURL,
            answered: Object.keys(users[u].answers).length,
            created: 0,
            score: 0

        })
    }
    for (const u in _users) {
        _users[u].created = allQuestions.filter(q => q.author === _users[u].id).length
        _users[u].score = _users[u].created + _users[u].answered
    }

    return {
        leaders: _users.sort((a, b) => b.score - a.score)
    }
}


export default connect(mapStateToProps)(LeaderBoard)