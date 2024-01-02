import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {  faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './Toast.scss';
import * as actions from '../../store/actions'
import jwt_decode from 'jwt-decode'

function Action({
    productId, 
    accessToken,
    isFavourite,
    addProductFavouriteRedux,
}) {
    const [isSateFavourite, setIsSateFavourite] = useState(false)
    const [userId, setUserId] = useState('')
    
    useEffect(() => {
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            setUserId(tokenDecoded?.id)
        }
        setIsSateFavourite(isFavourite)
    }, [isFavourite])
    
    const hanleClickFavourite = () => {
        setIsSateFavourite(!isSateFavourite)
        isSateFavourite ? toast.warn(CustomToast, { autoClose: 3000 }) : toast.info(CustomToast, { autoClose: 3000 }) 
        addProductFavouriteRedux(accessToken, { productId, userId })       
    }
    const CustomToast = () => (
        <>
            {
                isSateFavourite ? 
                <span className='fw-light' style={{ fontSize: 14, fontFamily:'serif' }}>
                    Bạn vừa bỏ sản phẩm ra khỏi mục yêu thích
                </span>
                :
                <span className='fw-light' style={{ fontSize: 14, fontFamily:'serif' }}>
                    Bạn vừa thêm 1 sản phẩm vào mục yêu thích. Bấm
                    <a href='#' className='text-primary' > vào đây </a>
                    để tới trang yêu thích
                </span>
            }
        </>
    )
    
    return (
        <>
            <div className='actions text-center'>
                <button className='tym mb-2 px-3 text-black-50'>
                    <FontAwesomeIcon
                        className={isSateFavourite ? 'icon-favourite text-danger' : 'icon-favourite'}
                        icon={faHeart} 
                        onClick={hanleClickFavourite}
                    />
                </button>
                <div className='cart'>
                    <button className='btn-buy'>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                </div>
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
        addProductFavouriteRedux: (accessToken, data) => dispatch(actions.addProductFavourite(accessToken, data)),
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Action));
