import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import './PageProductSearchByName.scss'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path } from '../../../utils';
import Navbar from '../../HomePage/Navbar/Navbar';
import HomeFooter from '../../HomePage/HomeFooter/HomeFooter';
import Loading from '../../common/Loading/Loading';
import Pagination from '../../Paginations/Pagination';
import ListProducts from '../../common/listProducts/ListProducts';
import Banner from '../../common/Banners/Banner';

function PageProductSearchByName({
    accessToken,
    productSearchOld, 
    productSearch,
    countProduct,
    images, 
    isLoading, 
    refreshIsloadingStateProductRedux, 
    searchProductByNameLimitRedux,
    getAllImagesProductRedux
}) {
    const [params] = useSearchParams()
    const [searchParams] = useSearchParams();
    const productName = searchParams.get('pname')
    const body  = useRef()
    const initialRender  = useRef(true)
    const navigate = useNavigate()
    const [name, setName] = useState('')

    useEffect(() => {
        refreshIsloadingStateProductRedux()
        if (productName) {
            getAllImagesProductRedux(accessToken)
        }
    }, [])

    useEffect(() => {
        if (productName) {
            searchProductByNameLimitRedux(productName, params.get('page') || 1, accessToken) 
        }
        if (body.current) {
            window.scrollTo({
                behavior: "smooth",
                top: body.current.offsetTop - 100
            });
        }
    }, [params.get('page'), productName])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            if (body.current) {
                window.scrollTo({
                    behavior: "smooth",
                    top: body.current.offsetTop - 100
                });
            }
        }
    }, [body.current])

    const handleSearchProduct = (e) => {
        e.preventDefault()
        navigate(path.SEARCH_PRODUCT+`?pname=${name}`)
    }


    return (       
        <>
                
                <div className='product-search-by-name'>
                    <Navbar />
                    <div>
                        <Banner categoryProduct='Kết quả tìm kiếm' title='Tìm kiếm'/>
                    </div>
                    {
                        productName ? 
                        <>
                            {
                                isLoading ?
                                <Loading />
                                :
                                <div ref={body} className='product-search-by-name-container px-4'>
                                    <div className='container'>
                                        <div className='product-count pt-5 pb-3'>
                                            <span>Tìm thấy {countProduct} kết quả với từ khóa "{productName}"</span>
                                        </div>
                                        <div className='menu-box'>
                                            <div className='menu-product row row-cols-4'>
                                                <ListProducts products={productSearch} col='col-3'/>
                                            </div>
                                        </div>
                                        <Pagination pathPage={path.SEARCH_PRODUCT} pname={productName} currentPage={params.get('page') || 1}/>
                                    </div>
                                </div>
                            }
                        </>
                        :
                        <div className='container my-4 py-4'>
                            <div className='row justify-content-md-center text-center'>
                                <h3 className='mb-4'>Nhập từ khóa để tìm kiếm</h3>
                                <form class="input-group" onSubmit={(e) => handleSearchProduct(e)}>
                                    <input 
                                        type="search" 
                                        class="form-control" 
                                        placeholder="Search" 
                                        aria-label="Search"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <button type="submit" class="btn btn-root" data-mdb-ripple-init>Tìm kiếm</button>
                                </form>
                            </div>
                        </div>
                    }
                    <HomeFooter />
                </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        productSearchOld: state.product.productSearch,
        productSearch: state.product.productSearchLimit,
        countProduct: state.product.count,
        images: state.product.images,
        isLoading: state.product.isLoadingProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
        searchProductByNameLimitRedux: (productName, offset, accessToken) => dispatch(actions.searchProductByNameLimit(productName, offset, accessToken)),
        getAllImagesProductRedux: (accessToken) => dispatch(actions.getAllImagesProduct(accessToken)),       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageProductSearchByName);
