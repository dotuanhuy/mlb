import React, { memo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { path, BACKEND_URL } from '../../utils';
import Loading from '../common/Loading/Loading';
import * as actions from '../../store/actions';
import Pagination from '../Paginations/Pagination';
import Navbar from '../HomePage/Navbar/Navbar';
import Banner from '../common/Banners/Banner'
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';
import jwt_decode from 'jwt-decode';
import ListProducts from '../common/listProducts/ListProducts';

function Favourite({
    titlePage,
    isLoading,
    productsLimit,
    images,
    refreshIStateFavouriteProductRedux,
    getAllProductsFavouriteLimitRedux,
}) {
    const [params] = useSearchParams()
    const body = useRef()
    const initialRender  = useRef(true)
    const accessToken = window.localStorage.getItem('accessToken')
    const navigate = useNavigate()
    
    useEffect(() => {
        document.title = titlePage
        refreshIStateFavouriteProductRedux()
    }, [])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            if (body.current) {
                window.scrollTo({
                    behavior: "smooth",
                    top: body.current.offsetTop - 80
                });
            }
        }
    }, [body.current])
    
    useEffect(() => {
        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        else {
            navigate(path.LOGIN)
        }
        if (userId) {
            getAllProductsFavouriteLimitRedux(userId, params.get('page') || 1)
        }
        if (body.current) {
            window.scrollTo({
                behavior: "smooth",
                top: body.current.offsetTop - 80
            });
        }
    }, [params.get('page')])
    
    return (
        <>
            {
                isLoading ? 
                <Loading />
                :
                <div className='product-search-by-name'>
                    <Navbar />
                    <Banner categoryProduct='Yêu thích' title='Yêu thích' />
                   
                    <div ref={body} className='product-search-by-name-container px-4'>
                        <div className='container'>
                            <div className='product-count pt-5 pb-5 text-center h4 fw-normal'>
                                Danh sách yêu thích của tôi
                            </div>
                            <div className='menu-box'>
                                <div className='menu-product row row-cols-4'>
                                    <ListProducts products={productsLimit} images={images} col='col-3' />
                                </div>
                            </div>
                            <Pagination pathPage={path.FAVOURITE} currentPage={params.get('page') || 1}/>
                        </div>
                    </div>
                    <HomeFooter />
                </div>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLoading: state.fouriteProduct.isLoading,
        images: state.product.images,
        productsLimit: state.fouriteProduct.productLimit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshIStateFavouriteProductRedux: () => dispatch(actions.refreshIStateFavouriteProduct()),
        getAllProductsFavouriteLimitRedux: (userId, offset) => dispatch(actions.getAllProductsFavouriteLimit(userId, offset))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Favourite));
