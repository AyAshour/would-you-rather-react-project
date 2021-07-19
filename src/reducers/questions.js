import { ADD_QUESTION, RECEIVE_QUESTIONS, SUBMIT_VOTE } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            if (action.id === '') {
                return {
                    ...state,
                    ...action.questions
                }
            }
            const auth = action.users[action.id]

            const answeredQ = Object.values(action.questions).filter(x => Object.keys(auth.answers).includes(x.id))
            const unAnsweredQ = Object.values(action.questions).filter(x => !Object.keys(auth.answers).includes(x.id))

            return {
                ...state,
                answeredQ: [...answeredQ],
                unAnsweredQ: [...unAnsweredQ]
            }
        case ADD_QUESTION:
            const { question } = action
            return {
                answeredQ: [...state.answeredQ],
                unAnsweredQ: [
                    ...state.unAnsweredQ,
                    question
                ]
            }
        case SUBMIT_VOTE:
            const { qid, answer, authedUser } = action
            let q = state.unAnsweredQ.filter(qq => qq.id === qid)[0]
            q[answer].votes.push(authedUser)

            return {
                answeredQ: [
                    ...state.answeredQ,
                    q
                ],
                unAnsweredQ: [
                    ...state.unAnsweredQ.filter(qq => qq.id !== qid)
                ]
            }
        default:
            return state
    }
}