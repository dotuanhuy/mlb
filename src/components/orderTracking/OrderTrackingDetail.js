import React, { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faClock, faIdCard, faLocationDot, faMinus, faMoneyBill, faPlus, faTrash, faTruck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../common/Loading/Loading'
import Navbar from '../HomePage/Navbar/Navbar'
import Banner from '../common/Banners/Banner'
import HomeFooter from '../HomePage/HomeFooter/HomeFooter'
import * as actions from '../../store/actions'
import { formatDateTimeVN, formatVND, orderStatusObj, path, paymentMethod, shippingMethod } from '../../utils';
import { Link, useSearchParams } from 'react-router-dom';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

function OrderTrackingDetail({ titlePage }) {
    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.order)
    const [totalMoney, setTotalMoney] = useState(0)
    const [params] = useSearchParams()

    useEffect(() => {
        document.title = titlePage
        dispatch(actions.getOrderById(+params.get('id')))
    }, [])


    console.log('check: ', orders)

    return (
        <>
            {/* {
                isLoading ?
                <Loading />
                : */}
            <>
                <Navbar />
                <div>
                    <Banner categoryProduct={'Chi tiết đơn hàng'} title={'Chi tiết đơn hàng của bạn'} />
                </div>
                <div className='container py-4'>
                    <div className='border rounded p-4 row'>
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
                            <div className='d-flex'>
                                <div>
                                    <FontAwesomeIcon icon={faMoneyBill} className='text-color-root-light fs-14' />
                                </div>
                                <div className='ps-2'>
                                    <span className='fw-500 fs-16'>Phương thức thanh toán</span><br />
                                    <span className='fs-14 text-muted fw-500'>{paymentMethod[orders?.dataPayment?.paymentMethod]}</span><br />
                                </div>
                            </div>
                        </div>
                        <div className='col-7'>
                            <div className='mb-3'>

                                <div className='d-flex mb-3'>
                                    <div>
                                        <FontAwesomeIcon icon={faProductHunt} className='text-color-root-light' />
                                    </div>
                                    <div className='ps-2'>
                                        <span className='fw-500 fs-16'>Thông tin sản phẩm</span><br />
                                    </div>
                                </div>
                                {
                                    orders ?
                                        <div className='mb-2'>
                                            <div className='row'>
                                                <Link
                                                    className='col-3 px-0 position-relative'
                                                    to={`${path.PRODUCT}/${orders?.dataOrderProduct?.at(0)?.name}`}
                                                    state={{
                                                        productId: orders?.dataOrderProduct?.at(0)?.id,
                                                        productName: orders?.dataOrderProduct?.at(0)?.name,
                                                    }}
                                                >
                                                    <img src={orders?.dataOrderProduct?.at(0)?.image} className='w-100 ' style={{ objectFit: 'contain' }} height='100px' />
                                                    {
                                                        orders?.dataOrderProduct?.at(0)?.dataDiscounts?.value !== 0 ?
                                                            <span
                                                                className='text-danger fw-500 fs-14 position-absolute'
                                                                style={{
                                                                    top: '-2px'
                                                                }}
                                                            >
                                                                -{+orders?.dataOrderProduct?.at(0)?.dataDiscounts?.value * 100}%
                                                            </span>
                                                            : ''
                                                    }
                                                </Link>
                                                <div className='col-9 fw-500'>
                                                    <Link
                                                        to={`${path.PRODUCT}/${orders?.dataOrderProduct?.at(0)?.name}`}
                                                        state={{
                                                            productId: orders?.dataOrderProduct?.at(0)?.id,
                                                            productName: orders?.dataOrderProduct?.at(0)?.name,
                                                        }}
                                                    >{orders?.dataOrderProduct?.at(0)?.name}</Link>
                                                    <div>
                                                        {
                                                            orders?.dataOrderProduct?.at(0)?.OrderDetail?.size ?
                                                                <span className='text-muted fs-12'>Size: <span className='text-black fs-14'>{orders?.dataOrderProduct?.at(0)?.OrderDetail?.size}</span></span>
                                                                : ''
                                                        }
                                                    </div>
                                                    <div className='d-flex justify-content-between'>
                                                        <span className='text-muted fs-12'>Số lượng: <span className='text-black fs-14'>{orders?.dataOrderProduct?.at(0)?.OrderDetail?.quantity}</span></span>
                                                        <div className='text-danger'>
                                                            {
                                                                orders?.dataOrderProduct?.at(0)?.dataDiscounts?.value !== 0 ?
                                                                    <>
                                                                        <span className='fs-14 fw-500 pe-3'>{formatVND(+orders?.dataOrderProduct?.at(0)?.price - +orders?.dataOrderProduct?.at(0)?.price * +orders?.dataOrderProduct?.at(0)?.dataDiscounts?.value)}</span>
                                                                        <span className='fs-14 fw-500 text-muted text-decoration-line-through'>{formatVND(orders?.dataOrderProduct?.at(0)?.price)}</span>
                                                                    </>
                                                                    :
                                                                    <div className='fs-14 fw-500'>{formatVND(orders?.dataOrderProduct?.at(0)?.price)}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='fs-14 fw-500'>
                                                <div className='d-flex justify-content-between mb-2'>
                                                    <span className=''>Tổng tiền hàng</span>
                                                    {
                                                        orders?.dataOrderProduct?.at(0)?.dataDiscounts?.value !== 0 ?
                                                            <>
                                                                <span className='fs-14 fw-500 pe-3'>{formatVND(+orders?.dataOrderProduct?.at(0)?.price - +orders?.dataOrderProduct?.at(0)?.price * +orders?.dataOrderProduct?.at(0)?.dataDiscounts?.value)}</span>
                                                            </>
                                                            :
                                                            <span className='fs-14 fw-500'>{formatVND(orders?.dataOrderProduct?.at(0)?.price)}</span>
                                                    }
                                                </div>
                                                <div className='d-flex justify-content-between mb-2'>
                                                    <span className='text-muted'>Phí vận chuyển</span>
                                                    <span className=''>{orders.shippingMethod === 'cod' ? formatVND(0) : formatVND(35000)}</span>
                                                </div>
                                                <div className='d-flex justify-content-between fs-6'>
                                                    <span className=''>Thành tiền</span>
                                                    <span className='text-danger'>{formatVND(orders?.totalMoney)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        : <div className='text-danger'>Bạn chưa có đơn hàng nào</div>
                                }
                            </div>
                            <div >
                                <div className='d-flex align-items-center mb-1'>
                                    <FontAwesomeIcon icon={faClock} className='text-color-root-light fs-14' />
                                    <span className='ps-2 fw-500 fs-16'>Thời gian đặt hàng</span>
                                </div>
                                <div className='ps-4'>
                                    <div className='d-flex justify-content-between mb-2 fs-14 fw-500'>
                                        <span className='text-muted'>Thời gian đặt hàng</span>
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
                        {
                            // orders ?
                            //     <div className='fs-5 fw-500 mt-5 d-flex justify-content-end gap-2'>
                            //         Tổng tiền: <span className='text-danger'>{formatVND(totalMoney)}</span>
                            //     </div>
                            //     : ''
                        }
                    </div>
                </div>
                <HomeFooter />
            </>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(OrderTrackingDetail));
