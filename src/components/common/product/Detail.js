import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import { formatVND } from '../../../utils';
import Action from './Action';



function Detail({product}) {
    const [discount, setDiscount] = useState(0)

    useEffect(() => {
        let dis = 0
        if (product?.dataDiscount?.valueEn !== '0') {
            dis = parseFloat(product?.dataDiscount?.valueEn.split('%')[0])
            dis = product?.price - (dis/100 * product?.price)
        }
        setDiscount(dis)
    }, [product])

    return (
        <div className='product-detail'>
            <h3 className='fs-4'>{product?.name}</h3>
            <div className='mb-1'>
                <span className='fw-light'>Đánh giá sản phẩm này</span>
            </div>
            <div className='banner d-flex gap-4 mb-2'>
                <div className='brand'>
                    <span className='fw-light'>Thương hiệu: 
                        <span style={{ fontWeight: '500' }}> {product?.dataBrand?.valueEn}</span>
                    </span>
                </div>
                <div className='code'>
                    <span className='fw-light'>Mã: 
                        <span style={{ fontWeight: '500' }}> {product?.productCode}</span>
                    </span>
                </div>
            </div>
            <div className='price mb-2'>
                <span className='price-last fs-4 fw-bold' style={{ color: '#942319' }}>{formatVND(product?.price)}</span>
                <span className='price-begin fs-5 ms-2 text-decoration-line-through' style={{ color: '#949494' }}>{formatVND(discount)}</span>
            </div>
            <Action />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        product: state.product.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Detail));
