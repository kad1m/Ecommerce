import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {Button, Table, Row, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import {
  listProducts,
  //deleteProduct,
  //createProduct
} from "../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../constants/productConstans";


const ProductListScreen = () => {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList

  const productDelete = useSelector(state => state.productDelete)
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

  const navigate = useNavigate()
  const {id} = useParams()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET})

    if(!userInfo.isAdmin){
      navigate('/login')
    }

    if (successCreate){
      navigate(`/api/products/edit/${createdProduct._id}`)
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct])

  const deleteHandler = (id) => {
    // if(window.confirm(`Are you sure to delete product with ${id}?`)){
    //   dispatch(deleteProduct(id))
    // }
  }
  
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <div>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fa fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message> }

      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message> }

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
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>

              </thead>
              <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/edit/${product._id}`}>
                      <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}><i
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

export default ProductListScreen;