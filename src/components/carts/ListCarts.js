import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import * as actions from '../../store/actions'
import { Buffer } from 'buffer';
import { formatVND, path } from '../../utils';
import './ListCarts.scss'
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { typeStep } from '../../utils';

function ListCarts({ 
    accessToken,
    productsCart, 
    totalMoney, 
    countProducts,
    getProductsInCartByUserRedux,
    deleteProductInCartRedux,
    deleteAProductInCartRedux
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
    
    return (    
        <div className='list-items-cart'>
            <section class="h-100 h-custom">
                <div class="h-100">
                    <div class="row h-100">
                        <div class="col-12">
                            {
                                countProducts === 0 ? 
                                <div className='p-3 bg-light text-muted text-center fw-bold' style={{ borderRadius: '0.375rem' }}>
                                    Giỏ hàng chưa có sản phẩm
                                </div>
                                :
                                <div class="card card-registration card-registration-2 border-0">
                                    <div class="card-body p-0 cart overflow-auto" style={{ maxHeight: '380px' , cursor:'default'}}>
                                        {
                                            productsCart && productsCart.length > 0 &&
                                            productsCart.map((item, index) => {
                                                let imageBase64 = ''
                                                let price = ''
                                                if (item?.Product?.image) {
                                                    imageBase64 = Buffer.from(item.Product.image.data, 'base64').toString('binary')
                                                }
                                                if (item?.Product?.price) {
                                                    price = formatVND(+item.Product.price*+item.quantity)
                                                }
                                                return (
                                                    <div class="px-3 pt-2">
                                                        <div class="row mb-4 mt-2">
                                                            <div class="col-md-3 col-lg-3 col-xl-3">
                                                                <Link 
                                                                    className='text-dark col-4' 
                                                                    key={index}
                                                                    to={`${path.PRODUCT}/${item.Product.name}`} 
                                                                    state={{ 
                                                                        productId: item.Product.id,
                                                                        productName: item.Product.name,
                                                                    }}
                                                                >
                                                                    <div 
                                                                        style={{ 
                                                                            width: '100%',   
                                                                            height: '100%',                                                     
                                                                            backgroundImage: `url(${imageBase64})`,
                                                                            backgroundPosition: 'center',
                                                                            backgroundSize: 'contain',
                                                                            backgroundRepeat: 'no-repeat'
                                                                        }}
                                                                    ></div>
                                                                </Link>
                                                            </div>
                                                            <div className='col-9'>
                                                                <div className="">
                                                                    <Link 
                                                                        class="text-black name-product-cart" 
                                                                        style={{ cursor: 'pointer' }}
                                                                        to={`${path.PRODUCT}/${item.Product.name}`} 
                                                                        state={{ 
                                                                            productId: item.Product.id,
                                                                            productName: item.Product.name,
                                                                        }}
                                                                    >
                                                                        {item.Product.name}
                                                                    </Link>
                                                                    <span className="text-muted" style={{ fontSize: '14px', fontWeight: 500 }}>Size: {item.size}</span>
                                                                </div>
                                                                <div className="row d-flex align-items-center">
                                                                    <span className='col-5 text-muted' style={{ fontSize: '14px', fontWeight: 500 }} >Số lượng:</span>
                                                                    <div className='col-md-6 d-flex'>
                                                                        <button 
                                                                            className="btn py-0 px-2"
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
                                                                        />

                                                                        <button 
                                                                            className="btn py-0 px-2"
                                                                            onClick={() => handleStepUp(item?.Product?.id, item?.size, typeStep.UP)}
                                                                        >
                                                                            <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faPlus} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex align-items-center pt-1" style={{ cursor:'default', gap: '5rem' }} >
                                                                    <button 
                                                                        className='bg-transparent' 
                                                                        style={{ cursor: 'pointer' }} 
                                                                        data-toggle="tooltip" 
                                                                        title='Xóa'
                                                                        onClick={() => handleDeleteProductCart(item?.Product?.id, item?.size)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrash} style={{ color: '#942319' }}/>
                                                                    </button>
                                                                    <div>
                                                                        <span className='float-end text-danger' style={{ fontWeight: 600 }}>{price}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr className=""/>
                                                    </div>
                                                )
                                            })                                
                                        } 
                                    </div>
                                    <div className='py-3 bg-light px-2' style={{ cursor: 'default' }}>
                                        <div className=''>
                                            <span className='text-muted' style={{ fontSize: '15px', fontWeight: 500 }}>Tổng tiền: </span>
                                            <span className='text-danger fw-bold float-end'>{formatVND(totalMoney)}</span>
                                        </div>
                                        <div className='mt-1'>
                                            <button className='btn w-100 text-white' style={{ backgroundColor: '#420500' }}>Thanh toán</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        productsCart: state.cart.products,
        countProducts: state.cart.countProducts,
        totalMoney: state.cart.totalMoney
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductsInCartByUserRedux: (accessToken, userId) => dispatch(actions.getProductsInCartByUser(accessToken, userId)),
        deleteProductInCartRedux: (accessToken, data) => dispatch(actions.deleteProductInCart(accessToken, data)),
        deleteAProductInCartRedux: (accessToken, data) => dispatch(actions.deleteAProductInCart(accessToken, data))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ListCarts));