import { ADD_QUESTION, RECEIVE_QUESTIONS, SUBMIT_VOTE } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            const { question } = action
            return {
                ...state,
                [question.id]: question
            }
        case SUBMIT_VOTE:
            const { qid, answer, authedUser } = action
            let q = state[qid]
            q[answer].votes.push(authedUser)

            return {
                ...state,
                [q.id]: q
            }
        default:
            return state
    }
}