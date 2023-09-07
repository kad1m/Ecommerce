import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, FormGroup, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {savePaymentMethod} from "../actions/cartActions";
//import {savePaymentMethod} from "../actions/cartActions";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.


const PaymentScreen = () => {


  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if(!shippingAddress.address){
    navigate('/shipping')
  }


  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  const [data, setData] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/orders/test/');
        const jsonData = await response.json();
        setData(jsonData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (data){
      const script = document.createElement('script');
        script.innerHTML = `
      window.LiqPayCheckoutCallback = function() {
        LiqPayCheckout.init({
          data: "${data.data}",
          signature: "${data.signature}",
          embedTo: "#liqpay_checkout",
          mode: "embed", // embed || popup
          result_url: '/placeorder'
        }).on("liqpay.callback", function(data){
          console.log(data.status);
          console.log(data);
          window.submitHandler()
        }).on("liqpay.ready", function(data){
          // ready
        }).on("liqpay.close", function(data){
          // close
        });
      };
      window.LiqPayCheckoutCallback(); // Call the function immediately
    `;

      document.body.appendChild(script);
    }else{
      fetchData()
    }

  }, [data]);

  return (
    <>



    <FormContainer>

      <CheckoutSteps step1 step2 step3/>
      <div id="liqpay_checkout"></div>


      <Form onSubmit={submitHandler}>

        <Form.Group>
          <Form.Label as="legend">
            Select method
          </Form.Label>
          <Col>
            <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="paypal"
            name="paymentMethod"
            checked
            onChange={(e)=> setPaymentMethod(e.target.value)}>

            </Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
    </>


  );
};

export default PaymentScreen;