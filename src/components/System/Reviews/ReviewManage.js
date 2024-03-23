import { faCircle, faPencil, faStar, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import { useSearchParams } from 'react-router-dom';
import { formatDateTimeVN } from '../../../utils';
import { Form, InputGroup, Modal } from 'react-bootstrap';
import { validateRequire } from '../../../validate/valiedate';

const arrStar = ['Tất cả', 5, 4, 3, 2, 1]

function ReviewManage() {
    const dispatch = useDispatch()
    const { reviews, rate, totalEachRating } = useSelector(state => state.review)
    const [star, setStar] = useState(arrStar[0])
    const [stateReview, setStateReview] = useState([])
    const [params] = useSearchParams()
    const [contentReview, setContentReview] = useState('')
    const [stateUpdateFeedback, setStateUpdateFeedback] = useState('')
    const [show, setShow] = useState({})
    const [stateUpdateReview, setStateUpdateReview] = useState('')
    const [starUpdate, setStarUpdate] = useState('')

    const handleClose = () => setShow({});
    const handleShow = (id, type) => setShow({ id, type })

    useEffect(() => {
        dispatch(actions.getReviewProduct(params.get('id')))
    }, [])


    useEffect(() => {
        if (reviews.length > 0) {
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

    const handOnKeyDownUpdate = (e, id) => {
        if (e.key === 'Enter') {
            handleUpdateFeedback(id)
        }
    }

    const handOnKeyDownUpdateReview = (e, id, userId) => {
        if (e.key === 'Enter') {
            handleUpdateReview(id, userId)
        }
    }

    const handleSendReview = (reviewId) => {
        const message = validateRequire('Phản hồi', contentReview)
        if (message) {
            alert(message)
        }
        else {
            dispatch(actions.createFeedback({ reviewId, content: contentReview, productId: params.get('id') }))
            setContentReview('')
        }
    }

    const handleUpdateFeedback = (id) => {
        if (contentReview === '') {
            setStateUpdateFeedback('')
        }
        else {
            dispatch(actions.updateFeedback({ id, content: contentReview, productId: params.get('id') }))
            setStateUpdateFeedback('')
        }
    }

    const handleDeleteFeedback = (id) => {
        dispatch(actions.deleteFeedback({ id, productId: params.get('id') }))
        handleClose()
    }

    const handleUpdateReview = (id, userId) => {
        if (contentReview === '') {
            setStateUpdateReview('')
        }
        else {
            dispatch(actions.updateReview({ id, userId, content: contentReview, rate: starUpdate, productId: params.get('id') }))
            setStateUpdateReview('')
        }
    }

    const handleDeleteReview = (id, userId) => {
        dispatch(actions.deleteReview({ id, userId, productId: params.get('id') }))
        handleClose()
    }   

    return (
        <div className='border rounded'>
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
                                        setStarUpdate(item?.rate)
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
                                {
                                    item?.id === stateUpdateReview ?
                                        <>
                                            <span className='text-muted fw-500 me-2' style={{ fontSize: '13px' }} >Đánh giá</span>
                                            {
                                                [...[1, 2, 3, 4, 5]].map((number, index) => 
                                                    number <= +starUpdate ? 
                                                    <FontAwesomeIcon
                                                        key={index} className='me-1'
                                                        style={{ fontSize: '12px', cursor: 'pointer' }}
                                                        color='#ff4d00'
                                                        icon={faStar}
                                                        onClick={() => setStarUpdate(number)}
                                                    />
                                                    :
                                                    <FontAwesomeIcon
                                                        key={index} className='me-1'
                                                        style={{ fontSize: '12px', cursor: 'pointer' }}
                                                        icon={faStar}
                                                        onClick={() => setStarUpdate(number)}
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
                                                    onChange={(e) => setContentReview(e.target.value)}
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
                                    <Modal.Body>Bạn có chắc xóa bình luật này không"</Modal.Body>
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
                                        <FontAwesomeIcon
                                            data-toggle="tooltip"
                                            title='Sửa'
                                            className={item?.dataFeedbackReview?.id === stateUpdateFeedback ? 'ms-5' : 'ms-5 text-color-light'}
                                            style={{ cursor: 'pointer' }}
                                            icon={faPencil}
                                            onClick={() => setStateUpdateFeedback(prev => {
                                                return prev === item?.dataFeedbackReview?.id ? '' : item?.dataFeedbackReview?.id
                                            })}
                                        />
                                        <FontAwesomeIcon
                                            data-toggle="tooltip"
                                            title='Xóa'
                                            className='ms-3 text-color-light'
                                            style={{ cursor: 'pointer' }}
                                            icon={faTrash}
                                            onClick={() => handleShow(item?.dataFeedbackReview?.id, 'feedback')}
                                        />
                                        <Modal show={(show?.id === item?.dataFeedbackReview?.id && show.type === 'feedback') || false} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Xóa phản hồi</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Bạn có chắc xóa phản hồi này không"</Modal.Body>
                                            <Modal.Footer>
                                                <button className='btn btn-secondary' onClick={handleClose}>
                                                    Hủy
                                                </button>
                                                <button
                                                    className='btn btn-root fw-500'
                                                    onClick={() => handleDeleteFeedback(item?.dataFeedbackReview?.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    :
                                    <InputGroup className="mb-3 mt-1">
                                        <Form.Control
                                            placeholder="Nhập nội dung phản hồi"
                                            aria-label="Nhập nội dung phản hồi"
                                            aria-describedby="basic-addon2"
                                            onKeyDown={(e) => handOnKeyDown(e, item?.id)}
                                            value={contentReview}
                                            onChange={(e) => setContentReview(e.target.value)}
                                        />
                                        <button
                                            className='btn btn-review'
                                            // id="basic-addon2"
                                            onClick={() => handleSendReview(item?.id)}
                                        >Gửi</button>
                                    </InputGroup>
                            }
                            {
                                stateUpdateFeedback === item?.dataFeedbackReview?.id ?
                                    <InputGroup className="mb-3 mt-1">
                                        <Form.Control
                                            placeholder="Nhập nội dung phản hồi"
                                            aria-label="Nhập nội dung phản hồi"
                                            aria-describedby="basic-addon2"
                                            onKeyDown={(e) => handOnKeyDownUpdate(e, item?.dataFeedbackReview?.id)}
                                            defaultValue={item?.dataFeedbackReview?.content}
                                            onChange={(e) => setContentReview(e.target.value)}
                                        />
                                        <button
                                            className='btn btn-review'
                                            // id="basic-addon2"
                                            onClick={() => handleUpdateFeedback(item?.dataFeedbackReview?.id)}
                                        >Lưu</button>
                                    </InputGroup>
                                    : ''
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

            {/* <div className='text-center py-5'>
                <p className='text-muted'>Hiện tại sản phẩm chưa có đánh giá nào, bạn hãy trở thành người đầu tiên đánh giá cho sản phẩm này</p>
                <button className='btn btn-review' >Gửi đánh giá của bạn</button>
            </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewManage);
