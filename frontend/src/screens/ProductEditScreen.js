import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {Form, Button, Row, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux"
import {listProductDetails, updateProduct} from '../actions/productActions'
import FormContainer from "../components/FormContainer";
import {PRODUCT_UPDATE_RESET} from "../constants/productConstans";
import axios from "axios";


const ProductEditScreen = () => {

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const location = useLocation()
  const navigate = useNavigate();
  const {id} = useParams()

  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const productDetail = useSelector(state => state.productDetail)
  const {error, loading, product} = productDetail

  const productUpdate = useSelector(state => state.productUpdate)
  const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = productUpdate


  useEffect(() => {
    if (successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET})
      navigate('/admin/productlist ')
    } else {
      if (!product.name || product._id !== Number(id)) {
        dispatch(listProductDetails(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }


  }, [dispatch, product, id, navigate, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }))
  }

  const uploadFileHandler = async (e) => {
    console.log('file is uploading')
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('product_id', id)

    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const {data} = await axios.post(
        `/api/products/upload/`,
        formData,
        config
      )
      setImage(data)
      setUploading(false)

    } catch (error) {
      setUploading(false)
    }

  }
  return (
    <div>
      <Link to='/admin/productlist'>
        Назад
      </Link>
      <FormContainer>
        <h1>Змінити товар</h1>
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
                  <Form.Label>Назва</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Назва'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='price'>
                  <Form.Label>Ціна </Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Ціна'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='image'>
                  <Form.Label>Зображення</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}>
                  </Form.Control>
                  <Form.Control
                    type='file'
                    label='Choose File'
                    custom='true'
                    onChange={uploadFileHandler}
                  ></Form.Control>

                  {uploading && <Loader/>}
                </Form.Group>
                <Form.Group className='my-3' controlId='brand'>
                  <Form.Label>Бренд</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Введіть назву бренду'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='countInStock'>
                  <Form.Label>Наявність</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Зазначте кількість'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='category'>
                  <Form.Label>Категорія</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Введіть категорію'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='description'>
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Введіть опис'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                  </Form.Control>
                </Form.Group>


                <Button type='submit' className='my-3' variant='primary'>
                  Змінити
                </Button>
              </Form>
            )}

      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;