import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Button, Table} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer, LinkCotainer} from 'react-router-bootstrap'
import {listOrders} from "../actions/orderActions";


const OrderListScreen = () => {

  const dispatch = useDispatch()
  const orderList = useSelector(state => state.orderList)
  const {loading, error, orders} = orderList
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const {success: successDelete} = userDelete

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listOrders())
    } else {
      navigate('/login')
    }

  }, [dispatch, navigate, userInfo])


  return (
    <div>
      <h1>Замовлення</h1>
      {loading
        ? (<Loader/>)
        : error
          ? (<Message variant='danger'>{error}</Message>)
          : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
              <tr>
                <th>id</th>
                <th>Користувач</th>
                <th>Дата</th>
                <th>Сума замовлення</th>
                <th>Статус оплати</th>
                <th>Статус доставки</th>
                <th></th>
              </tr>

              </thead>
              <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{color: 'red'}}></i>)}
                  </td>
                  <td>{order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{color: 'red'}}></i>)}
                  </td>
                  <td>
                    <LinkContainer to={`/order/details/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Подробиці
                      </Button>
                    </LinkContainer>
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

export default OrderListScreen;