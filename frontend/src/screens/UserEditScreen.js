import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {Form, Button, Row, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";

import {getUserDetail, updateUser} from '../actions/userActions'
import FormContainer from "../components/FormContainer";
import {USER_UPDATE_RESET} from '../constants/userConstans'


const UserUpdateScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const location = useLocation()
  const navigate = useNavigate();
  const {id} = useParams()

  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userDetail = useSelector(state => state.userDetail)
  const {error, loading, user} = userDetail

  const userUpdate = useSelector(state => state.userUpdate)
  const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({type: USER_UPDATE_RESET})
      navigate('/admin/userlist')
    } else {
      if (!user.name || user._id !== Number(id)) {
        dispatch(getUserDetail(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }

  }, [user, id, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({_id: user._id, name, email, isAdmin}))
  }


  return (
    <div>
      <Link to='/admin/users'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit user</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading
          ? (<Loader/>)
          : error
            ? (<Message variant='danger'>{error}</Message>)
            : (
              <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='name'>
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='isAdmin'>
                  <Form.Label>Is admin</Form.Label>
                  <Form.Check
                    type='checkbox'
                    label='is admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}>
                  </Form.Check>
                </Form.Group>

                <Button type='submit' className='my-3' variant='primary'>
                  Update
                </Button>
              </Form>
            )}

      </FormContainer>
    </div>
  );
};

export default UserUpdateScreen;