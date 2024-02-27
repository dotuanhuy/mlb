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
    isLoading,
    fouriteProducts,
    refreshStoreProductRedux,
    getAllProductsFavouriteRedux,
    getProductByIdRedux,
    getAllImagesByProductIdRedux
}) {
    const {productId, productName} = useLocation().state 
    const [isFavourite, setIsFavourite] = useState(false)
    const accessToken = window.localStorage.getItem('accessToken')

    useEffect(() => {
        refreshStoreProductRedux()
    }, [])
    useEffect(() => {
        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        if (userId) {
            getAllProductsFavouriteRedux(userId)
        }
        getProductByIdRedux(productId)
        getAllImagesByProductIdRedux(productId)
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
        isLoading: state.product.isLoadingProduct,
        fouriteProducts: state.fouriteProduct.product,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshStoreProductRedux: () => dispatch(actions.refreshStoreProduct()),
        getAllProductsFavouriteRedux: (userId) => dispatch(actions.getAllProductsFavourite(userId)),
        getProductByIdRedux: (productId) => dispatch(actions.getProductById(productId)),
        getAllImagesByProductIdRedux: (productId) => dispatch(actions.getAllImagesByProductId(productId)),
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Product));
