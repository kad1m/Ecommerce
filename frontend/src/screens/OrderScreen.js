import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {Button, Row, Col, Card, Image, ListGroup} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {getOrderDetails, deliverOrder} from "../actions/orderActions";
import {ORDER_DELIVER_RESET} from "../constants/orderConstants";

const OrderScreen = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const orderDetails = useSelector(state => state.orderDetails)
  const {order, error, loading} = orderDetails
  const navigate = useNavigate()

  const orderDeliver = useSelector(state => state.orderDeliver)
  const {loading: loadingDeliver, success: successDeliver} = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo } = userLogin

  if(!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  }


  useEffect(() =>{
    if(!userInfo){
      navigate('/login')
    }

    if(!order || order._id !== Number(id) || successDeliver) {
      dispatch({
        type: ORDER_DELIVER_RESET
      })
      dispatch(getOrderDetails(id))
    }
  }, [dispatch, order, id, successDeliver])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }


  return loading ? (
    <Loader/>
  ) : error ? (
    <Message variant='dager'>{error}</Message>
  ) : (
    <div>
      <h1>Order #{id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping information</h2>
              <p><strong>Name: </strong> {order.user.name}  </p>
              <p><strong>Email : </strong><a href={`mailto:${order.user.email}`} >{order.user.email} </a>  </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address},
                {order.shippingAddress.city},
                {'    '},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Paid on {new Date(order.deliveredAt).toLocaleString('Uk')}
                </Message>
              ):
                (<Message variant='warning'>On way</Message> )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {new Date(order.paidAt).toLocaleString('Uk')}
                </Message>
              ):
                (<Message variant='warning'>Not paid</Message> )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <p>
                <strong>Shipping: </strong>
                {order.orderItems.length === 0 ?
                  <Message variant="info" >
                    Your order is empty
                  </Message>
                  :
                  (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded/>
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} X ${item.price} = ${(item.price * item.qty).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )
                }
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Items:
                  </Col>
                  <Col>
                    ${order.itemsPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Shipping:
                  </Col>
                  <Col>
                    ${order.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Tax:
                  </Col>
                  <Col>
                    ${order.taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Total:
                  </Col>
                  <Col>
                    ${order.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>

            </ListGroup>
            {loadingDeliver && <Loader/>}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
               <ListGroup.Item className='align-content-center'>
                 <Button
                  type='button'
                  className='btn btn-block'
                  onClick={deliverHandler}
                 >
                   Позначити як доставленно
                 </Button>
               </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;