import { ADD_USER_VOTE, RECEIVE_USERS } from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER_VOTE:
            const { auth, qid, answer } = action
            let user = state[auth]
            user = {
                ...user,
                answers: {
                    ...user.answers,
                    [qid]: answer
                }
            }
            return {
                ...state,
                [user.id]: { ...user }

            }
        default:
            return state
    }
}