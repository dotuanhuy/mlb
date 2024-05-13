import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import { BACKEND_URL, formatVND, path } from '../../utils';
import './Payment.scss'
import { Form } from 'react-bootstrap';
import { faAngleLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { validate, validateRequire } from '../../validate/valiedate';
import Paypal from '../paypal/Paypal';
import { toast } from 'react-toastify';
import { CustomToast } from '../../utils/customToast';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';

const initInfo = {
    fullName: '',
    phone: '',
    address: ''
}

const cookies = new Cookies()

function Payment({ titlePage }) {
    const dispatch = useDispatch()
    const { address } = useSelector(state => state.user)
    const { errorOrder, orderId } = useSelector(state => state.order)
    const listProducts = useLocation().state
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [codeCity, setCodeCity] = useState('')
    const [codeDistrict, setCodeDistrict] = useState('')
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [stateWard, setStateWard] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [shippingType, setShippingType] = useState({ value: 0, type: 'cod' })
    const [paymentType, setPaymentType] = useState('')
    const [info, setInfo] = useState(initInfo)
    const [note, setNote] = useState('')
    const [errors, setErrors] = useState({})
    const [errorSelect, setErrorSelect] = useState({})
    const [socket, setSocket] = useState()
    const stateCookies = cookies.get('info_order') ? cookies.get('info_order') : ''

    useEffect(() => {
        document.title = titlePage
        if (stateCookies) {
            setInfo({
                fullName: stateCookies.fullName,
                phone: stateCookies.phone,
                address: stateCookies.address
            })
            setCodeCity(stateCookies.city)
            setCodeDistrict(stateCookies.district)
            setStateWard(stateCookies.ward)
        }
        dispatch(actions.getAllAddress())
        if (!listProducts || listProducts.length === 0) {
            navigate(path.CART)
        }
        else {
            let total = 0
            listProducts.map(item => {
                total += item?.dataDiscounts?.value === 0 ? +item?.price * +item.quantityBuy : (+item?.price - +item?.price * +item?.dataDiscounts?.value) * item.quantityBuy
            })
            setTotalPrice(total)
            setProducts(listProducts)
            const newSocket = io(BACKEND_URL, { autoConnect: true }); // Địa chỉ server
            setSocket(newSocket);
            return () => newSocket.disconnect();
        }
    }, [])

    useEffect(() => {
        if (codeCity?.code) {
            const arr = address?.find(item => item.code === codeCity.code)?.districts
            setDistricts(arr)
        }
    }, [codeCity, address])

    
    useEffect(() => {
        if (codeDistrict?.code) {
            const arr = districts?.find(item => item.code === codeDistrict.code)?.wards
            setWards(arr)
        }
    }, [codeDistrict, districts])

    useEffect(() => {
        if (errorOrder) {
            if (errorOrder === 'none') {
                dispatch(actions.createNotification({
                    typeId: orderId,
                    typeText: 'order'
                }))
                cookies.set('info_order', {
                    fullName: info.fullName,
                    phone: info.phone,
                    address: info.address,
                    city: codeCity,
                    district: codeDistrict,
                    ward: stateWard
                }, { path: '/' })
                if (socket) {
                    socket.emit('send_notification', { typeText: 'order' })
                }
                navigate(path.ORDER_TRACKING)
            }
            else {
                toast.error(CustomToast(errorOrder), { autoClose: 3000 })
            }
        }
    }, [errorOrder])

    const handleOnchangeShipping = (e) => {
        setShippingType({
            type: e.target.value,
            value: e.target.value === 'fast' ? 0 : 35000
        })
    }

    const handleOnchangePayment = (e) => {
        setPaymentType(e.target.value)
    }

    const handlePay = () => {
        const err = validate(info)
        const errCity = validateRequire('Tỉnh thành', codeCity.name)
        const errDistrict = validateRequire('Quận huyện', codeDistrict.name)
        const errWard = validateRequire('Phường xã', stateWard.name)
        const errPayment = validateRequire('Phương thức thanh toán', paymentType)
        if (Object.keys(err).length > 0 || errCity || errDistrict || errWard || errPayment) {
            setErrors(err)
            setErrorSelect({
                errCity,
                errDistrict,
                errWard,
                errPayment
            })
        }
        else {
            const data = {
                fullName: info.fullName,
                phone: info.phone,
                address: info.address,
                city: codeCity.name,
                district: codeDistrict.name,
                ward: stateWard.name,
                note,
                shippingMethod: shippingType.type,
                paymentType,
                totalMoney: totalPrice + shippingType.value,
                products
            }
            dispatch(actions.createOrder(data))
        }
    }

    console.log(products)

    return (
        <div className='container-xl'>
            <div className='row'>
                <div className='col-8'>
                    <div className='w-100 d-flex justify-content-center'>
                        <div className='image-logo'></div>
                    </div>
                    <div className='row mt-4 pt-3'>
                        <div className='col-6'>
                            <p className='fw-bolder'>Thông tin giao hàng</p>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    placeholder="Họ và tên"
                                    value={info.fullName} 
                                    onChange={(e) => setInfo({
                                        ...info,
                                        fullName: e.target.value
                                    })}
                                />
                                {
                                    errors && errors.fullName ? <span className='error'>{errors.fullName}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    placeholder="Số điện thoại"
                                    value={info.phone} 
                                    onChange={(e) => setInfo({
                                        ...info,
                                        phone: e.target.value
                                    })}
                                />
                                {
                                    errors && errors.phone ? <span className='error'>{errors.phone}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    placeholder="Số nhà, ngõ, ngách,..."
                                    value={info.address} 
                                    onChange={(e) => setInfo({
                                        ...info,
                                        address: e.target.value
                                    })}
                                />
                                {
                                    errors && errors.address ? <span className='error'>{errors.address}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Select
                                    onChange={(e) => setCodeCity({
                                        code: +e.target.value,
                                        name: e.target.options[e.target.selectedIndex].text
                                    })}
                                >
                                    <option disabled selected>Tỉnh thành</option>
                                    {
                                        address && address.length > 0 &&
                                        address.map((item, index) => (
                                            <option key={index} value={item.code} selected={codeCity.code === item.code}>{item.name}</option>
                                        ))
                                    }
                                </Form.Select>
                                {
                                    errorSelect && errorSelect.errCity ? <span className='error'>{errorSelect.errCity}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Select
                                    disabled={codeCity ? false : true}
                                    onChange={(e) => setCodeDistrict({
                                        code: +e.target.value,
                                        name: e.target.options[e.target.selectedIndex].text
                                    })}
                                >
                                    <option disabled selected>Quận huyện</option>
                                    {
                                        codeCity?.code && districts?.length > 0 &&
                                        districts.map((item, index) => (
                                            <option key={index} value={item.code} selected={codeDistrict.code === item.code}>{item.name}</option>
                                        ))
                                    }
                                </Form.Select>
                                {
                                    errorSelect && errorSelect.errDistrict ? <span className='error'>{errorSelect.errDistrict}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Select
                                    disabled={codeDistrict ? false : true}
                                    onChange={(e) => setStateWard({
                                        code: +e.target.value,
                                        name: e.target.options[e.target.selectedIndex].text
                                    })}
                                >
                                    <option disabled selected>Phường xã</option>
                                    {
                                        codeDistrict?.code && wards?.length > 0 &&
                                        wards.map((item, index) => (
                                            <option key={index} value={item.code} selected={stateWard.code === item.code}>{item.name}</option>
                                        ))
                                    }
                                </Form.Select>
                                {
                                    errorSelect && errorSelect.errWard ? <span className='error'>{errorSelect.errWard}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control as='textarea'
                                    rows={3}
                                    placeholder="Ghi chú"
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-6'>
                            <p className='fw-bolder'>Vận chuyển</p>
                            <div className='border rounded py-3 px-3'>
                                <div className='d-flex gap-1 align-items-center justify-content-between'>
                                    <Form.Group>
                                        <Form.Check
                                            type="radio"
                                            label="Giao hàng tận nơi - COD tiêu chuẩn 1-2 ngày"
                                            value='cod'
                                            checked={shippingType.type === 'cod'}
                                            onChange={handleOnchangeShipping}
                                        />
                                    </Form.Group>
                                    <span className='fs-14 fw-500'>Miễn phí</span>
                                </div>
                                <hr />
                                <div className='d-flex gap-1 align-items-center justify-content-between'>
                                    <Form.Group>
                                        <Form.Check
                                            disabled={codeCity.name === 'Thành phố Hà Nội' || codeCity.name === 'Thành phố Hồ Chí Minh' ? false : true}
                                            type="radio"
                                            label="Ship nhanh trong ngày(Chỉ áp dụng cho Hà Nội và HCM)"
                                            value='express'
                                            checked={shippingType.type === 'express'}
                                            onChange={handleOnchangeShipping}
                                        />
                                    </Form.Group>
                                    <span className='fs-14 fw-500'>35.000đ</span>
                                </div>
                            </div>
                            <p className='fw-bolder mt-4'>Thanh toán</p>
                            <div className='border rounded py-3 px-3'>
                                <div className='d-flex gap-1 align-items-center justify-content-between'>
                                    <Form.Group>
                                        <Form.Check
                                            type="radio"
                                            label="Thanh toán nhanh bằng QR"
                                            value='qr'
                                            checked={paymentType === 'qr'}
                                            onChange={handleOnchangePayment}
                                        />
                                    </Form.Group>
                                    <img src='https://i.gyazo.com/566d62fd25cf0867e0033fb1b9b47927.png' height='20px' />
                                </div>
                                <hr />
                                <div className='d-flex gap-1 align-items-center justify-content-between'>
                                    <Form.Group>
                                        <Form.Check
                                            type="radio"
                                            label="Thanh toán qua Paypal"
                                            value='paypal'
                                            checked={paymentType === 'paypal'}
                                            onChange={handleOnchangePayment}
                                        />
                                    </Form.Group>
                                    <img src='https://e7.pngegg.com/pngimages/327/725/png-clipart-logo-paypal-europe-services-ltd-graphics-brand-paypal-blue-angle-thumbnail.png' height='40px' />
                                </div>
                                <hr />
                                <div className='d-flex gap-1 align-items-center justify-content-between'>
                                    <Form.Group>
                                        <Form.Check
                                            type="radio"
                                            label="Thanh toán khi nhận hàng (COD)"
                                            value='cod'
                                            checked={paymentType === 'cod'}
                                            onChange={handleOnchangePayment}
                                        />
                                    </Form.Group>
                                    <img src='https://png.pngtree.com/png-clipart/20210530/original/pngtree-cod-shopping-online-badge-png-image_6359686.jpg' height='40px' />
                                </div>
                            </div>
                            {
                                errorSelect && errorSelect.errPayment ? <span className='error'>{errorSelect.errPayment}</span> : ''
                            }
                        </div>
                    </div>
                </div>
                <div className='col-4 bg-light h-100' >
                    <p className='fw-bolder mt-4'>Đơn hàng ({products.length} sản phẩm)</p>
                    <div
                        className='list-product-payment overflow-auto position-relative'
                        style={{
                            maxHeight: 'calc(100vh - 380px)',
                        }}
                    >
                        {
                            products.map((item, index) => {
                                let priceNew = ''
                                if (item?.dataDiscounts?.value !== 0) {
                                    priceNew = +item?.price - +item?.price * +item?.dataDiscounts?.value
                                }
                                return (
                                    <div key={index} className='d-flex align-items-center justify-content-center gap-1 mb-4 px-4 pt-2'>
                                        <div className='col-2 position-relative'>
                                            <div
                                                className='position-absolute'
                                                style={{
                                                    'right': '5px',
                                                    'top': '-10px'
                                                }}
                                            >
                                                <span className='rounded-circle bg-root-light text-white fs-14' style={{ 'padding': '0 6px' }}>{item.quantityBuy}</span>
                                            </div>
                                            <div
                                                className='border rounded'
                                                style={{
                                                    width: '100%',
                                                    height: '60px',
                                                    backgroundImage: `url(${item?.image})`,
                                                    backgroundPosition: '0% 0%',
                                                    backgroundSize: 'contain',
                                                    backgroundRepeat: 'no-repeat'
                                                }}
                                            ></div>
                                        </div>
                                        <div className='col-8' style={{ 'lineHeight': 1.2 }}>
                                            <span className='fs-14 fw-500'>Túi MLB Korea Basic Denim Hobo Bag New York Yankees Indigo</span>
                                            <div>
                                                {
                                                    item?.size ? <span className='text-muted fw-500 fs-14'>size: {item?.size}</span> : ''
                                                }
                                            </div>
                                            <button
                                                className='bg-transparent button-hover'
                                                style={{ cursor: 'pointer' }}
                                                data-toggle="tooltip"
                                                title='Xóa'
                                            // onClick={() => handleShow(item?.dataCartProduct?.CartDetail?.productId)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} style={{ color: '#942319' }} />
                                            </button>
                                            {/* <Modal show={show?.id === item?.dataCartProduct?.CartDetail?.productId || false} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Delete a product</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Are you sure delete product "{item?.dataCartProduct?.name}"</Modal.Body>
                                                <Modal.Footer>
                                                    <button className='btn btn-secondary' onClick={handleClose}>
                                                        Close
                                                    </button>
                                                    <button
                                                        className='btn btn-root fw-500'
                                                        onClick={() => handleDeleteProductCart(item?.dataCartProduct?.id, item?.dataCartProduct?.CartDetail?.size, item?.dataCartProduct?.CartDetail?.cartId)}
                                                    >
                                                        Yes
                                                    </button>
                                                </Modal.Footer>
                                            </Modal> */}
                                        </div>
                                        <div className='col-2 position-relative'>

                                            {
                                                priceNew ?
                                                    <>
                                                        <div className='text-danger fw-500 fs-14'>-{+item?.dataDiscounts?.value * 100}%</div>
                                                        <div className='fs-14 fw-500'>{formatVND(priceNew)}</div>
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
                            <span>{shippingType.value === 0 ? 'Miễn phí' : formatVND(shippingType.value)}</span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <span className='fw-500'>Tổng cộng</span>
                            <span className='text-color-root-light fs-5 fw-500'>{formatVND(totalPrice + shippingType.value)}</span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center pt-3'>
                            <Link className='text-color-root-light fs-14' to={path.CART}>
                                <FontAwesomeIcon className='pe-1' icon={faAngleLeft} />Quay về giỏ hàng
                            </Link>
                            {
                                paymentType === 'paypal' ?
                                    <Paypal
                                        amount={((totalPrice + shippingType.value) / 23000).toFixed(2)}
                                        orders={{
                                            fullName: info.fullName,
                                            phone: info.phone,
                                            address: info.address,
                                            city: codeCity.name,
                                            district: codeDistrict.name,
                                            ward: stateWard,
                                            note,
                                            shippingMethod: shippingType.type,
                                            paymentType,
                                            totalMoney: totalPrice + shippingType.value,
                                            products
                                        }}
                                    />
                                    :
                                    <button
                                        className='btn btn-root-2 py-2 px-4 fw-500'
                                        onClick={handlePay}
                                    >
                                        ĐẶT HÀNG
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(Payment));
