import { hideLoading, showLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from "../utils/api"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SUBMIT_VOTE = 'SUBMIT_VOTE'

export function receiveQuestions(questions, id, users) {
    return {
        type: RECEIVE_QUESTIONS,
        id,
        users,
        questions
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}
export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser.id
        }).then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}
function submitVote(authedUser, qid, answer) {
    return {
        type: SUBMIT_VOTE,
        qid,
        answer,
        authedUser
    }
}


export default function handleSubmitVote({ authedUser, qid, answer }) {
    return (dispatch) => {
        dispatch(showLoading())
        dispatch(submitVote(authedUser, qid, answer))
        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then(() => dispatch(hideLoading()))
    }
}