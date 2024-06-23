import React, { memo, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { CustomToast, DELETE, path } from '../../../utils';
import { Modal } from 'react-bootstrap';

function Action({ productId, isFavourite, bg }) {
    const dispatch = useDispatch()
    const { status } = useSelector(state => state.favouriteProduct)
    const accessToken = window.localStorage.getItem('accessToken')
    const [show, setShow] = useState({})
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [id, setId] = useState('')

    useEffect(() => {
        if (status && id === productId) {
            if (status === DELETE) {
                toast.info(CustomToast('Bạn vừa bỏ sản phẩm ra khỏi mục yêu thích'), { autoClose: 2000 })
            }
            else {
                toast.info(CustomToast('Bạn vừa thêm 1 sản phẩm vào mục yêu thích'), { autoClose: 2000 })
            }
            dispatch(actions.refreshIStatusFavouriteProduct())
        }
    }, [status])

    const handleClose = () => setShow({});

    const hanleClickFavourite = () => {
        if (accessToken) {
            if (bg === 'cover') {
                dispatch(actions.changeProductFavourite({ productId }))
            }
            else {
                dispatch(actions.changeProductFavourite({ productId }, params.get('page') || 1))
            }
            setId(productId)
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
            <button className='tym mb-2 px-3 text-black-50'>
                <FontAwesomeIcon
                    className={isFavourite ? 'icon-favourite text-danger' : 'icon-favourite'}
                    icon={faHeart}
                    onClick={hanleClickFavourite}
                    data-toggle="tooltip"
                    title={isFavourite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                />
            </button>
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
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Action));
