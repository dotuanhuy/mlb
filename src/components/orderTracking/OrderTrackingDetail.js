import React, { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircle, faClock, faIdCard, faLocationDot, faMinus, faMoneyBill, faPlus, faTrash, faTruck } from '@fortawesome/free-solid-svg-icons';
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
    const [params] = useSearchParams()
    const [totalMoney, setTotalMoney] = useState(0)
    const initialRender  = useRef(true)
    const body = useRef()

    useEffect(() => {
        document.title = titlePage
        dispatch(actions.getOrderById(+params.get('id')))
    }, [])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            if (body.current) {
                window.scrollTo({
                    behavior: "smooth",
                    top: body.current.offsetTop - 70
                });
            }
        }
    }, [body.current])

    useEffect(() => {
        if (orders) {
            const begin = orders?.dataOrderProduct?.reduce((acc, curr) => acc + (curr?.price - curr?.price*curr?.dataDiscounts?.value), 0)
            setTotalMoney(begin)
        }
    }, [orders])

    return (
        <>
            {
                !orders ?
                <Loading />
                :
                <>
                    <Navbar />
                    <div>
                        <Banner categoryProduct={'Chi tiết đơn hàng'} title={'Chi tiết đơn hàng của bạn'} />
                    </div>
                    <div className='container py-4' ref={body}>
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
                                    <div className='custom-scroll overflow-auto p-3 mb-3' style={{ maxHeight: '200px' }}>
                                        {
                                            orders?.dataOrderProduct && orders?.dataOrderProduct?.length > 0 &&
                                            orders?.dataOrderProduct?.map((item, index) => (
                                                <div className='mb-2' key={index}>
                                                    <div className='row'>
                                                        <Link
                                                            className='col-3 px-0 position-relative'
                                                            to={`${path.PRODUCT}/${item?.name}`}
                                                            state={{
                                                                productId: item?.id,
                                                                productName: item?.name,
                                                            }}
                                                        >
                                                            <img src={item?.image} className='w-100 ' style={{ objectFit: 'contain' }} height='100px' />
                                                            {
                                                                item?.dataDiscounts?.value !== 0 ?
                                                                    <span
                                                                        className='text-danger fw-500 fs-14 position-absolute'
                                                                        style={{
                                                                            top: '-12px',
                                                                            right: '-12px'
                                                                        }}
                                                                    >
                                                                        -{+item?.dataDiscounts?.value * 100}%
                                                                    </span>
                                                                    : ''
                                                            }
                                                        </Link>
                                                        <div className='col-9 fw-500'>
                                                            <Link
                                                                to={`${path.PRODUCT}/${item?.name}`}
                                                                state={{
                                                                    productId: item?.id,
                                                                    productName: item?.name,
                                                                }}
                                                            >{item?.name}</Link>
                                                            <div>
                                                                {
                                                                    item?.OrderDetail?.size ?
                                                                        <span className='text-muted fs-12'>Size: <span className='text-black fs-14'>{item?.OrderDetail?.size}</span></span>
                                                                        : ''
                                                                }
                                                            </div>
                                                            <div className='d-flex justify-content-between'>
                                                                <span className='text-muted fs-12'>Số lượng: <span className='text-black fs-14'>{item?.OrderDetail?.quantity}</span></span>
                                                                <div className='text-danger'>
                                                                    {
                                                                        item?.dataDiscounts?.value !== 0 ?
                                                                            <>
                                                                                <span className='fs-14 fw-500 pe-3'>{formatVND(+item?.price - +item?.price * +item?.dataDiscounts?.value)}</span>
                                                                                <span className='fs-14 fw-500 text-muted text-decoration-line-through'>{formatVND(item?.price)}</span>
                                                                            </>
                                                                            :
                                                                            <div className='fs-14 fw-500'>{formatVND(item?.price)}</div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='fs-14 fw-500'>
                                        <div className='d-flex justify-content-between mb-2'>
                                            <span className=''>Tổng tiền hàng</span>
                                            <span className='fs-14 fw-500'>{formatVND(totalMoney)}</span>
                                        </div>
                                        <div className='d-flex justify-content-between mb-2'>
                                            <span className=''>Phí vận chuyển</span>
                                            <span className=''>{orders.shippingMethod === 'cod' ? formatVND(0) : formatVND(35000)}</span>
                                        </div>
                                        <div className='d-flex justify-content-between fs-6'>
                                            <span className=''>Thành tiền</span>
                                            <span className='text-danger'>{formatVND(orders?.totalMoney)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='d-flex align-items-center mb-1'>
                                        <FontAwesomeIcon icon={faClock} className='text-color-root-light fs-14' />
                                        <span className='ps-2 fw-500 fs-16'>Thời gian</span>
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
                                <Link
                                    className='d-flex align-items-center gap-1 fs-14 fw-500 text-color-root-dark pt-2'
                                    to={path.ORDER_TRACKING}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    Quay lại
                                </Link>
                            </div>
                        </div>
                    </div>
                    <HomeFooter />
                </>
            }
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
