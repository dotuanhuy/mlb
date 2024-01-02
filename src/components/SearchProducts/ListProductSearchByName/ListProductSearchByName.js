import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './ListProductSearchByName.scss'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path, categorieType } from '../../../utils';
import {Buffer} from 'buffer';
import { formatVND } from '../../../utils';
import Navbar from '../../HomePage/Navbar/Navbar';
import HomeFooter from '../../HomePage/HomeFooter/HomeFooter';
import Loading from '../../Loading/Loading';
import Pagination from '../../Paginations/Pagination';

function ListProductSearchByName({
    accessToken,
    productSearchOld, 
    productSearch,
    countProduct,
    images, 
    isLoading, 
    refreshIsloadingStateProductRedux, 
    fetchAllImageProductRedux,
    searchProductByNameLimitRedux
}) {
    // const {productName} = useLocation().state
    const [params] = useSearchParams()
    const [searchParams] = useSearchParams();
    const productName = searchParams.get('pname')
    const location = useLocation();

    useEffect(() => {
        refreshIsloadingStateProductRedux()
        fetchAllImageProductRedux(accessToken)
        
    }, [])

    useEffect(() => {
        searchProductByNameLimitRedux(productName, params.get('page') || 1, accessToken) 
    }, [params.get('page'), productName])

    return (       
        <>
            {
                isLoading ?
                <Loading />
                :
                <div className='product-search-by-name'>
                    <Navbar />
                    <div className='product-search-by-name-header'>
                        <div className='title'>
                            {`${productName} - TÌM KIẾM`}
                        </div>
                        <ul className='list-link'>
                            <li className='item-link-home'>
                                <Link to='/'>Trang chủ</Link>
                            </li>
                            <li>
                                <span>Kết quả tìm kiếm</span>
                            </li>
                        </ul>
                    </div>
                    <div className='product-search-by-name-container px-4'>
                        <div className='container'>
                            <div className='product-count pt-5 pb-3'>
                                <span>Tìm thấy {countProduct} kết quả với từ khóa "{productName}"</span>
                            </div>
                            <div className='menu-box'>
                                <div className='menu-product row row-cols-4'>
                                    {
                                        productSearch && productSearch.length > 0 &&
                                        productSearch.map((item, index) => {
                                            let imageBase64 = ''
                                            let imageHoverBase64 = ''
                                            let imageHover = images.find(image => image.productId === item.id)
                                            let price = ''
                                            if (item.image) {
                                                imageBase64 = Buffer.from(item.image.data, 'base64').toString('binary')
                                            }
                                            if (imageHover) {
                                                imageHoverBase64 = Buffer.from(imageHover.image.data, 'base64').toString('binary')
                                            }
                                            if (item.price) {
                                                price = formatVND(item.price)
                                            }
                                            return (
                                                <div className='product col' key={index}>
                                                    {
                                                            item.dataDiscount.valueEn !== '0' ?
                                                            <div className='discount'>
                                                                <span>-{item.dataDiscount.valueEn}</span>
                                                            </div>
                                                            : ''
                                                        }
                                                        <div className='actions text-center'>
                                                            <div className='tym mb-2 px-3'>
                                                                <FontAwesomeIcon icon={faHeart} />
                                                            </div>
                                                            <div className='cart'>
                                                                <button className='btn-buy'>
                                                                    <FontAwesomeIcon icon={faCartShopping} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className='product-img product-img-first'>
                                                            <a href='#'> 
                                                                <div 
                                                                    style={{ 
                                                                        maxWidth: '100%', 
                                                                        height: '340px',
                                                                        backgroundImage: `url(${imageBase64})`,
                                                                        backgroundPosition: '0% 0%',
                                                                        backgroundSize: 'cover',
                                                                        backgroundRepeat: 'no-repeat'
                                                                    }}
                                                                ></div>
                                                            </a>
                                                        </div>        
                                                        <div className='product-img product-img-second'>
                                                            <a href='#'>
                                                                <div 
                                                                    style={{ 
                                                                        maxWidth: '100%', 
                                                                        height: '340px',
                                                                        backgroundImage: `url(${imageHoverBase64})`,
                                                                        backgroundPosition: '0% 0%',
                                                                        backgroundSize: 'cover',
                                                                        backgroundRepeat: 'no-repeat'
                                                                    }}
                                                                ></div>                                                
                                                            </a>
                                                        </div>           
                                                        <div className='product-infor text-center'>
                                                            <span className='brand'>{item.dataBrand.valueEn}</span>    
                                                            <h4 className='product-name'>
                                                                <a href='#'>{item.name}</a>
                                                            </h4>
                                                            <span className='product-price'>{price}</span>
                                                        </div>           
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <Pagination pathPage={path.SEARCH_PRODUCT} pname={productName} currentPage={params.get('page') || 1}/>
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
        fetchAllImageProductRedux: (accessToken) => dispatch(actions.fetchAllImageProduct('', accessToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProductSearchByName);
