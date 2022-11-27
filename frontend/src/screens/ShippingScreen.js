import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {saveShippingAddress} from "../actions/cartActions";


const ShippingScreen = () => {

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [city, setCity] = useState(shippingAddress.city)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3' controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='name'
                        required
                        placeholder='Enter address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>
        <Form.Group className='my-3' controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='name'
                        required
                        placeholder='Enter city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>
        <Form.Group className='my-3' controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='name'
                        required
                        placeholder='Enter postal code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>
        <Form.Group className='my-3' controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='name'
                        required
                        placeholder='Enter country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;