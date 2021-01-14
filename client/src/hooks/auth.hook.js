import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)

    // для того, чтобы находиться на странице постоянно. сохранение токена
    const [ready, setReady] = useState(false)

    const [userId, setUserId] = useState(null)

    // вход по параметрам токена и ид
    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        // в переменную storageName записываем ид и токен
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, [])

    // чистим значение токена, ид и переменной
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    // функция, чтобы не выбрасывало. Передает данные в login
    useEffect(() => {
        // приводим к объекту JSON (парсим) строчку с токеном и ид
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true) // подтверждаем авторизацию
    }, [login])

    return {login, logout, token, userId, ready}
}