import {createContext} from 'react'

// пустая функция
function noop() {}

// создаем контекст с пустыми данными
// логин и логоут принимает функцию, поэтому передается пустая функция
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})