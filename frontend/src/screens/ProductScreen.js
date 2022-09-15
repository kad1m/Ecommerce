import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";


const ProductScreen = () => {
    const [qty, setQty] = useState(1)

    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch()
    const productDetail = useSelector((state) => state.productDetail)
    const {loading, error, product} = productDetail

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
        console.log(`add to cart ${id}`)
        navigate(`/cart/${id}?qty=${qty}`)
    }


    return (
        <div>

            <Link to="/" className="btn btn-light my-3">Назад</Link>
            {
                loading ? <Loader/>
                    : error ? <Message variant='danger' children={error}/>
                        :
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid/>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>
                                            {product.name}
                                        </h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReview} reviews`}
                                                color={'#f8e825'}/>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Ціна: {product.price} ₴
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Опис: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Ціна:
                                                </Col>
                                                <Col>
                                                    {product.price} ₴
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    В наявності:
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0
                                                        ? 'Є в наявності'
                                                        : 'Закінчився'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>


                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Qty
                                                    </Col>
                                                    <Col xs="auto" className="my-1">
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {

                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>))
                                                            }

                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}


                                        <ListGroup.Item className='text-center'>
                                            <Button
                                                onClick={addToCartHandler}
                                                className="btn-block"
                                                disabled={product.countInStock === 0}
                                                type='button'>
                                                Додати до кошика
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
            }
        </div>
    );
};

export default ProductScreen;