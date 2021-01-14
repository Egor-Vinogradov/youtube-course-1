import React, {useEffect, useState, useContext} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
    // запрос на хуки
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request, error, clearError} = useHttp()
    const [link, setLink] = useState('')
    const message = useMessage()


    // эффект для сообщения слева
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    // эффект активный адрес и пароль
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    // функция для нажатия Enter
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            // делаем синхронный запрос
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input placeholder="Вставте ссылку"
                           id="link"
                           type="text"
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}