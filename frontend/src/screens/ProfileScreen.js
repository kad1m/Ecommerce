import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";

import {getUserDetail, updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstans'

const ProfileScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate();

    const dispatch = useDispatch()


    const userDetail = useSelector(state => state.userDetail)
    const {error, loading, user} = userDetail

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetail('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
        setMessage('')
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
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

                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-3' controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'

                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' className='my-3' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;