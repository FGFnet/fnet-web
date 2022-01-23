import type {Action} from 'redux'
import {User} from './AppState'

type LogoutAction = Action<'logout'>
type LoginAction = Action<'login'> & {
    loggedUser: User
}

export type LoginActions = LogoutAction | LoginAction

export const loginAction = (loggedUser: User): LoginAction => ({
    type: 'login',
    loggedUser
})
export const logoutAction = (): LogoutAction => ({
    type: 'logout'
})