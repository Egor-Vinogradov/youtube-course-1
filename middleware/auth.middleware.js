const jwt = require('jsonwebtoken') // библиотека для токенов
const config = require('config') // подключение конфиг. из этого проекта константы

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        // получаем токет
        // получаем строку из фронт-энда. состит из двух слов. через массив забираем второе, т.е. индекс 1
        // вызываем сплит для пробела
        const token = req.headers.authorization.split(' ')[1]


        // если нет токена, тогда ошибка 401 и в джсоне сообщение
        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации' })
        }

        // раскодировка токена. верификация из библиотеки jwt. ключ
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        // ложим токен в req
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({ message: 'Нет авторизации' })
    }
}

