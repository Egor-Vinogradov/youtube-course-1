import React, {useState, useCallback, useEffect, useContext} from 'react'
// импорт для сохранения ссылки
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {LinkCard} from "../components/LinkCard";
import {Loader} from "../components/Loader";



export const DetailPage = () => {
    // загружаем и инициализируем хуки
    const {token} = useContext(AuthContext)
    const [link, setLink] = useState(null)
    const {request, loading} = useHttp()


    // получаем id страницы. т.е. адрес текущей страницы
    const linkId = useParams().id

    // метод для загрузки ссылки
    // еще один метод авторизации
    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            // фетчтд - это ссылка
            // получаем ссылку
            setLink(fetched)
        } catch (e) {}
    }, [token, linkId, request])

    //
    useEffect(() => {
        getLink()
    }, [getLink])

    // если идет процесс загрузки, то добавляем "загрузчик". крутелка-ждите
    if (loading) {
        return <Loader />
    }

    // если процесс загрузки закончился, то передаем карточку ссылки
    return (
        <>
            { !loading && link && <LinkCard link={link} /> }
        </>
    )
}