import React, { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Loading from '../common/Loading/Loading';
import * as actions from '../../store/actions'
import Navbar from '../HomePage/Navbar/Navbar';
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';
import jwtDecode from 'jwt-decode';
import Banner from '../common/Banners/Banner';
import { formatVND, path, typeStep } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import './PageCart.scss'
import { Modal } from 'react-bootstrap';

function PageCart({
    titlePage,
    products,
    totalMoney,
    isLoading,
    getProductsInCartByUserRedux,
    deleteAProductInCartRedux,
    deleteProductInCartRedux
}) {
    const accessToken = window.localStorage.getItem('accessToken')
    const [userId, setUserId] = useState('')
    const [show, setShow] = useState({})
    const body = useRef()
    const initialRender  = useRef(true)
    const navigate = useNavigate()

    const handleClose = () => setShow({});
    const handleShow = (id) => setShow({id})

    useEffect(() => {
        document.title = titlePage
        if (accessToken) {
            let tokenDecoded = jwtDecode(accessToken)
            setUserId(tokenDecoded?.id)
        }
        else {
            navigate(path.LOGIN)
        }
    }, [])
    
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
    
    useEffect(() => {
        if (userId) {
            getProductsInCartByUserRedux(userId)
        }
    }, [userId])

    const handleStepDown = (productId, size, cartId, down) => {
        deleteAProductInCartRedux({ productId, cartId, userId, size, typeStep: down })
    }

    const handleStepUp = (productId, size, cartId, up) => {
        deleteAProductInCartRedux({ productId, cartId, userId, size, typeStep: up })
    }
    
    const handleDeleteProductCart = (productId, size, cartId) => {
        deleteProductInCartRedux({ productId, userId, cartId, size })
    }

    const handleOnchangeQuantity = e => {
        console.log(+e.target.value)
    }
    
    return (
        <>
            {
                isLoading ?
                <Loading />
                :
                <div className=''>
                    <Navbar />
                    <div>
                        <Banner categoryProduct={'Giỏ hàng'} title={'Giỏ hàng'}/>
                    </div>
                    <div ref={body} className='container mt-5'>
                        <h4 className='fs-5 text-uppercase my-4 text-center'>Giỏ hàng của bạn tại mlb việt nam</h4>
                        {
                            products && products.length > 0 ? 
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
                                                let price = ''
                                                if (item?.dataCartProduct?.image) {
                                                    imageBase64 = Buffer.from(item?.dataCartProduct?.image?.data, 'base64').toString('binary')
                                                }
                                                if (item?.dataCartProduct?.price) {
                                                    price = formatVND((+item.dataCartProduct.price - +item.dataCartProduct.price*item.dataCartProduct.dataDiscounts.value)*+item.dataCartProduct.CartDetail.quantity)
                                                }
                                                return (
                                                    <tr key={index}>
                                                        <td scope="row" className='col-6'>
                                                            <div className='row d-flex align-items-center'>
                                                                <div className='col-2 position-relative'>
                                                                    {
                                                                        item?.dataCartProduct?.dataDiscounts?.value === 0 ? ''
                                                                        :
                                                                        <div 
                                                                            className='position-absolute'
                                                                            style={{ 
                                                                                right: '-10px'
                                                                            }}
                                                                        >
                                                                            <span className='text-danger fw-500 fs-14'>-{+item?.dataCartProduct?.dataDiscounts?.value*100}%</span>
                                                                        </div>
                                                                    }
                                                                    <Link 
                                                                        to={`${path.PRODUCT}/${item?.dataCartProduct?.name}`} 
                                                                        state={{ 
                                                                            productId: item?.dataCartProduct?.id,
                                                                            productName: item?.dataCartProduct?.name,
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
                                                                        to={`${path.PRODUCT}/${item?.dataCartProduct?.name}`} 
                                                                        state={{ 
                                                                            productId: item?.dataCartProduct?.id,
                                                                            productName: item?.dataCartProduct?.name,
                                                                        }}
                                                                    >
                                                                        {item?.dataCartProduct?.name}
                                                                    </Link>
                                                                    <div>
                                                                        {
                                                                            item?.dataCartProduct?.CartDetail?.size ? <span className='text-muted fw-500 fs-14 '>Size: {item?.dataCartProduct?.CartDetail?.size}</span> : ''
                                                                        }
                                                                    </div>
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
                                                                            <Modal.Title>Delete a product</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>Are you sure delete product "{item?.dataCartProduct?.name}"</Modal.Body>
                                                                        <Modal.Footer>
                                                                            <button className='btn btn-secondary' onClick={handleClose}>
                                                                                Close
                                                                            </button>
                                                                            <button 
                                                                                className='btn btn-root fw-500' 
                                                                                onClick={() => handleDeleteProductCart(item?.dataCartProduct?.id, item?.dataCartProduct?.CartDetail?.size, item?.dataCartProduct?.CartDetail?.cartId)}
                                                                            >
                                                                                Yes
                                                                            </button>
                                                                        </Modal.Footer>
                                                                    </Modal> 
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='col-2'>
                                                            {
                                                                item?.dataCartProduct?.dataDiscounts?.value !== 0 ?
                                                                <span className='text-danger fw-500 pe-2'>{formatVND(item?.dataCartProduct?.price - item?.dataCartProduct?.price*item?.dataCartProduct?.dataDiscounts?.value)}</span>
                                                                : ''
                                                            }
                                                            <span className={item?.dataCartProduct?.dataDiscounts?.value !== 0 ? 'text-decoration-line-through text-muted' : 'text-danger fw-500'}>{formatVND(item?.dataCartProduct?.price)}</span>
                                                        </td>
                                                        <td className='col-2'>
                                                            <div className='col-md-8 d-flex'>
                                                                <button 
                                                                    className="btn py-0 px-2 button-hover"
                                                                    onClick={() => handleStepDown(item?.dataCartProduct?.id, item?.dataCartProduct?.CartDetail?.size, item?.dataCartProduct?.CartDetail?.cartId, typeStep.DOWN)}
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
                                                                />

                                                                <button 
                                                                    className="btn py-0 px-2 button-hover"
                                                                    onClick={() => handleStepUp(item?.dataCartProduct?.id, item?.dataCartProduct?.CartDetail?.size, item?.dataCartProduct?.CartDetail?.cartId, typeStep.UP)}
                                                                >
                                                                    <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faPlus} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className='col-2'>
                                                            <span className='text-danger fw-500'>{formatVND(price)}</span>
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
                            :
                            <h5 className='fs-6 text-danger text-center mb-5'>
                                Bạn chưa có sản phẩm nào trong giỏ hàng!
                            </h5>
                        }
                    </div>
                    <HomeFooter />
                </div>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.cart.products,
        totalMoney: state.cart.totalMoney,
        isLoading: state.cart.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
        getProductsInCartByUserRedux: (userId) => dispatch(actions.getProductsInCartByUser(userId)),
        deleteProductInCartRedux: (data) => dispatch(actions.deleteProductInCart(data)),
        deleteAProductInCartRedux: (data) => dispatch(actions.deleteAProductInCart(data))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(PageCart));
