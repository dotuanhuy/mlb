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
import { Modal } from 'react-bootstrap';

function ListCarts({ 
    productsCart, 
    totalMoney, 
    countProducts,
    getProductsInCartByUserRedux,
    deleteProductInCartRedux,
    changeCartRedux
}) {
    const [userId, setUserId] = useState('')
    const [show, setShow] = useState({})

    const handleClose = () => setShow({});
    const handleShow = (id) => setShow({id})
    const accessToken = window.localStorage.getItem('accessToken')

    useEffect(() => {
        if (accessToken) {
            let tokenDecoded = jwtDecode(accessToken)
            setUserId(tokenDecoded?.id)
        }
    }, [])
    
    useEffect(() => {
        if (userId) {
            getProductsInCartByUserRedux()
        }
    }, [userId])

    const handleStepDown = (cartDetailId, down) => {
        changeCartRedux({ cartDetailId, userId, typeStep: down })
    }

    const handleStepUp = (cartDetailId, up) => {
        changeCartRedux({ cartDetailId, userId, typeStep: up })
    }
    
    const handleDeleteProductCart = (cartDetailId) => {
        deleteProductInCartRedux({ cartDetailId, userId })
    }

    const handleOnchangeQuantity = e => {
        console.log(+e.target.value)
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
                                                let price = ''
                                                if (item?.dataCartProduct?.price) {
                                                    price = formatVND((+item.dataCartProduct.price - +item.dataCartProduct.price*item.dataCartProduct.dataDiscounts.value)*+item.dataCartProduct.CartDetail.quantity)
                                                }
                                                return (
                                                    <div class="px-3 pt-2">
                                                        <div class="row mb-4 mt-2">
                                                            <div class="col-md-3 col-lg-3 col-xl-3 position-relative">
                                                                {
                                                                    item?.dataCartProduct?.dataDiscounts?.value === 0 ? ''
                                                                    :
                                                                    <div 
                                                                        className='position-absolute'
                                                                        style={{ 
                                                                            right: '10px'
                                                                        }}
                                                                    >
                                                                        <span className='text-danger fw-500 fs-14'>-{+item?.dataCartProduct?.dataDiscounts?.value*100}%</span>
                                                                    </div>
                                                                }
                                                                <Link 
                                                                    className='text-dark col-4' 
                                                                    key={index}
                                                                    to={`${path.PRODUCT}/${item.dataCartProduct.name}`} 
                                                                    state={{ 
                                                                        productId: item.dataCartProduct.id,
                                                                        productName: item.dataCartProduct.name,
                                                                    }}
                                                                >
                                                                    <div 
                                                                        style={{ 
                                                                            width: '100%',   
                                                                            height: '100%',                                                     
                                                                            backgroundImage: `url(${item.dataCartProduct.image})`,
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
                                                                        to={`${path.PRODUCT}/${item.dataCartProduct.name}`} 
                                                                        state={{ 
                                                                            productId: item.dataCartProduct.id,
                                                                            productName: item.dataCartProduct.name,
                                                                        }}
                                                                    >
                                                                        {item.dataCartProduct.name}
                                                                    </Link>
                                                                    {
                                                                        item?.dataCartProduct.CartDetail?.size ? <span className="text-muted" style={{ fontSize: '14px', fontWeight: 500 }}>Size: {item?.dataCartProduct.CartDetail?.size}</span> : ''
                                                                    }
                                                                </div>
                                                                <div className="row d-flex align-items-center">
                                                                    <span className='col-5 text-muted' style={{ fontSize: '14px', fontWeight: 500 }} >Số lượng:</span>
                                                                    <div className='col-md-6 d-flex'>
                                                                        <button 
                                                                            className="btn py-0 px-2 button-hover"
                                                                            onClick={() => handleStepDown(item?.dataCartProduct?.CartDetail?.id, typeStep.DOWN)}
                                                                        >
                                                                            <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faMinus} />
                                                                        </button>

                                                                        <input 
                                                                            id="form1" 
                                                                            min="0" 
                                                                            name="quantity" 
                                                                            type="number"
                                                                            className="form-control form-control-sm py-0" 
                                                                            value={+item.dataCartProduct.CartDetail.quantity} 
                                                                            onChange={e => handleOnchangeQuantity(e)}
                                                                            disabled
                                                                        />

                                                                        <button 
                                                                            className="btn py-0 px-2 button-hover"
                                                                            onClick={() => handleStepUp(item?.dataCartProduct?.CartDetail?.id, typeStep.UP)}
                                                                        >
                                                                            <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faPlus} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex align-items-center pt-1" style={{ cursor:'default', gap: '5rem' }} >
                                                                    <button 
                                                                        className='bg-transparent button-hover' 
                                                                        style={{ cursor: 'pointer' }} 
                                                                        data-toggle="tooltip" 
                                                                        title='Xóa'
                                                                        onClick={() => handleShow(item?.dataCartProduct?.CartDetail?.productId)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrash} style={{ color: '#942319' }}/>
                                                                    </button>
                                                                    <Modal show={show?.id === item?.dataCartProduct?.CartDetail?.productId || false} onHide={handleClose}>
                                                                        <Modal.Header closeButton>
                                                                            <Modal.Title>Xóa sản phẩm trong giỏ hàng</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>Bạn có chắc xóa "{item?.dataCartProduct?.name}"</Modal.Body>
                                                                        <Modal.Footer>
                                                                            <button className='btn btn-secondary' onClick={handleClose}>
                                                                                Hủy
                                                                            </button>
                                                                            <button 
                                                                                className='btn btn-root fw-500' 
                                                                                onClick={() => handleDeleteProductCart(item?.dataCartProduct?.CartDetail?.id)}
                                                                            >
                                                                                Xóa
                                                                            </button>
                                                                        </Modal.Footer>
                                                                    </Modal> 
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
                                            <button 
                                                className='btn w-100 text-white button-hover' 
                                                style={{ backgroundColor: '#420500' }}
                                            >
                                                Thanh toán
                                            </button>
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
        productsCart: state.cart.products,
        countProducts: state.cart.countProducts,
        totalMoney: state.cart.totalMoney
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductsInCartByUserRedux: () => dispatch(actions.getProductsInCartByUser()),
        deleteProductInCartRedux: (data) => dispatch(actions.deleteProductInCart(data)),
        changeCartRedux: (data) => dispatch(actions.changeCart(data))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ListCarts));
