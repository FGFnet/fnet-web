export type User = {
    name: String
    is_admin: Boolean
    campus: String
}

export type AppState = {
    loggedIn: Boolean
    loggedUser: User
}