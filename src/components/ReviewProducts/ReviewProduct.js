import { faCircle, faPencil, faStar, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import { Form, InputGroup, Modal } from 'react-bootstrap';
import { validateRequire } from '../../validate/valiedate';
import { formatDateTimeVN } from '../../utils';
import jwt_decode from 'jwt-decode'
import SocketContext from '../../configs/socketContext';
import { useSocket } from '../../configs/socketContext';

const arrStar = ['Tất cả', 5, 4, 3, 2, 1]

function ReviewProduct({ productId }) {
    const dispatch = useDispatch()
    const { reviews, rate, totalEachRating } = useSelector(state => state.review)
    const [curentUser, setCurrentUser] = useState('')
    const [star, setStar] = useState(arrStar[0])
    const [stateReview, setStateReview] = useState([])
    const [contentReview, setContentReview] = useState({update: '', current: ''})
    const [show, setShow] = useState({})
    const [stateUpdateReview, setStateUpdateReview] = useState('')
    const [starUpdate, setStarUpdate] = useState({update: 0, current: 0})
    const socket = useSocket()

    const handleClose = () => setShow({});
    const handleShow = (id, type) => setShow({ id, type })

    useEffect(() => {
        dispatch(actions.getReviewProduct(productId))
    }, [])

    useEffect(() => {
        if (reviews.length > 0) {
            const token = window.localStorage.getItem('accessToken')
            if (token) {
                const currentUser = jwt_decode(token)
                setCurrentUser(currentUser)
            }
            setStateReview(reviews)
        }
    }, [reviews])

    useEffect(() => {
        if (star === 'Tất cả') {
            setStateReview(reviews)
        }
        else {
            if (reviews?.length > 0) {
                const arr = reviews?.filter(item => item.rate === star)
                setStateReview(arr)
            }
        }
    }, [star])

    const handOnKeyDown = (e, reviewId) => {
        if (e.key === 'Enter') {
            handleSendReview(reviewId)
        }
    }

    const handOnKeyDownUpdateReview = (e, id, userId) => {
        if (e.key === 'Enter') {
            handleUpdateReview(id, userId)
        }
    }

    const handleSendReview = (reviewId) => {
        const message = validateRequire('Phản hồi', contentReview.update.trim())
        if (message) {
            alert(message)
        }
        else {
            dispatch(actions.createFeedback({ reviewId, content: contentReview.update.trim(), productId: productId }))
            setContentReview({update: '', current: contentReview.current})
        }
    }

    const handleUpdateReview = (id, userId) => {
        if (contentReview.update.trim() === contentReview.current.trim() && starUpdate.update === starUpdate.current) {
            setStateUpdateReview('')
        }
        else {
            dispatch(actions.updateReview({ id, userId, content: contentReview.update.trim(), rate: starUpdate.update, productId: productId }))
            setStateUpdateReview('')
        }
    }

    const handleDeleteReview = (id, userId) => {
        dispatch(actions.deleteReview({ id, userId, productId: productId }))
        handleClose()
    }

    return (
        <div className='border rounded col-10'>
            <div className='bg-review py-5'>
                <div className='row w-100'>
                    <div className='col-3 text-center'>
                        <span className='fs-3 text-color-review'>{rate}/5</span>
                        <br></br>
                        <div className='pb-1'>
                            {
                                arrStar.map((item, index) => {
                                    return (
                                        <FontAwesomeIcon key={index} className='pe-1' color='#ff4d00' icon={faStar} />
                                    )
                                })
                            }
                        </div>
                        <p>({reviews?.length} đánh giá)</p>
                        <button className='btn btn-review' >Gửi đánh giá của bạn</button>
                    </div>
                    <div className='col-9'>
                        {
                            arrStar.map((item, index) => {
                                return (
                                    <button
                                        className={item === star ? 'rounded btn-active-star bg-light py-2 px-4 me-2 mt-1' : 'rounded border bg-light text-dark py-2 px-4 me-2 mt-1'}
                                        onClick={() => setStar(item)}
                                    >
                                        {item != 'Tất cả' ? `${item} sao (${totalEachRating[item]})` : item}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {
                stateReview && stateReview.length > 0 && stateReview?.map((item, index) => {
                    return (
                        <div className='mt-4 px-4 mb-4' key={index}>
                            <div className='mb-3'>
                                <div className='d-flex align-items-center'>
                                    <FontAwesomeIcon className='border p-2 rounded-circle' icon={faUser} />
                                    <span className='ps-2 pe-3 fw-500'>{`${item?.dataReviewUser?.firstName} ${item?.dataReviewUser?.lastName}`}</span>
                                    {
                                        [...Array(item?.rate)].map((item, index) => {
                                            return (
                                                <FontAwesomeIcon key={index} className='pe-1' style={{ fontSize: '10px' }} color='#ff4d00' icon={faStar} />
                                            )
                                        })
                                    }
                                </div>
                                <p className='ps-5 mb-0'>{item?.content}</p>
                                <span className='ps-5 text-muted fw-500 d-flex align-items-center gap-1' style={{ fontSize: '12px' }}>
                                    <FontAwesomeIcon style={{ fontSize: '4px' }} icon={faCircle} />
                                    {formatDateTimeVN(item?.updatedAt)}
                                </span>
                                {
                                    curentUser?.id === item?.dataReviewUser?.id ?
                                        <>
                                            <FontAwesomeIcon
                                                data-toggle="tooltip"
                                                title='Sửa'
                                                className={item?.id === stateUpdateReview ? 'ms-5' : 'ms-5 text-color-light'}
                                                style={{ cursor: 'pointer' }}
                                                icon={faPencil}
                                                onClick={() => {
                                                    setStateUpdateReview(prev => {
                                                        return prev === item?.id ? '' : item?.id
                                                    })
                                                    setStarUpdate({
                                                        update: item?.rate,
                                                        current: item?.rate
                                                    })
                                                    setContentReview({
                                                        update: item?.content,
                                                        current: item?.content
                                                    })
                                                }}
                                            />
                                            <FontAwesomeIcon
                                                data-toggle="tooltip"
                                                title='Xóa'
                                                className='ms-3 text-color-light'
                                                style={{ cursor: 'pointer' }}
                                                icon={faTrash}
                                                onClick={() => handleShow(item?.id, 'review')}
                                            />
                                            <br></br>
                                        </>
                                    : ''
                                }
                                {
                                    item?.id === stateUpdateReview ?
                                        <>
                                            <span className='text-muted fw-500 me-2' style={{ fontSize: '13px' }} >Đánh giá</span>
                                            {
                                                [...[1, 2, 3, 4, 5]].map((number, index) =>
                                                    number <= +starUpdate.update ?
                                                        <FontAwesomeIcon
                                                            key={index} className='me-1'
                                                            style={{ fontSize: '12px', cursor: 'pointer' }}
                                                            color='#ff4d00'
                                                            icon={faStar}
                                                            onClick={() => setStarUpdate({
                                                                update: number,
                                                                current: starUpdate.current
                                                            })}
                                                        />
                                                        :
                                                        <FontAwesomeIcon
                                                            key={index} className='me-1'
                                                            style={{ fontSize: '12px', cursor: 'pointer' }}
                                                            icon={faStar}
                                                            onClick={() => setStarUpdate({
                                                                update: number,
                                                                current: starUpdate.current
                                                            })}
                                                        />
                                                )
                                            }
                                            <InputGroup className="mb-3 mt-1">
                                                <Form.Control
                                                    placeholder="Nhập nội dung phản hồi"
                                                    aria-label="Nhập nội dung phản hồi"
                                                    aria-describedby="basic-addon2"
                                                    onKeyDown={(e) => handOnKeyDownUpdateReview(e, item?.id, item?.dataReviewUser?.id)}
                                                    defaultValue={item?.content}
                                                    onChange={(e) => setContentReview({
                                                        ...contentReview,
                                                        update: e.target.value
                                                    })}
                                                />
                                                <button
                                                    className='btn btn-review'
                                                    // id="basic-addon2"
                                                    onClick={() => handleUpdateReview(item?.id, item?.dataReviewUser?.id)}
                                                >Lưu</button>
                                            </InputGroup>
                                        </>
                                        : ''
                                }
                                <Modal show={(show?.id === item?.id && show.type === 'review') || false} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Xóa bình luận</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Bạn có chắc xóa bình luật này không</Modal.Body>
                                    <Modal.Footer>
                                        <button className='btn btn-secondary' onClick={handleClose}>
                                            Hủy
                                        </button>
                                        <button
                                            className='btn btn-root fw-500'
                                            onClick={() => handleDeleteReview(item?.id, item?.dataReviewUser?.id)}
                                        >
                                            Xóa
                                        </button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            {
                                item?.dataFeedbackReview ?
                                    <div className='ps-5'>
                                        <div className='d-flex align-items-center'>
                                            <FontAwesomeIcon className='border p-2 rounded-circle' icon={faUser} />
                                            <span className='ps-2 fw-500'>MLB</span>
                                            <span className='border px-2 ms-2 rounded text-light' style={{ background: '#b835bb', fontSize: '12px' }}>Quản trị viên</span>
                                        </div>
                                        <p className='ps-5 mb-0'>{item?.dataFeedbackReview?.content}</p>
                                        <span className='ps-5 text-muted fw-500 d-flex align-items-center gap-1' style={{ fontSize: '12px' }}>
                                            <FontAwesomeIcon style={{ fontSize: '4px' }} icon={faCircle} />
                                            {formatDateTimeVN(item?.dataFeedbackReview?.updatedAt)}
                                        </span>
                                    </div>
                                    :
                                    <InputGroup className="mb-3 mt-1">
                                        <Form.Control
                                            placeholder="Nhập nội dung phản hồi"
                                            aria-label="Nhập nội dung phản hồi"
                                            aria-describedby="basic-addon2"
                                            onKeyDown={(e) => handOnKeyDown(e, item?.id)}
                                            value={contentReview}
                                            onChange={(e) => setContentReview({
                                                ...contentReview,
                                                update: e.target.value
                                            })}
                                        />
                                        <button
                                            className='btn btn-review'
                                            // id="basic-addon2"
                                            onClick={() => handleSendReview(item?.id)}
                                        >Gửi</button>
                                    </InputGroup>
                            }
                        </div>

                    )
                })
            }
            {
                stateReview && stateReview.length === 0 ?
                    <div className='text-center mt-4 px-4 mb-4'>
                        Không có đánh giá nào phù hợp với bộ lọc!
                    </div>
                    : ''
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ReviewProduct));
