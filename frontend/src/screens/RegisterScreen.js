import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";

import {register} from '../actions/userActions'
import FormContainer from "../components/FormContainer";



const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password))
        }
    }



    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='name'>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                        type='name'
                        required
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        required
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        required
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        required
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' className='my-3' variant='primary'>
                    Sign Up
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>Login</Link>
                </Col>
            </Row>

        </FormContainer>
    );
};

export default RegisterScreen;