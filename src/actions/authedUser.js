export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const ADD_VOTE = 'ADD_VOTE'

export function setAuthedUser(id, users) {
    return {
        type: SET_AUTHED_USER,
        id,
        users
    }
}


export function addVote({ answer, qid }) {
    return {
        type: ADD_VOTE,
        qid,
        answer
    }
}