import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {
    productListReducers,
    productDetailReducers,
    productDeleteReducers,
    productCreateReducers,
    productUpdateReducers,
    productReviewCreateReducers,
    productTopRatedReducers,
    productCategoryListReducers
} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    userDeleteReducers,
    userDetailReducers, userListReducers,
    userLoginReducers,
    userRegisterReducers,
    userUpdateProfileReducers, userUpdateReducers
} from "./reducers/userReducer";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer, orderDeliverReducer
} from './reducers/orderReducers'



const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers,
    productCreateReview: productReviewCreateReducers,
    productTopRated: productTopRatedReducers,
    productCategoryList: productCategoryListReducers,

    cart: cartReducer,

    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetail: userDetailReducers,
    usersList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userUpdate: userUpdateReducers,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store


