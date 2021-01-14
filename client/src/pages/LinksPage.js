import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";



export const LinksPage = () => {
    // получаем и инициализируем хуки
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    // для загрузки ссылок. много ссылок
    const fetсhLinks = useCallback(async () => {
        try {
            const fetchted = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetchted)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetсhLinks()
    }, [fetсhLinks])

    // если идет процесс загрузки, то добавляем "загрузчик". крутелка-ждите
    if (loading) {
        return <Loader />
    }

    // если процесс загрузки закончился, то передаем список ссылок
    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}