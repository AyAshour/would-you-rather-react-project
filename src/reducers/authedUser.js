import { ADD_VOTE, SET_AUTHED_USER } from '../actions/authedUser'

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            const authedUser = action.users[action.id]
            return {
                ...state,
                ...authedUser
            }
        case ADD_VOTE:
            const { qid, answer } = action
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [qid]: answer
                }
            }
        default:
            return state
    }
}