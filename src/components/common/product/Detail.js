import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode';
import { formatVND, listBag, listHat, path } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Detail.scss'
import { toast } from 'react-toastify';



function Detail({accessToken, product, sizes, addProductToCartRedux}) {
    const [discount, setDiscount] = useState('')
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [userId, setUserId] = useState('')

    useEffect(() => {
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            setUserId(tokenDecoded?.id)
        }
    }, [])

    useEffect(() => {
        let dis = 0
        if (product?.dataDiscount?.valueEn !== '0') {
            dis = parseFloat(product?.dataDiscount?.valueEn.split('%')[0])
            dis = product?.price - (dis/100 * product?.price)
            setDiscount(dis)
        }
        setSize(sizes?.at(0))
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
        addProductToCartRedux(accessToken, { userId, productId: product?.id, quantity:quantity, size})
    }
   
    console.log(product)

    return (
        <div className='product-detail'>
            <h3 className='fs-4'>{product?.name}</h3>
            <div className='mb-1'>
                <span className='text-banner text-muted'>Đánh giá sản phẩm này</span>
            </div>
            <div className='banner d-flex gap-4 mb-2'>
                <div className='brand'>
                    <span className='text-banner text-muted'>Thương hiệu: 
                        <span className='text-black fs-6'> {product?.dataBrand?.valueEn}</span>
                    </span>
                </div>
                <div className='code'>
                    <span className='text-banner text-muted'>Mã: 
                        <span className='text-black fs-6'> {product?.productCode}</span>
                    </span>
                </div>
            </div>
            <div className='price mb-2'>
                {
                    discount ? <span className='price-last fs-4 fw-bold' style={{ color: '#942319' }}>{formatVND(discount)}</span> : ''
                }
                <span 
                    className={discount ? 'price-begin fs-5 ms-2 text-decoration-line-through' : 'price-begin fs-4 fw-bold'} 
                    style={discount ? { color: '#949494' } : { color: '#942319' }}
                >
                    {formatVND(product?.price)}
                </span>
            </div>
            <form>
                {
                    product?.categoresId === listBag.BALO || product?.categoresId === listBag.BAG || product?.categoresId === listHat.HAT1 || product?.categoresId === listHat.HAT2 ?
                    '' : 
                    <div className='size'>
                        <div className='title mb-2'>
                            <span className='text-banner text-muted'>Size: </span>
                            <span style={{ color: '#942319', fontWeight: '600'}}> {size}</span>
                        </div>
                        <div className='select-size mb-2'>
                            <div className='row gap-2'>
                                {   
                                    sizes && sizes.length > 0 &&
                                    sizes.map((item, index) => {
                                        return (
                                            <div 
                                                className='col-2' 
                                                key={index}
                                            >
                                                <input 
                                                    type="radio" 
                                                    checked={size === item ? true : false}
                                                    className="form-check-input" 
                                                    id={`checkItem${item}`}
                                                    value={item}
                                                    onChange={e => handleOnchangeRadio(e)}
                                                    hidden={true}
                                                />
                                                <label 
                                                    className={size === item ? 'form-check-label rounded p-2 px-4 active' : 'form-check-label rounded p-2 px-4 label-select'}
                                                    htmlFor={`checkItem${item}`}
                                                >
                                                    {item}
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
                            defaultValue={1}
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
                            className='btn btn-add-cart text-white w-100'
                            onClick={(e) => handleAddCart(e)}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                    <div className='add-cart col-md-5'>
                        <button  
                            className='btn btn-add-buy text-white w-100'
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        product: state.product.products,
        sizes: state.product.sizes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCartRedux: (accessToken, data) => dispatch(actions.addProductToCart(accessToken, data))        

    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Detail));
