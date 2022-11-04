import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Container} from "react-bootstrap";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
    return (
        <BrowserRouter>
        <div>
            <Header/>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen/>} />
                        <Route path='/login' element={<LoginScreen/>} />
                        <Route path='/register' element={<RegisterScreen/>} />
                        <Route path='/profile' element={<ProfileScreen/>} />
                        <Route path='/product/:id' element={<ProductScreen/>} />
                        <Route path='/cart/' element={<CartScreen/>}>
                            <Route path=":id" element={<CartScreen />} />
                        </Route>
                    </Routes>

                </Container>

            </main>
            <Footer/>
        </div>
        </BrowserRouter>
    );
}

export default App;
