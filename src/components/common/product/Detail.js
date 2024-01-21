import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode';
import { formatVND } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Detail.scss'



function Detail({product, sizes}) {
    const [discount, setDiscount] = useState('')
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState(1)

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
                <div className='d-flex align-items-center'>
                    <span className='text-banner text-muted'>Số lượng:</span>
                    <div className='col-md-4 ps-4 d-flex'>
                            <button 
                                className="btn py-0 px-2"
                                // onClick={() => handleStepDown(item?.Product?.id, item?.size, typeStep.DOWN)}
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
                            className="btn py-0 px-2"
                            // onClick={() => handleStepUp(item?.Product?.id, item?.size, typeStep.UP)}
                        >
                            <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faPlus} />
                        </button>
                    </div>
                </div>
                <div className='d-flex mt-3 gap-3'>
                    <div className='add-cart col-md-5'>
                        <button  
                            className='btn btn-add-cart text-white w-100'
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
        product: state.product.products,
        sizes: state.product.sizes
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Detail));
