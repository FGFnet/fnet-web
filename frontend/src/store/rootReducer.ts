import { AppState } from "./AppState"
import type { LoginActions } from "./actions"

const initialState: AppState = {
    loggedIn: false,
    loggedUser: {name: '', is_admin: false, campus: ''}
}

export const rootReducer = (state: AppState = initialState, action: LoginActions) => {
    switch(action.type) {
        case 'login': return {...state, loggedUser: action.loggedUser, loggedIn: true}
        case 'logout': return initialState
    }
    return state
}