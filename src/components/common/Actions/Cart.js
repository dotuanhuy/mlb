import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode'
import { path } from '../../../utils';


function Cart({
    productId,
    size,
    accessToken, 
    addProductToCartRedux
}) {
    const [userId, setUserId] = useState('')
    useEffect(() => {
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            setUserId(tokenDecoded?.id)
        }
    }, [])

    const CustomToast = () => (
        <span className='fw-light' style={{ fontSize: 14, fontFamily:'serif' }}>
            Bạn vừa thêm 1 sản phẩm vào giỏ hàng. Bấm
            <a href={path.CART} className='text-primary' > vào đây </a>
            để tới giỏ hàng
        </span>
    )

    const handleAddCart = () => {
        toast.info(CustomToast, { autoClose: 3000 })
        addProductToCartRedux(accessToken, { userId, productId, quantity:1, size})
    }

    
    return (
        <>    
            <div className='cart'>
                <button 
                    className='btn-buy' 
                    data-toggle="tooltip"
                    title='Thêm vào giỏ hàng'
                    onClick={() => handleAddCart}
                >
                    <FontAwesomeIcon icon={faCartShopping} />
                </button>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCartRedux: (accessToken, data) => dispatch(actions.addProductToCart(accessToken, data))        
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Cart));
