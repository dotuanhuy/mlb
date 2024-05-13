import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../HomePage/Navbar/Navbar';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode';
import Banner from '../Banners/Banner'
import { Link, useLocation } from 'react-router-dom';
import SliderProduct from '../Slider/SliderProduct';
import Footer from '../../HomePage/HomeFooter/HomeFooter'
import Toast from '../Actions/Toast';
import './Product.scss'
import Detail from './Detail';
import Loading from '../Loading/Loading';
import DescriptionProduct from '../../DescriptionProducts/DescriptionProduct'
import ReviewProduct from '../../ReviewProducts/ReviewProduct';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux';
import { LIMIT_SLIDER_PRODUCT, formatVND, path } from '../../../utils';

function Product() {
    const dispatch = useDispatch()
    const { product } = useSelector(state => state.fouriteProduct)
    const { isLoading, products, productSlider } = useSelector(state => state.product)
    const { productId, productName } = useLocation().state
    const [isFavourite, setIsFavourite] = useState(false)
    const accessToken = window.localStorage.getItem('accessToken')
    const [state, setState] = useState('des')

    useEffect(() => {
        dispatch(actions.refreshStoreProduct())
    }, [])

    useEffect(() => {
        if (products && products?.categoryDetailId) {
            dispatch(actions.getProductByCategoryDetailLimit(products?.categoryDetailId, LIMIT_SLIDER_PRODUCT))
        }
    }, [products])

    useEffect(() => {
        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        if (userId) {
            dispatch(actions.getAllProductsFavourite(userId))
        }
        dispatch(actions.getProductById(productId))
        dispatch(actions.getAllImagesByProductId(productId))
    }, [productId])

    useEffect(() => {
        if (product.length > 0) {
            setIsFavourite(product.some(element => element.id === productId))
        }
    }, [product])

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        <Navbar />
                        <Banner categoryProduct={productName} title={productName} />
                        <div className='product my-5'>
                            <div className='container'>
                                <div className='row mb-5 pb-4'>
                                    <div className='col-7 position-relative'>
                                        <SliderProduct />
                                        <Toast productId={productId} isFavourite={isFavourite} isCart={false} />
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
                                                state === 'review' ? <ReviewProduct productId={productId} /> :
                                                    state === 'policy' ? '' : ''
                                    }
                                </div>
                                <div className='mt-4 pt-4'>
                                    <div className='d-flex flex-column align-items-center'>
                                        <Link
                                            className='product-same text-color-root-dark text-uppercase d-flex align-items-center gap-3'
                                        >
                                            <FontAwesomeIcon className='bg-root-solid icon-hover fs-10' icon={faSquare} />
                                            <h2 className='fw-500 mb-0 mb-1'>Cùng bộ sưu tập mlb</h2>
                                            <FontAwesomeIcon className='bg-root-solid icon-hover fs-10' icon={faSquare} />
                                        </Link>
                                        <span className='text-muted'>Những Sản Phẩm Cùng Bộ Sưu Tập Tại MLB Việt Nam Có Thể Bạn Sẽ Thích</span>
                                    </div>
                                    <div className='pt-3 mt-3'>
                                        <Swiper 
                                            slidesPerView={4}
                                            spaceBetween={10}
                                            className="mySwiper"
                                        >
                                            {
                                                productSlider && productSlider.length > 0 &&
                                                productSlider.map((item, index) => {
                                                    let size = item?.dataSizeDetail?.at(0)?.name
                                                    let price = ''
                                                    let newPrice = ''
                                                    if (item.price) {
                                                        price = formatVND(item.price)
                                                    }
                                                    if (item?.dataDiscounts?.value !== 0) {
                                                        newPrice = formatVND(item.price - item.price * item?.dataDiscounts?.value)
                                                    }
                                                    let isFavourite = false
                                                    if (product.length !== 0) {
                                                        isFavourite = product.some(element => element.productId === item.id)
                                                    }
                                                    
                                                    return item.id !== products.id ? (
                                                        <SwiperSlide>
                                                            <div className={`list-products position-relative`} key={index}>
                                                                {
                                                                    +item?.dataDiscounts?.value !== 0 ?
                                                                        <div className='discount'>
                                                                            <span>-{+item?.dataDiscounts?.value * 100}%</span>
                                                                        </div>
                                                                        : ''
                                                                }
                                                                <Toast
                                                                    productId={item.id}
                                                                    productFavourites={product}
                                                                    isFavourite={isFavourite}
                                                                    size={size}
                                                                />
                                                                <div className='product-img product-img-first'>
                                                                    <Link
                                                                        to={`${path.PRODUCT}/${item.name}`}
                                                                        state={{
                                                                            productId: item.id,
                                                                            productName: item.name,
                                                                        }}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                maxWidth: '100%',
                                                                                height: '250px',
                                                                                backgroundImage: `url(${item?.image})`,
                                                                                backgroundPosition: '0% 0%',
                                                                                backgroundSize: 'cover',
                                                                                backgroundRepeat: 'no-repeat'
                                                                            }}
                                                                        ></div>
                                                                    </Link>
                                                                </div>
                                                                <div className='product-img product-img-second'>
                                                                    <Link
                                                                        to={`${path.PRODUCT}/${item.name}`}
                                                                        state={{
                                                                            productId: item.id,
                                                                            productName: item.name,
                                                                        }}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                maxWidth: '100%',
                                                                                height: '250px',
                                                                                backgroundImage: `url(${item?.dataImageProducts?.at(0)?.image})`,
                                                                                backgroundPosition: '0% 0%',
                                                                                backgroundSize: 'cover',
                                                                                backgroundRepeat: 'no-repeat'
                                                                            }}
                                                                        ></div>
                                                                    </Link>
                                                                </div>
                                                                <div className='product-infor text-center'>
                                                                    <span className='brand'>{item.dataBrands.name}</span>
                                                                    <h4 className='product-name'>
                                                                        <Link
                                                                            to={`${path.PRODUCT}/${item.name}`}
                                                                            state={{
                                                                                productId: item.id,
                                                                                productName: item.name,
                                                                            }}
                                                                        >{item.name}</Link>
                                                                    </h4>
                                                                    {
                                                                        newPrice ?
                                                                            <span className='product-price pe-2'>{newPrice}</span>
                                                                            : ''
                                                                    }
                                                                    <span className={newPrice ? 'product-price text-decoration-line-through text-muted fs-14' : 'product-price'}>{price}</span>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    ) : ''
                                                })
                                            }
                                        </Swiper>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Product));
