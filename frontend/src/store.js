import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {productListReducers, productDetailReducers} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    userDetailReducers,
    userLoginReducers,
    userRegisterReducers,
    userUpdateProfileReducers
} from "./reducers/userReducer";



const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailReducers,
    cart: cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetail: userDetailReducers,
    userUpdateProfile: userUpdateProfileReducers
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store


