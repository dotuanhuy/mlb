import React, { useContext, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useSearchParams } from 'react-router-dom';
import { SHIPPING_FEE, formatDateTimeVN, formatVND, orderStatus, path } from '../../../utils';
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions'
import { toast } from 'react-toastify';
import { CustomToast } from '../../../utils/customToast';
import './OrderManageDetail.scss'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

function OrderManageDetail() {
    const dispatch = useDispatch()
    const { orders, errorOrder } = useSelector(state => state.order)
    const [params] = useSearchParams()
    const [totalPrice, setTotalPrice] = useState(0)
    const [show, setShow] = useState('')

    useEffect(() => {
        dispatch(actions.getOrderById(+params.get('id')))
    }, [])

    useEffect(() => {
        if (orders) {
            let total = 0
            orders?.dataOrderProduct?.map(item => {
                total += item?.dataDiscounts?.value === 0 ? +item?.price*+item.OrderDetail.quantity : (+item?.price - +item?.price*+item?.dataDiscounts?.value)*item.OrderDetail.quantity
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
                            <h2>Order detail</h2>
                        </div>
                    </div>
                    <hr />
                    <div className='row fs-14'
                    >
                        <div className='col-2 '>
                            <div className='fs-16 fw-bolder mb-3'>Information orderer</div>
                            <div className='border rounded p-2'>
                                <div className='mb-1'>
                                    Id Orderer: {orders.userId}
                                </div>
                                <div className='mb-1'>
                                    {orders.fullName}
                                </div>
                                <div className='mb-1'>
                                    {orders.phone}
                                </div>
                                <div className='mb-1'>
                                    {orders.address}
                                </div>
                                <div className='mb-1'>
                                    Date: {formatDateTimeVN(orders.createdAt)}
                                </div>
                            </div>
                        </div>
                        <div className='col-3'>
                            <div>
                                <div className='fw-bolder fs-16 mb-3'>Shipping</div>
                                <div className='border rounded p-2'>
                                    {orders.shippingMethod === 'cod' ?
                                        'Delivery to your door - standard COD 1-2 days - free'
                                        :
                                        `Fast same-day shipping (Only applicable to Hanoi and HCM) - ${formatVND(SHIPPING_FEE)}`
                                    }
                                </div>
                            </div>
                            <div className='mt-3'>
                                <div className='fw-bolder fs-16 mb-3'>Payment</div>
                                <div className='border rounded p-2'>
                                    <div>
                                        Status: {orders.dataPayment?.isPaid ? 'Paid' : 'Unpaid'}
                                    </div>
                                    <div>
                                        Method: {orders.dataPayment?.paymentMethod}
                                    </div>
                                    {
                                        orders.dataPayment?.isPaid ?
                                            <div>
                                                Date: {formatDateTimeVN(orders.dataPayment?.createdAt)}
                                            </div>
                                            : ''
                                    }
                                </div>
                            </div>

                        </div>
                        <div className='col-7 bg-white'>
                            <div className='fw-bolder fs-16 mb-3'>Order ({orders?.dataOrderProduct?.length} products)</div>
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
                                                    <span className='text-muted fs-12'>Quantity: <span className='text-black fs-14'>{item?.OrderDetail?.quantity}</span></span>
                                                </div>
                                                <div className='col-3'>
                                                    {
                                                        item?.dataDiscounts?.value !== 0 ?
                                                            <>
                                                                <div className='text-danger fw-500 fs-14'>-{+item?.dataDiscounts?.value * 100}%</div>
                                                                <div className='fs-14 fw-500'>{formatVND(+item?.price - +item?.price * +item?.dataDiscounts?.value)}</div>
                                                                <div className='fs-14 fw-500 text-muted text-decoration-line-through'>{formatVND(item.price)}</div>
                                                            </>
                                                            :
                                                            <div className='fs-14 fw-500'>{formatVND(item.price)}</div>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='mt-4 pt-4'>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='fw-500'>Tạm tính</span>
                                    <span>{formatVND(totalPrice)}</span>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='fw-500'>Phí vận chuyển</span>
                                    <span>{orders.shippingMethod === 'cod' ? 'Miễn phí' : formatVND(SHIPPING_FEE)}</span>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='fw-500'>Tổng cộng</span>
                                    <span className='text-color-root-light fs-5 fw-500'>{formatVND(orders.shippingMethod === 'cod' ? totalPrice : totalPrice + SHIPPING_FEE)}</span>
                                </div>
                                <div className='d-flex justify-content-between align-items-center pt-3'>
                                    <Link className='text-color-root-light fs-14' to={`${path.MANAGE_ORDER}?page=${params.get('page')}`}>
                                        <FontAwesomeIcon className='pe-1' icon={faAngleLeft} />Quay về
                                    </Link>
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
                                            Confirmation
                                        </button>
                                        :
                                        <button 
                                            className='btn btn-root-2 fw-500'
                                            onClick={() => setShow('cancel')}
                                        >
                                            Cancel order
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><span className='fw-500'>Are you sure to {show} the order ?</span></Modal.Body>
                        <Modal.Footer>
                            <button 
                                className='btn btn-secondary' 
                                onClick={handleClose}
                            >
                                Close
                            </button>
                            <button 
                                className='btn btn-root fw-500' 
                                onClick={() => handleChangeOrder(orders?.id, show)}
                            >
                                Yes
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
