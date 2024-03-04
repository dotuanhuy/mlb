import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import './Toast.scss';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode'
import { path } from '../../../utils';
import Cart from './Cart';
import { Modal } from 'react-bootstrap';

function Action({
    productId, 
    isFavourite,
    isCart=true,
    size,
    changeProductFavouriteRedux,
}) {
    const location = useLocation().search
    const page = new URLSearchParams(location).get("page");
    const [isSateFavourite, setIsSateFavourite] = useState(false)
    const [userId, setUserId] = useState('')
    const accessToken = window.localStorage.getItem('accessToken')
    const [show, setShow] = useState({})
    const navigate = useNavigate()
    
    useEffect(() => {
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            setUserId(tokenDecoded?.id)
        }
        setIsSateFavourite(isFavourite)
    }, [isFavourite])

    const handleClose = () => setShow({});

    const hanleClickFavourite = () => {
        if (accessToken) {
            if (!isSateFavourite) {
                setIsSateFavourite(!isSateFavourite)
            }
            isSateFavourite ? toast.warn(CustomToast, { autoClose: 3000 }) : toast.info(CustomToast, { autoClose: 3000 }) 
            changeProductFavouriteRedux({ productId, userId }, page)
        }
        else {
            setShow({id: productId})
        }
    }
    
    const handlePathToLogin = () => {
        navigate(path.LOGIN)
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
                    <a href={path.FAVOURITE} className='text-primary' > vào đây </a>
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
                        data-toggle="tooltip"
                        title={isSateFavourite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                    />
                </button>
                {
                    isCart && 
                    <Cart productId={productId} size={size}/>
                }
            </div> 
            <Modal show={show?.id === productId || false} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body><span className='fw-500'>Bạn cần đăng nhập để thêm sản phẩm yêu thích</span></Modal.Body>
                <Modal.Footer>
                    <button 
                        className='btn btn-secondary' 
                        onClick={handleClose}
                    >
                        Hủy
                    </button>
                    <button 
                        className='btn btn-root fw-500' 
                        onClick={handlePathToLogin}
                    >
                        Đăng nhập
                    </button>
                </Modal.Footer>
            </Modal> 
        </>
    )
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeProductFavouriteRedux: (data, page) => dispatch(actions.changeProductFavourite(data, page)),
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Action));
