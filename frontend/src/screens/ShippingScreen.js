import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {saveShippingAddress} from "../actions/cartActions";
import axios from "axios";
import {LinkContainer} from "react-router-bootstrap";
import {login} from "../actions/userActions";


const ShippingScreen = () => {

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [postalStations, setPostalStations] = useState([])
  const [city, setCity] = useState(shippingAddress.city)
  const [country, setCountry] = useState(shippingAddress.country)
  const [regions, setRegions] = useState([])
  const [cityFind, setcityFind] = useState('')
  const [area, setArea] = useState('')
  const [region, setRegion] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, cityFind, postalCode, country}))
    navigate('/payment')
  }

  const findCityByString = (cityFind) => {

    if (cityFind.includes(',')){
      let cityName = cityFind.split(',')[0]
      let RegionName = cityFind.split(',')[1].replace(' ', '')
      let AreaName = cityFind.split(',')[2].replace(' ', '')

      setcityFind(cityFind)
      setCity(cityName)
      setArea(AreaName)
      setRegion(RegionName)
      console.log('City:', city)
      console.log('Region:', region)
      console.log('Area:', area)

      findPostStation()
    } else {
      setCity(cityFind)
      findPostStation()
      setcityFind(cityFind)
    }



  }


  const findPostStation = (place) => {
    setAddress(place)
  }

  useEffect(() => {
    axios.post('https://api.novaposhta.ua/v2.0/json/', {
      "apiKey": "9ee0433c70a0c577faab4e3c7bfa0609",
      "modelName": "Address",
      "calledMethod": "getSettlements",
      "methodProperties": {
        "FindByString": cityFind
      }
    })
      .then(response => {
        const data = response.data.data;
        console.log(data)
        const formattedOptions = data.map(item => ({
          name: item,
          // Используйте то, что будет являться значением опции
        }));
        setRegions(formattedOptions)
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });

    let postStationsList = []
    let formattedOptions = []

    if (city) {
       axios.post('https://api.novaposhta.ua/v2.0/json/', {
          "apiKey": "9ee0433c70a0c577faab4e3c7bfa0609",
          "modelName": "Address",
          "calledMethod": "getWarehouses",
          "methodProperties": {
		        "CityName": city
	        }
       })
        .then(response => {
    const data = response.data.data;
    console.log(data);
    const formattedOptions = data
        .filter(item => item.SettlementAreaDescription == area && item.SettlementDescription == city && item.SettlementRegionsDescription == region);
    console.log('formatted in get req func', formattedOptions);
    setPostalStations(formattedOptions);
    console.log('postalStations', postalStations);
})
        .catch(error => {
          console.error('Error fetching options:', error);
        });

    }

  }, [cityFind, city, area, region]);


  const RegionValue = () => {

  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3' controlId='address'>
          <Form.Label>Введіть ваше місцезнаходження</Form.Label>
          <Form.Control
            type='name'
            required
            list='regions'
            placeholder='наприклад: Лозова, Лозівський р-н, Харківська область'
            onChange={(e) => findCityByString(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <datalist id="regions">
          {

            regions.map(region => (

                <option key={region.name.Ref}
                        value={`${region.name.Description}, ${region.name.RegionsDescription}, ${region.name.AreaDescription}`}/>
              )
            )
          }
        </datalist>


        <Form.Group className='my-3' controlId='address'>
          <Form.Label>Виберіть відділення</Form.Label>
          <Form.Control
            type='name'
            required
            list='postalStation'
            placeholder="Виберіть відділення"
            // value={address ? address : ''}
            onChange={(e) => findPostStation(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <datalist id="postalStation">
          {

            postalStations.map((postalStation) => (

                <option key={postalStation.Ref}
                        value={postalStation.Description}/>
              )
            )
          }
        </datalist>
        <Form.Group className='my-3' controlId='postalCode'>
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control
            type='name'
            required
            placeholder='Введіть номер телефона'
            value={postalCode ? postalCode : ''}
            onChange={(e) => setPostalCode(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='my-3' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='name'
            required
            placeholder='Enter city'
            value={cityFind ? cityFind : ''}
            onChange={(e) => setCity(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group className='my-3' controlId='country'>
          <Form.Label>Отримувач</Form.Label>
          <Form.Control
            type='name'
            required
            placeholder='ПІБ отримувача'
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