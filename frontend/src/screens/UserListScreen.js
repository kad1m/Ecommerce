import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Button, Table} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer, LinkCotainer} from 'react-router-bootstrap'
import {listUsers,
      deleteUser
} from "../actions/userActions";


const UserListScreen = () => {

  const dispatch = useDispatch()
  const userList = useSelector(state => state.usersList)
  const {loading, error, users} = userList
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const {success: successDelete} = userDelete

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listUsers())
    } else {
      navigate('/login')
    }

  }, [dispatch, successDelete, navigate, userInfo])

  const deleteHandler = (id) => {
    if(window.confirm(`Are you sure to delete user with ${id}?`)) dispatch(deleteUser(id))
  }

  return (
    <div>
      <h1>Users list</h1>
      {loading
        ? (<Loader/>)
        : error
          ? (<Message variant='danger'>{error}</Message>)
          : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
              </tr>

              </thead>
              <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}}></i>) : (
                    <i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                  <td>
                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}><i
                      className='fas fa-trash'></i></Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          )
      }
    </div>
  );
};

export default UserListScreen;