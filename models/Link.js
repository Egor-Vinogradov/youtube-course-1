const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    // сама ссылка, обязательная, не уникальная
    from: {type: String, required: true},
    // куда ведет. уникальная
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    // дата создания ссылки. default - по умолчанию
    date: {type: Date, default: Date.now},
    // количество кликов. т.е. сколько раз заходили
    clicks: {type: Number, default: 0},
    // пользователь, который создал
    owner: {type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Link', schema)