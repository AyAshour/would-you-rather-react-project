import { getInitialData } from '../utils/api'
import { setAuthedUser } from './authedUser'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = ''


export function handleInitialData() {

    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID, users))
                dispatch(hideLoading())
            })
    }
}
export function handleLogin(id, users) {
    return (dispatch) => {
        dispatch(setAuthedUser(
            id,
            users
        ));
        /* (dispatch(receiveQuestions(
             questions,
             id,
             users
         ))
         );*/
    }
}
