import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import {useRoutes} from "./routs";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";



function App() {
    // получаем данные из авторизации. последний параметр - подтверждение авторизации
  const {token, login, logout, userId, ready} = useAuth()

  // передаем: зареген ли пользователь сейчас или нет
  // !! тут означает булеан токен истина
  const isAuthenticated = !!token

  const routs = useRoutes(isAuthenticated)

  // если авторизирован, то подтверждаем это
  if (!ready) {
      return <Loader />
  }

  return(
      // оборачиваем в контекст, чтобы понимать статус
      // передаем параметры статуса входа
      <AuthContext.Provider value={{
          token, login, logout, userId, isAuthenticated
      }}>
          <Router>
              {/*если авторизирован, то добавить навбар*/}
              { isAuthenticated && <Navbar></Navbar>}
            <div className="container">
              {routs}
            </div>
          </Router>
      </AuthContext.Provider>
  )}

export default App;
