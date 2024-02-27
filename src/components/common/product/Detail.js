import React, { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode';
import { formatVND, listBag, listHat, path } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Detail.scss'
import { toast } from 'react-toastify';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';


function Detail({product, addProductToCartRedux}) {
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [userId, setUserId] = useState('')
    const body = useRef()
    const initialRender = useRef(true)
    const accessToken = window.localStorage.getItem('accessToken')

    useEffect(() => {
        document.title = product.name
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            setUserId(tokenDecoded?.id)
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
        setSize(product?.dataSizeDetail?.at(0)?.name)
    }, [product])

    const handleOnchangeRadio = e => {
        setSize(e.target.value)
    }

    const handleOnchangeQuantity = e => {
        setQuantity(+e.target.value)
    }
    
    const handleStepDown = e => {
        e.preventDefault()
        if (quantity === 1) {
            setQuantity(1)
        }
        else {
            setQuantity(prev => --prev)
        }
    }

    const handleStepUp = e => {
        e.preventDefault()
        setQuantity(prev => ++prev)
    }

    const handleAddCart = e => {
        e.preventDefault()
        toast.info(() => (
            <span className='fw-light' style={{ fontSize: 14, fontFamily:'serif' }}>
                Bạn vừa thêm 1 sản phẩm vào giỏ hàng. Bấm
                <a href={path.CART} className='text-primary' > vào đây </a>
                để tới giỏ hàng
            </span>
        ), { autoClose: 3000 })
        addProductToCartRedux({ userId, productId: product?.id, quantity: quantity, size })
    }
   
    return (
        <div ref={body} className='product-detail'>
            <h3 className='fs-4'>{product?.name}</h3>
            <div className='mb-1'>
                <span className='text-banner text-muted'>Đánh giá sản phẩm này</span>
            </div>
            <div className='banner d-flex gap-4 mb-2'>
                <div className='brand'>
                    <span className='text-banner text-muted'>Thương hiệu: 
                        <span className='text-black fs-6'> {product?.dataBrands?.name}</span>
                    </span>
                </div>
                <div className='code'>
                    <span className='text-banner text-muted'>Mã: 
                        <span className='text-black fs-6'> {product?.code}</span>
                    </span>
                </div>
            </div>
            <div className='price mb-2'>
                {
                    product?.dataDiscounts?.value !== 0 ? <span className='price-last fs-4 fw-bold' style={{ color: '#942319' }}>{formatVND(+product?.price - +product?.price*+product?.dataDiscounts?.value)}</span> : ''
                }
                <span 
                    className={product?.dataDiscounts?.value !== 0 ? 'price-begin fs-5 ms-2 text-decoration-line-through' : 'price-begin fs-4 fw-bold'} 
                    style={product?.dataDiscounts?.value !== 0 ? { color: '#949494' } : { color: '#942319' }}
                >
                    {formatVND(product?.price)}
                </span>
            </div>
            <form>
                {
                    product?.dataSizeDetail?.length === 0 ?
                    '' : 
                    <div className='size'>
                        <div className='title mb-2'>
                            <span className='text-banner text-muted'>Size: </span>
                            <span style={{ color: '#942319', fontWeight: '600'}}> {size}</span>
                        </div>
                        <div className='select-size mb-2'>
                            <div className='row gy-2'>
                                {   
                                    product?.dataSizeDetail?.map((item, index) => {
                                        return (
                                            <div 
                                                className='col-3' 
                                                key={index}
                                            >
                                                <input 
                                                    type="radio" 
                                                    checked={size === item.name ? true : false}
                                                    className="form-control" 
                                                    id={`checkItem${item.name}`}
                                                    value={item.name}
                                                    onChange={e => handleOnchangeRadio(e)}
                                                    hidden={true}
                                                />
                                                <label 
                                                    className={size === item.name ? 'form-check-label rounded active py-2 w-100 text-center' : 'form-check-label rounded py-2 w-100 text-center label-select'}
                                                    htmlFor={`checkItem${item.name}`}
                                                >
                                                    {item.name}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>  
                    </div>
                }
                <div className='d-flex align-items-center'>
                    <span className='text-banner text-muted'>Số lượng:</span>
                    <div className='col-md-4 ps-4 d-flex'>
                            <button 
                                className="btn py-0 px-2 button-hover"
                                onClick={(e) => handleStepDown(e)}
                            >
                                <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faMinus} />
                            </button>
                        <input 
                            type='number' 
                            className='form-control w-100' 
                            min={1}
                            max={100}
                            value={quantity}
                            onChange={e => handleOnchangeQuantity(e)}
                        />
                        <button 
                            className="btn py-0 px-2 button-hover"
                            onClick={(e) => handleStepUp(e)}
                        >
                            <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faPlus} />
                        </button>
                    </div>
                </div>
                <div className='d-flex mt-3 gap-3'>
                    <div className='add-cart col-md-5'>
                        <button  
                            className='btn btn-add-cart text-white w-100 fw-500'
                            onClick={(e) => handleAddCart(e)}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                    <div className='add-cart col-md-5'>
                        <button  
                            className='btn btn-add-buy text-white w-100 fw-500'
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </form>
            <div className='mt-2 fw-500 fs-14'>
                <Link
                    className='text-color-root-bold'
                    to={path.TUTORIAL_SIZE}
                    target='_blank'
                >
                    <FontAwesomeIcon className='pe-2' icon={faFileLines} />
                    Xem hướng dẫn chọn size
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        product: state.product.products,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCartRedux: (data) => dispatch(actions.addProductToCart(data))        

    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Detail));
