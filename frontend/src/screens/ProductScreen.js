import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails, createProductReview} from "../actions/productActions";
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstans";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {productCreateReducers} from "../reducers/productReducers";


const ProductScreen = () => {
  const [qty, setQty] = useState(1)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch()
  const productDetail = useSelector((state) => state.productDetail)
  const {loading, error, product} = productDetail

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const productCreateReview = useSelector((state) => state.productCreateReview)
  const {loading: loadingProductReview, error: errorProductReview, success: successProductReview} = productCreateReview

  useEffect(() => {

    if ( successProductReview){
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(id))
  }, [dispatch, id, successProductReview])

  const addToCartHandler = () => {
    console.log(`add to cart ${id}`)
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(product._id, {
      rating,
      comment
    }))
  }


  return (
    <div>

      <Link to="/" className="btn btn-light my-3">Назад</Link>
      {
        loading ? <Loader/>
          : error ? <Message variant='danger' children={error}/>
            :
            <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <li>
                <div className="flex items-center">
                  <a href="#" className="mr-2 text-sm font-medium text-gray-900">Men</a>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                       className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"/>
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <a href="#" className="mr-2 text-sm font-medium text-gray-900">{product.category}</a>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                       className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"/>
                  </svg>
                </div>
              </li>

              <li className="text-sm">
                <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{product.name}</a>
              </li>
            </ol>
          </nav>


          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img src={product.image}
                   alt="Two each of gray, white, and black shirts laying flat."
                   className="h-full w-full object-cover object-center"/>
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img src={product.image}
                     alt="Model wearing plain black basic tee." className="h-full w-full object-cover object-center"/>
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img src={product.image}
                     alt="Model wearing plain gray basic tee." className="h-full w-full object-cover object-center"/>
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img src={product.image}
                   alt="Model wearing plain white basic tee." className="h-full w-full object-cover object-center"/>
            </div>
          </div>


          <div
            className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
            </div>


            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Інформація про продукт</h2>
              <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>


              <div className="mt-6">
                <h3 className="sr-only">Відгуки</h3>
                <Rating value={product.rating} product_reviews={product.numReview}/>
              </div>

              <form className="mt-10">

                <div>
                  <h3 className="text-sm font-medium text-gray-900">Кількість</h3>
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
                </div>

                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Наявність:</h3>
                    <p>{product.countInStock > 0
                            ? 'Є в наявності'
                            : 'Закінчився'}</p>

                  </div>


                </div>

                <button type="submit"
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add
                  to bag
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">The Basic Tee 6-Pack allows you to fully express your vibrant
                    personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be
                    a trendsetter? Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of color to
                    your outfit? Our white tee has you covered.</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400"><span className="text-gray-600">Hand cut and sewn locally</span></li>
                    <li className="text-gray-400"><span
                      className="text-gray-600">Dyed with our proprietary colors</span></li>
                    <li className="text-gray-400"><span className="text-gray-600">Pre-washed &amp; pre-shrunk</span>
                    </li>
                    <li className="text-gray-400"><span className="text-gray-600">Ultra-soft 100% cotton</span></li>
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">The 6-Pack includes two black, two white, and two heather gray
                    Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like
                    our upcoming &quot;Charcoal Gray&quot; limited release.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Row>
                <Col md="6">
                  <h4 id='write-reviews'>Відгуки</h4>
                  {product.reviews.length == 0 && <Message variant="info" children='No reviews'/>}
                  <ListGroup variant='flush'>

                    <ListGroup.Item>
                       <h4>Write a review</h4>

                      {loadingProductReview && <Loader/>}
                      {successProductReview && <Message variant='success' children='review submited'/>}
                      {errorProductReview && <Message variant='danger' children={errorProductReview}/>}

                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e)=>setRating(e.target.value)}
                            >
                              <option value=''>
                                select....
                              </option>
                              <option value='1'>
                                1
                              </option>
                              <option value='2'>
                                2
                              </option>
                              <option value='3'>
                                3
                              </option>
                              <option value='4'>
                                4
                              </option>
                              <option value='5'>
                                5
                              </option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment'>
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                              as='textarea'
                              row='5'
                              value={comment}
                              onChange={(e)=>setComment(e.target.value)}
                              ></Form.Control>

                          </Form.Group>
                          <Button
                            disabled={loadingProductReview}
                            type='submit'
                            variant='primary'
                            className='review-submit-btn'
                          >
                            Submit</Button>
                        </Form>
                        ) :
                        (
                          <Message variant='info'>
                            Please <Link to='/login'>login</Link>  to write a review
                          </Message>
                        )}
                    </ListGroup.Item>

                    {product.reviews.map((review)=>(
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} color='#f8e825'/>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Col>
              </Row>
      </div>
      }




    </div>
  );
};

export default ProductScreen;