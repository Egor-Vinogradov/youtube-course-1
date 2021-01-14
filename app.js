const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use(express.json({extendet: true}))

// подключение роутера регистрации/авторизации
app.use('/api/auth', require('./routs/auts.routs'))
// подключение роутера линк(создания ссылок)
app.use('/api/link', require('./routs/link.routes'))
// подключение роутера редирект
app.use('/t', require('./routs/redirect.routs'))

// чтобы в продакшене работал фронт и бэк одновременно
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port')

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Стартануло! Порт: ${PORT}`))
    } catch (e) {
        console.log('Ошибка сервера!', e.message)
        process.exit(1)
    }
}

start()

