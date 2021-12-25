import { delay } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'
// import * as actionTypes from '../actions/actionTypes'
import * as actions from '../actions/index'

export function* logoutSaga(action) {
     yield  localStorage.removeItem('token')
     yield localStorage.removeItem('expirationDate')
     yield localStorage.removeItem('userId')
   //   console.log('redux sagas')
   //   yield put({
   //      type : actionTypes.AUTH_INTITATE_LOGOUT
   // }) 
   yield put(actions.logoutSuccessed())
}

export function*  checkAuthTimeoutSaga(action) {
   yield delay(action.expirationTime)
   yield put(actions.logout())
}