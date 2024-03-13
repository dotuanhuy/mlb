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
import DescriptionProduct from '../../DescriptionProducts/DescriptionProduct'
import ReviewProduct from '../../ReviewProducts/ReviewProduct';


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
    const [state, setState] = useState('des')

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
                            <div className='row pb-4'>
                                <div className='col-7 position-relative'>
                                    <SliderProduct />
                                    <Toast productId={productId} isFavourite={isFavourite} isCart={false}/>
                                </div>
                                <div className='col-5'>
                                    <Detail />
                                </div>
                            </div>
                            <div className='d-flex justify-content-center my-3'>
                                <ul 
                                    class="nav col-9 nav-pills nav-justified bg-nav-2 rounded"
                                    onClick={(e) => setState(e.target.value)}
                                >
                                    <li class={state === 'des' ? "nav-item btn-root-2 rounded" : "nav-item rounded"}>
                                        <button 
                                            className="nav-link text-white fw-500"
                                            value='des'
                                        >Mô Tả Sản Phẩm</button>
                                    </li>
                                    <li class={state === 'auth' ? "nav-item btn-root-2 rounded" : "nav-item rounded"}>
                                        <button 
                                            className="nav-link text-white fw-500"
                                            value='auth'
                                        >MLB Chính Hãng</button>
                                    </li>
                                    <li class={state === 'review' ? "nav-item btn-root-2 rounded" : "nav-item rounded"}>
                                        <button 
                                            className="nav-link text-white fw-500"
                                            value='review'
                                        >Đánh Giá Sản Phẩm</button>
                                    </li>
                                    <li class={state === 'policy' ? "nav-item btn-root-2 rounded" : "nav-item rounded"}>
                                        <button 
                                            className="nav-link text-white fw-500"
                                            value='policy'
                                        >Chính Sách Đổi Trả</button>
                                    </li>
                                </ul>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {
                                    state === 'des' ? <DescriptionProduct /> : 
                                    state === 'auth' ? '' :
                                    state === 'review' ? <ReviewProduct /> :
                                    state === 'policy' ? '' : ''
                                }
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
