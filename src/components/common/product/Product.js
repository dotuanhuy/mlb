import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../HomePage/Navbar/Navbar';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode';
import Banner from '../Banners/Banner'
import { useLocation } from 'react-router-dom';
import SliderProduct from '../Slider/SliderProduct';
import Footer from '../../HomePage/HomeFooter/HomeFooter'
import Toast from '../Actions/Toast';
import './Product.scss'
import Detail from './Detail';
import Loading from '../Loading/Loading';


function Product({
    accessToken, 
    isLoading,
    product, 
    fouriteProducts,
    getAllProductsFavouriteRedux,
    getProductByIdRedux,
    fetchAllImageProductRedux
}) {
    const {productId, productName} = useLocation().state 
    const [isFavourite, setIsFavourite] = useState(false)

    useEffect(() => {
        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        if (userId) {
            getAllProductsFavouriteRedux(accessToken, userId)
        }
        getProductByIdRedux(productId, accessToken)
        fetchAllImageProductRedux(productId, accessToken)
    }, [productId])
    
    useEffect(() => {
        if (fouriteProducts.length > 0) {
            setIsFavourite(fouriteProducts.some(element => element.id === productId))
        }
    }, [fouriteProducts])

    return (
        <>
            {
                isLoading ?
                <Loading />
                :
                <>
                    <Navbar />
                    <Banner categoryProduct={productName} title={productName}/>
                    <div className='product my-5'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-7 position-relative'>
                                    <SliderProduct />
                                    <Toast productId={productId} isFavourite={isFavourite} isCart={false}/>
                                </div>
                                <div className='col-5'>
                                    <Detail />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        isLoading: state.product.isLoadingProduct,
        product: state.product.products,
        fouriteProducts: state.fouriteProduct.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProductsFavouriteRedux: (accessToken, userId) => dispatch(actions.getAllProductsFavourite(accessToken, userId)),
        getProductByIdRedux: (productId, accessToken) => dispatch(actions.getProductById(productId, accessToken)),
        fetchAllImageProductRedux: (productId, accessToken) => dispatch(actions.fetchAllImageProduct(productId, accessToken)),
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Product));
