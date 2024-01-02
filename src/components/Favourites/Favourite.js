import React, { memo, useEffect } from 'react';
import {Routes, Route, useSearchParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from '../../utils';
import Loading from '../Loading/Loading';
import * as actions from '../../store/actions';
import Pagination from '../Paginations/Pagination';
import Navbar from '../HomePage/Navbar/Navbar';
import Banner from '../common/Banners/Banner'
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';
import jwt_decode from 'jwt-decode';
import Product from '../common/products/Product';


function Favourite({
    isLoading,
    accessToken, 
    products,
    images,
    refreshIsloadingStateProductRedux,
    fetchAllImageProductRedux,
    getAllProductsFavouriteLimitRedux
}) {
    const [params] = useSearchParams()
    
    useEffect(() => {
        refreshIsloadingStateProductRedux()
        fetchAllImageProductRedux(accessToken)
    }, [])
    
    useEffect(() => {
        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        getAllProductsFavouriteLimitRedux(accessToken, userId, params.get('page') || 1)
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
                   
                    <div className='product-search-by-name-container px-4'>
                        <div className='container'>
                            <div className='product-count pt-5 pb-5 text-center h4 fw-normal'>
                                Danh sách yêu thích của tôi
                            </div>
                            <div className='menu-box'>
                                <div className='menu-product row row-cols-4'>
                                    <Product products={products} images={images} col='col-3' />
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
        isLoading: state.product.isLoadingProduct,
        accessToken: state.auth.token,
        images: state.product.images,
        products: state.product.productFavouriteLimit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
        fetchAllImageProductRedux: (accessToken) => dispatch(actions.fetchAllImageProduct('', accessToken)),
        getAllProductsFavouriteLimitRedux: (accessToken, userId, offset) => dispatch(actions.getAllProductsFavouriteLimit(accessToken, userId, offset))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Favourite));
