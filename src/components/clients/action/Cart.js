import React, { memo, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode'
import { path } from '../../../utils';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Cart({ productId, size }) {
    const dispatch = useDispatch()
    const [userId, setUserId] = useState('')
    const accessToken = window.localStorage.getItem('accessToken')
    const [show, setShow] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            setUserId(tokenDecoded?.id)
        }
    }, [])

    const handleClose = () => setShow({});

    const CustomToast = () => (
        <span className='fw-light' style={{ fontSize: 14, fontFamily: 'serif' }}>
            Bạn vừa thêm 1 sản phẩm vào giỏ hàng. Bấm
            <a href={path.CART} className='text-primary' > vào đây </a>
            để tới giỏ hàng
        </span>
    )

    const handleAddCart = () => {
        if (accessToken) {
            dispatch(actions.addProductToCart({ userId, productId, quantity: 1, size }))
            toast.info(CustomToast, { autoClose: 3000 })
        }
        else {
            setShow({ id: productId })
        }
    }

    const handlePathToLogin = () => {
        navigate(path.LOGIN)
    }

    return (
        <>
            <div className='cart'>
                <button
                    className='btn-buy'
                    data-toggle="tooltip"
                    title='Thêm vào giỏ hàng'
                    onClick={() => handleAddCart()}
                >
                    <FontAwesomeIcon icon={faCartShopping} />
                </button>
            </div>
            <Modal show={show?.id === productId || false} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body><span className='fw-500'>Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng</span></Modal.Body>
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
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Cart));
