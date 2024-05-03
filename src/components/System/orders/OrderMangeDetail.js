import React, { useContext, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { SHIPPING_FEE, formatDateTimeVN, formatVND, orderStatus, orderStatusObj, path, paymentMethod, shippingMethod } from '../../../utils';
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions'
import { toast } from 'react-toastify';
import { CustomToast } from '../../../utils/customToast';
import './OrderManageDetail.scss'
import { faAngleLeft, faCircle, faClock, faIdCard, faLocationDot, faMoneyBill, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

function OrderManageDetail() {
    const dispatch = useDispatch()
    const { orders, errorOrder } = useSelector(state => state.order)
    const [params] = useSearchParams()
    const [totalPrice, setTotalPrice] = useState(0)
    const [show, setShow] = useState('')
    const location = useLocation()
    const { notificationId } = location.state || ''

    useEffect(() => {
        document.title = 'Chi tiết đơn hàng'
        dispatch(actions.getOrderById(+params.get('id')))
        if (notificationId) {
            dispatch(actions.updateIsRead(notificationId))
        }
    }, [params.get('id')])

    useEffect(() => {
        if (orders) {
            let total = 0
            orders?.dataOrderProduct?.map(item => {
                total += item?.dataDiscounts?.value === 0 ? +item?.price * +item.OrderDetail.quantity : (+item?.price - +item?.price * +item?.dataDiscounts?.value) * item.OrderDetail.quantity
            })
            setTotalPrice(total)
        }
    }, [orders])

    useEffect(() => {
        if (errorOrder) {
            toast.error(CustomToast(errorOrder), { autoClose: 3000 })
        }
    }, [errorOrder])

    const handleClose = () => setShow('');

    const handleChangeOrder = (id, type) => {
        if (type === 'confirm') {
            dispatch(actions.confirmOrder(id))
        }
        else {
            dispatch(actions.cancelOrder(id))
        }
        handleClose()
    }

    return (
        <div>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active='order' />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h2>Chi tiết đơn hàng</h2>
                        </div>
                    </div>
                    <hr />
                    <div className='row fs-14'>
                        <div className='col-5'>
                            <div className='d-flex mb-3'>
                                <div className=''>
                                    <FontAwesomeIcon className='text-color-root-light fs-14' icon={faIdCard} />
                                </div>
                                <div className='ps-3'>
                                    <span className='fw-500 fs-16'>ID đơn hàng</span><br />
                                    <span className='fs-14 text-muted fw-500'>{orders?.id}</span>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <div>
                                    <FontAwesomeIcon icon={faLocationDot} className='text-color-root-light' />
                                </div>
                                <div className='ps-3'>
                                    <span className='fw-500 fs-16'>Địa chỉ nhận hàng</span><br />
                                    <span className='fs-14 text-muted fw-500'>{orders?.fullName}, {orders?.phone}</span><br />
                                    <span className='fs-14 text-muted fw-500'>{orders?.address}</span>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <div>
                                    <FontAwesomeIcon icon={faTruck} className='text-color-root-light fs-14' />
                                </div>
                                <div className='ps-2'>
                                    <span className='fw-500 fs-16'>Thông tin vận chuyển</span><br />
                                    <span className='fs-14 text-muted fw-500'>{shippingMethod[orders?.shippingMethod]}</span><br />
                                    <span className='fs-14 text-muted fw-500'>
                                        <FontAwesomeIcon icon={faCircle} className='text-color-root-dark fs-12 pe-2' />{orderStatusObj[orders?.orderStatus]}
                                    </span>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <div>
                                    <FontAwesomeIcon icon={faMoneyBill} className='text-color-root-light fs-14' />
                                </div>
                                <div className='ps-2'>
                                    <span className='fw-500 fs-16'>Phương thức thanh toán</span><br />
                                    <span className='fs-14 text-muted fw-500'>{paymentMethod[orders?.dataPayment?.paymentMethod]}</span><br />
                                    <span className='fs-14 text-muted fw-500'>
                                        <FontAwesomeIcon icon={faCircle} className='text-color-root-dark fs-12 pe-2' />
                                        {
                                            !orders?.dataPayment?.isPaid ? 'Chưa thanh toán' : 'Đã thanh toán'
                                        }
                                    </span>
                                </div>
                            </div>
                            <div >
                                <div className='d-flex align-items-center mb-1'>
                                    <FontAwesomeIcon icon={faClock} className='text-color-root-light fs-14' />
                                    <span className='ps-2 fw-500 fs-16'>Thời gian</span>
                                </div>
                                <div className='ps-4'>
                                    <div className='mb-2 fs-14 fw-500'>
                                        <span className='text-muted'>Thời gian đặt hàng: </span>
                                        <span className=''>{formatDateTimeVN(orders?.createdAt)}</span>
                                    </div>
                                    {
                                        orders?.orderStatus === 'finished' ? 
                                        <>
                                            <div className='d-flex justify-content-between mb-2 fs-14 fw-500'>
                                                <span className='text-muted'>Thời thanh toán</span>
                                                <span className=''>{formatDateTimeVN(orders?.dataPayment?.updatedAt)}</span>
                                            </div>
                                        </>
                                        : ''
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-7 bg-white'>
                            <div className='d-flex mb-3 align-items-center'>
                                <div>
                                    <FontAwesomeIcon icon={faProductHunt} className='text-color-root-light' />
                                </div>
                                <div className='ps-2'>
                                    <span className='fw-500 fs-16'>Đơn hàng ({orders?.dataOrderProduct?.length} sản phẩm)</span><br />
                                </div>
                            </div>
                            <div
                                className='overflow-auto list-order'
                                style={{
                                    maxHeight: 'calc(100vh - 160px)',
                                }}
                            >
                                {
                                    orders?.dataOrderProduct && orders?.dataOrderProduct?.length > 0 &&
                                    orders?.dataOrderProduct?.map((item, index) => {
                                        return (
                                            <div className='d-flex align-items-center justify-content-center gap-2' key={index}>
                                                <div className='col-2'>
                                                    <div
                                                        className='border rounded'
                                                        style={{
                                                            width: '100%',
                                                            height: '100px',
                                                            backgroundImage: `url(${item?.image})`,
                                                            backgroundPosition: '0% 0%',
                                                            backgroundSize: 'contain',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className='col-6 fw-500'>
                                                    <span>{item.name}</span>
                                                    <div>
                                                        {
                                                            item?.OrderDetail?.size ?
                                                                <span className='text-muted fs-12'>Size: <span className='text-black fs-14'>{item?.OrderDetail?.size}</span></span>
                                                                : ''
                                                        }
                                                    </div>
                                                    <span className='text-muted fs-12'>Số lượng: <span className='text-black fs-14'>{item?.OrderDetail?.quantity}</span></span>
                                                </div>
                                                <div className='col-3'>
                                                    {
                                                        item?.dataDiscounts?.value !== 0 ?
                                                            <>
                                                                <div className='text-danger fw-500 fs-14'>-{+item?.dataDiscounts?.value * 100}%</div>
                                                                <div className='fs-14 fw-500 text-danger'>{formatVND(+item?.price - +item?.price * +item?.dataDiscounts?.value)}</div>
                                                                <div className='fs-14 fw-500 text-muted text-decoration-line-through'>{formatVND(item.price)}</div>
                                                            </>
                                                            :
                                                            <div className='fs-14 fw-500 text-danger'>{formatVND(item.price)}</div>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='mt-4 pt-4'>
                                <div className='d-flex justify-content-between align-items-center mb-2 fw-500'>
                                    <span>Tổng tiền hàng</span>
                                    <span>{formatVND(totalPrice)}</span>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-2 fw-500'>
                                    <span>Phí vận chuyển</span>
                                    <span>{orders.shippingMethod === 'cod' ? formatVND(0) : formatVND(SHIPPING_FEE)}</span>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='fw-500'>Tổng cộng</span>
                                    <span className='text-danger fs-5 fw-500'>{formatVND(orders.shippingMethod === 'cod' ? totalPrice : totalPrice + SHIPPING_FEE)}</span>
                                </div>
                                <div className='d-flex justify-content-between align-items-center pt-3'>
                                    {/* <Link className='text-color-root-light fs-14' to={`${path.MANAGE_ORDER}?page=${params.get('page')}`}>
                                        <FontAwesomeIcon className='pe-1' icon={faAngleLeft} />Quay về
                                    </Link> */}
                                    {
                                        orders.isCancelled ?
                                            <button
                                                className='btn btn-root-2 fw-500 text-white'
                                                disabled
                                            >
                                                Confirmed
                                            </button>
                                            :
                                            orders?.orderStatus === orderStatus.WAIT_CONFIRMATION ?
                                                <button
                                                    className='btn btn-root-2 fw-500'
                                                    onClick={() => setShow('confirm')}
                                                >
                                                    Xác nhận đơn hàng
                                                </button>
                                                :
                                                orders?.orderStatus === orderStatus.SHIPPING || orders?.orderStatus === orderStatus.FINISHED ?
                                                    '' :
                                                    <button
                                                        className='btn btn-root-2 fw-500'
                                                        onClick={() => setShow('cancel')}
                                                    >
                                                        Hủy đơn hàng
                                                    </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thông báo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><span className='fw-500'>Bạn có chắc {show === 'cancel' ? 'hủy bỏ' : 'xác nhận'} đơn hàng này?</span></Modal.Body>
                        <Modal.Footer>
                            <button
                                className='btn btn-secondary'
                                onClick={handleClose}
                            >
                                Đóng
                            </button>
                            <button
                                className='btn btn-root fw-500'
                                onClick={() => handleChangeOrder(orders?.id, show)}
                            >
                                Xác nhận
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderManageDetail);
