import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCartShopping, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Loading from '../common/Loading/Loading';
import * as actions from '../../store/actions'
import Navbar from '../HomePage/Navbar/Navbar';
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';
import jwtDecode from 'jwt-decode';
import Banner from '../common/Banners/Banner';
import { formatVND, path, typeStep } from '../../utils';
import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import './PageCart.scss'



function PageCart({
    accessToken,
    isLoading,
    products,
    countProducts,
    totalMoney,
    refreshIsloadingStateProductRedux,
    getProductsInCartByUserRedux,
    deleteAProductInCartRedux,
    deleteProductInCartRedux
}) {
    
    const [userId, setUserId] = useState('')
    useEffect(() => {
        if (accessToken) {
            let tokenDecoded = jwtDecode(accessToken)
            setUserId(tokenDecoded?.id)
        }
    }, [])
    
    useEffect(() => {
        if (userId) {
            getProductsInCartByUserRedux(accessToken, userId)
        }
    }, [userId])

    const handleStepDown = (productId, size, down) => {
        deleteAProductInCartRedux(accessToken, { productId, userId, size, typeStep: down })
    }

    const handleStepUp = (productId, size, up) => {
        deleteAProductInCartRedux(accessToken, { productId, userId, size, typeStep: up })
    }
    
    const handleDeleteProductCart = (productId, size) => {
        deleteProductInCartRedux(accessToken, {productId, userId, size})
    }

    const handleOnchangeQuantity = e => {
        console.log(+e.target.value)
    }
    
    return (
        <>
            {
                !products || products.length === 0 ?
                <Loading />
                :
                <div className=''>
                    <Navbar />
                    <div>
                        <Banner categoryProduct={'Giỏ hàng'} title={'Giỏ hàng'}/>
                    </div>
                    <div className='container mt-5'>
                        <h4 className='fs-5 text-uppercase my-4 text-center'>Giỏ hàng của bạn tại mlb việt nam</h4>
                        <div className='page-cart'>
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Thông tin sản phẩm</th>
                                    <th scope="col">Đơn giá</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((item, index) => {
                                            let imageBase64 = ''
                                            if (item?.Product?.image) {
                                                imageBase64 = Buffer.from(item?.Product?.image?.data, 'base64').toString('binary')
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td scope="row" className='col-6'>
                                                        <div className='row d-flex align-items-center'>
                                                            <div className='col-2'>
                                                                <Link 
                                                                    to={`${path.PRODUCT}/${item?.Product?.name}`} 
                                                                    state={{ 
                                                                        productId: item?.Product?.id,
                                                                        productName: item?.Product?.name,
                                                                    }}
                                                                >
                                                                    <div 
                                                                        style={{ 
                                                                            width: '100%', 
                                                                            height: '100px',
                                                                            backgroundImage: `url(${imageBase64})`,
                                                                            backgroundPosition: '0% 0%',
                                                                            backgroundSize: 'contain',
                                                                            backgroundRepeat: 'no-repeat'
                                                                        }}
                                                                    ></div>
                                                                </Link>
                                                            </div>
                                                            <div className='col-10'>
                                                                <Link 
                                                                    className='text-muted fw-500 text-sm-hover'
                                                                    to={`${path.PRODUCT}/${item?.Product?.name}`} 
                                                                    state={{ 
                                                                        productId: item?.Product?.id,
                                                                        productName: item?.Product?.name,
                                                                    }}
                                                                >
                                                                    {item?.Product?.name}
                                                                </Link>
                                                                <div>
                                                                    {
                                                                        item?.size ? <span className='text-muted fw-500 text-size-14 '>Size: {item.size}</span> : ''
                                                                    }
                                                                </div>
                                                                <button 
                                                                        className='bg-transparent button-hover' 
                                                                        style={{ cursor: 'pointer' }} 
                                                                        data-toggle="tooltip" 
                                                                        title='Xóa'
                                                                        onClick={() => handleDeleteProductCart(item?.Product?.id, item?.size)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrash} style={{ color: '#942319' }}/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='col-2'>
                                                        <span className='text-danger fw-500'>{formatVND(+item?.Product?.price)}</span>
                                                    </td>
                                                    <td className='col-2'>
                                                        <div className='col-md-8 d-flex'>
                                                            <button 
                                                                className="btn py-0 px-2 button-hover"
                                                                onClick={() => handleStepDown(item?.Product?.id, item?.size, typeStep.DOWN)}
                                                            >
                                                                <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faMinus} />
                                                            </button>

                                                            <input 
                                                                id="form1" 
                                                                min="0" 
                                                                name="quantity" 
                                                                type="number"
                                                                className="form-control form-control-sm py-0" 
                                                                value={+item.quantity} 
                                                                onChange={e => handleOnchangeQuantity(e)}
                                                            />

                                                            <button 
                                                                className="btn py-0 px-2 button-hover"
                                                                onClick={() => handleStepUp(item?.Product?.id, item?.size, typeStep.UP)}
                                                            >
                                                                <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faPlus} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className='col-2'>
                                                        <span className='text-danger fw-500'>{formatVND(+item?.Product?.price*+item?.quantity)}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            </table>
                            <div className='my-4 col-4 offset-xl-8' style={{ cursor: 'default' }}>
                                <div className='my-3'>
                                    <span className='text-muted fw-500'>Tổng tiền: </span>
                                    <span className='text-danger fs-6 fw-bold float-end'>{formatVND(totalMoney)}</span>
                                </div>
                                <div className='mt-1'>
                                    <button 
                                        className='btn w-100 text-white py-2 button-hover'  
                                        style={{ backgroundColor: '#420500' }}
                                    >
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <HomeFooter />
                </div>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        isLoading: state.product.isLoadingProduct,
        products: state.cart.products,
        countProducts: state.cart.countProducts,
        totalMoney: state.cart.totalMoney
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
        getProductsInCartByUserRedux: (accessToken, userId) => dispatch(actions.getProductsInCartByUser(accessToken, userId)),
        deleteProductInCartRedux: (accessToken, data) => dispatch(actions.deleteProductInCart(accessToken, data)),
        deleteAProductInCartRedux: (accessToken, data) => dispatch(actions.deleteAProductInCart(accessToken, data))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(PageCart));
