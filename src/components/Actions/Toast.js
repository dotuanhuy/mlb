import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {  faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './Toast.scss';

function Action({productId}) {
    const [state, setState] = useState()
    const [isFavourite, setIsFavourite] = useState(false)

    const hanleClickFavourite = () => {
        setState(productId)
        setIsFavourite(!isFavourite)
        isFavourite ? toast.warn(CustomToast, { autoClose: 3000 }) : toast.info(CustomToast, { autoClose: 3000 })        
    }
    const CustomToast = () => (
        <>
            {
                isFavourite ? 
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
                <button className='tym mb-2 px-3'>
                    <FontAwesomeIcon
                        className={isFavourite ? 'icon-favourite text-danger' : 'icon-favourite'}
                        icon={faHeart} 
                        onClick={hanleClickFavourite}
                        values={state}
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
        
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Action));
