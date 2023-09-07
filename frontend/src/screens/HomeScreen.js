import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap'
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {useNavigate, useParams} from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";


const HomeScreen = () => {
     let navigate = useNavigate();

    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const {loading, error, products, page, pages} = productList

    // eslint-disable-next-line no-restricted-globals
    let keyword = window.location.search
    console.log(keyword)
    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])
    console.log(page)
    console.log(pages)
    return (
        <div>
            {!keyword && <ProductCarousel/>}
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Products</h2>


                {
                loading ? <Loader/>
                    : error ? <Message variant='danger' children={error}/>
                        :
                  <div
                className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map(product => (

                                    <Product key={product._id} product={product}/>

                            ))}



                  </div>
            }
            <Paginate page={page} pages={pages} keyword={keyword} />

              </div>
            </div>
          </div>
    );
};

export default HomeScreen;