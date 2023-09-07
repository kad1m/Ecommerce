import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";

import {login} from '../actions/userActions'
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (


    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                 alt="Your Company"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Увійти до вашого аккаунту</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={submitHandler}>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email
                        адреса</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" autoComplete="email" required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password"
                               className="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Забули пароль?</a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input id="password" name="password" type="password" autoComplete="current-password" required
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <button type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Увійти
                    </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Новий користувач?
                <a href={redirect ? `/register?redirect=${redirect}`: '/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Створити аккаунт</a>
            </p>
        </div>
    </div>
    );
};

export default LoginScreen;