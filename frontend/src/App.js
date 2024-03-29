import Example from "./components/NewHeader";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Container} from "react-bootstrap";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import PageNotFound from "./screens/PageNotFound";

function App() {
    return (
        <BrowserRouter>
        <div>
            <Example/>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='*' element={<PageNotFound />} />
                        <Route exact path="/" element={<HomeScreen/>} />

                        <Route path='/login' element={<LoginScreen/>} />
                        <Route path='/register' element={<RegisterScreen/>} />
                        <Route path='/profile' element={<ProfileScreen/>} />
                        <Route path='/product/:id' element={<ProductScreen/>} />
                        <Route path='/shipping' element={<ShippingScreen/>} />
                        <Route path='/placeorder' element={<PlaceOrderScreen/>} />
                        <Route path='/payment' element={<PaymentScreen/>} />

                        <Route path='/cart/' element={<CartScreen/>}>
                            <Route path=":id" element={<CartScreen />} />
                        </Route>
                        <Route path='/order/details/' element={<OrderScreen/>}>
                            <Route path=":id" element={<OrderScreen />} />
                        </Route>
                        <Route path='/admin/userlist' element={<UserListScreen/>} />
                        <Route path='/admin/users/' element={<UserEditScreen/>}>
                            <Route path=":id/edit" element={<UserEditScreen/>} />
                        </Route>

                        <Route path='/admin/productlist' element={<ProductListScreen/>} />
                        <Route path='/admin/product/' element={<ProductEditScreen/>}>
                            <Route path=":id/edit" element={<ProductEditScreen/>} />
                        </Route>

                        <Route path='/admin/orderlist' element={<OrderListScreen/>} />

                    </Routes>

                </Container>

            </main>
            <Footer/>
        </div>
        </BrowserRouter>
    );
}

export default App;
