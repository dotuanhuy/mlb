import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../HomePage/Navbar/Navbar';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode';
import Banner from '../Banners/Banner'
import { useLocation } from 'react-router-dom';
import SliderProduct from '../Slider/SliderProduct';
import Footer from '../../HomePage/HomeFooter/HomeFooter'


function Product({accessToken, productFavourites, getAllProductsFavouriteRedux}) {
    const {productId, productName} = useLocation().state 
    console.log(productId)    
    useEffect(() => {
        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        if (userId) {
            getAllProductsFavouriteRedux(accessToken, userId)
        }
    }, [])

    return (
        <>
            <Navbar />
            <Banner categoryProduct={productName} title={productName}/>
            <div className='product'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-8'>
                            <SliderProduct />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        productFavourites: state.product.productFavourtie,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProductsFavouriteRedux: (accessToken, userId) => dispatch(actions.getAllProductsFavourite(accessToken, userId)),
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Product));
