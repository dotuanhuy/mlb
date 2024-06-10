import React, { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../common/Loading/Loading'
import Navbar from '../HomePage/Navbar/Navbar'
import Banner from '../common/Banners/Banner'
import HomeFooter from '../HomePage/HomeFooter/HomeFooter'
import * as actions from '../../store/actions'
import { formatVND, orderStatusObj, path } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';

function OrderTrucking({ titlePage }) {
    const dispatch = useDispatch()
    const { orders, isLoading } = useSelector(state => state.order)
    const [stateOrders, setStateOrders] = useState([])
    const [option, setOption] = useState('all')
    const [totalMoney, setTotalMoney] = useState(0)
    const navigate = useNavigate()
    const initialRender = useRef(true)
    const body = useRef()

    useEffect(() => {
        document.title = titlePage
        const accessToken = window.localStorage.getItem('accessToken')
        if (!accessToken) {
            navigate(path.LOGIN)
        }
        dispatch(actions.getAllOrdersByUser())
    }, [])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            if (body.current) {
                window.scrollTo({
                    behavior: "smooth",
                    top: body.current.offsetTop - 100
                });
            }
        }
    }, [body.current])

    useEffect(() => {
        if (orders && orders.length > 0) {
            setStateOrders(orders)
            setTotalMoney(orders.reduce((acc, curr) => acc + curr.totalMoney, 0))
        }
    }, [orders])

    useEffect(() => {
        if (orders && orders.length > 0) {
            if (option === 'all') {
                setStateOrders(orders)
                setTotalMoney(orders?.reduce((acc, curr) => acc + curr.totalMoney, 0))
            }
            else if (option === 'cancelled') {
                let total = 0
                setStateOrders(orders.filter(item => {
                    if (item?.isCancelled) {
                        total += item?.totalMoney
                        return item
                    }
                }))
                setTotalMoney(total)
            }
            else {
                let total = 0
                setStateOrders(orders.filter(item => {
                    if (item?.orderStatus === option) {
                        total += item?.totalMoney
                        return item
                    }
                }))
                setTotalMoney(total)
            }
        }
    }, [option])

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <div className=''>
                        <Navbar />
                        <div>
                            <Banner categoryProduct={'Theo dõi đơn hàng'} title={'Theo dõi đơn hàng của bạn'} />
                        </div>
                        <div className='container py-4' ref={body}>
                            <div className='mb-4 py-2 border rounded shadow-sm'>
                                <ul className='d-flex m-0 p-0 justify-content-evenly'>
                                    <li
                                        className={option === 'all' ? 'py-2 px-4 cursor-pointer item-focus' : 'py-2 px-4 cursor-pointer item-hover'}
                                        onClick={() => setOption('all')}
                                    >Tất cả</li>
                                    <li className={option === 'wait confirmation' ? 'py-2 px-4 cursor-pointer item-focus' : 'py-2 px-4 cursor-pointer item-hover'}
                                        onClick={() => setOption('wait confirmation')}
                                    >Chờ xác nhận</li>
                                    <li className={option === 'shipping' ? 'py-2 px-4 cursor-pointer item-focus' : 'py-2 px-4 cursor-pointer item-hover'}
                                        onClick={() => setOption('shipping')}
                                    >Đang giao</li>
                                    <li className={option === 'finished' ? 'py-2 px-4 cursor-pointer item-focus' : 'py-2 px-4 cursor-pointer item-hover'}
                                        onClick={() => setOption('finished')}
                                    >Đã giao</li>
                                    <li className={option === 'cancelled' ? 'py-2 px-4 cursor-pointer item-focus' : 'py-2 px-4 cursor-pointer item-hover'}
                                        onClick={() => setOption('cancelled')}
                                    >Đã hủy</li>
                                </ul>
                            </div>
                            <div className=''>
                                {
                                    stateOrders && stateOrders.length > 0 ?
                                        stateOrders.map(item => {
                                            return (
                                                <div className='border rounded mb-3'>
                                                    <Link
                                                        className='d-flex align-items-center justify-content-end pe-2 pt-1 gap-1 fs-14 fw-500 text-color-root-dark'
                                                        to={`${path.ORDER_TRACKING_DETAIL}?id=${item?.id}`}
                                                    >
                                                        Chi tiết<FontAwesomeIcon icon={faArrowRight} />
                                                    </Link>
                                                    {
                                                        item?.dataOrderProduct?.map((product, index) => (
                                                            <div className='row align-items-center pb-2 pt-1' key={index}>
                                                                <div
                                                                    className='col-1 pe-0 position-relative'

                                                                >
                                                                    <img src={product.image} className='w-100 ' style={{ objectFit: 'contain' }} height='100px' />
                                                                    {
                                                                        product.dataDiscounts?.value !== 0 ?
                                                                            <span
                                                                                className='text-danger fw-500 fs-14 position-absolute'
                                                                                style={{
                                                                                    top: '-2px',
                                                                                    right: '-8px'
                                                                                }}
                                                                            >
                                                                                -{+product.dataDiscounts?.value * 100}%
                                                                            </span>
                                                                            : ''
                                                                    }
                                                                </div>
                                                                <div
                                                                    className='col-5 fw-500'
                                                                >
                                                                    <span>{product.name}</span>
                                                                    <div>
                                                                        {
                                                                            product.OrderDetail?.size ?
                                                                                <span className='text-muted fs-12'>Size: <span className='text-black fs-14'>{product.OrderDetail?.size}</span></span>
                                                                                : ''
                                                                        }
                                                                    </div>
                                                                    <span className='text-muted fs-12'>Số lượng: <span className='text-black fs-14'>{product.OrderDetail?.quantity}</span></span>
                                                                </div>
                                                                <div className='col-2 text-danger'>
                                                                    {
                                                                        product.dataDiscounts?.value !== 0 ?
                                                                            <>
                                                                                <span className='fs-14 fw-500 pe-3'>{formatVND(+product.price - +product.price * +product.dataDiscounts?.value)}</span>
                                                                                <span className='fs-14 fw-500 text-muted text-decoration-line-through'>{formatVND(item?.dataOrderProduct.price)}</span>
                                                                            </>
                                                                            :
                                                                            <div className='fs-14 fw-500'>{formatVND(product.price)}</div>
                                                                    }
                                                                </div>
                                                                <div className='col-2 fs-14 fw-500 text-muted float-end'>
                                                                    Thành tiền: <span className='text-danger'>{formatVND(item?.totalMoney)}</span>
                                                                </div>
                                                                <div className='col-2 fs-14 fw-500'>
                                                                    {
                                                                        item?.isCancelled ? 'Đã hủy'
                                                                            :
                                                                            orderStatusObj[item?.orderStatus]
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))

                                                    }
                                                </div>
                                            )
                                        })
                                        : <div className='text-danger text-center'>Bạn chưa có đơn hàng nào</div>
                                }
                            </div>
                            {
                                stateOrders && stateOrders.length > 0 ?
                                    <div className='fs-5 fw-500 mt-5 d-flex justify-content-end gap-2'>
                                        Tổng tiền: <span className='text-danger'>{formatVND(totalMoney)}</span>
                                    </div>
                                    : ''
                            }
                        </div>
                        <HomeFooter />
                    </div>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(OrderTrucking));
