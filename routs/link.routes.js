// подключаем express
const {Router} = require('express')
// создаем роутер
const router = Router()
// указываем путь к модели ссылки
const Link = require('../models/Link')
// подключаем мидовер авторизации
const auth = require('../middleware/auth.middleware')
// подключаем конфиг(константы)
const config = require('config')
// подключаем пакет для генерации
const shortid = require('shortid')

// const config = require('config')

// запрос. генерируем ссылку генерате
router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl') // получаем адрес базовой страницы
        const {from} = req.body

        // получаем уникальный код
        const code = shortid.generate()

        // если есть такая ссылка на форме, то передаем с 200 статусом. 200 - по умолчанию
        const existing = await Link.findOne({ from })

        if (existing) {
            return res.json({ link: existing })
        }

        // формируем сокращенную (рабочую) ссылку
        const to = baseUrl + '/t/' + code

        // создаем новый объект ссылки
        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save() // сохраняем ссылку

        res.status(201).json({ link })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

// запрос на получение всех ссылок
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId }) // объект линк ищет ссылки пользователя
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

// запрос на получение ссылки по ид. считываение динамической ссылки из DetailPage
router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById( req.params.id ) // объект линк ищет ссылку по ид
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router