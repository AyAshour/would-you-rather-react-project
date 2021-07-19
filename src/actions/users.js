export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_VOTE = 'ADD_USER_VOTE'
export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}
export function addUserVote({ auth, answer, qid }) {
    return {
        type: ADD_USER_VOTE,
        qid,
        answer,
        auth
    }
}