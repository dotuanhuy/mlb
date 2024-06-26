import React, { memo, useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode';
import { formatVND, path } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Detail.scss'
import { toast } from 'react-toastify';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

function Detail() {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [userId, setUserId] = useState('')
    const body = useRef()
    const initialRender = useRef(true)
    const accessToken = window.localStorage.getItem('accessToken')
    const [show, setShow] = useState({})
    const navigate = useNavigate()

    const handleClose = () => setShow({});

    useEffect(() => {
        document.title = products.name
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            setUserId(tokenDecoded?.id)
        }
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
        setSize(products?.dataSizeDetail?.at(0)?.name)
    }, [products])

    const handleOnchangeRadio = e => {
        setSize(e.target.value)
    }

    const handleOnchangeQuantity = e => {
        setQuantity(+e.target.value)
    }

    const handleStepDown = e => {
        e.preventDefault()
        if (quantity === 1) {
            setQuantity(1)
        }
        else {
            setQuantity(prev => --prev)
        }
    }

    const handleStepUp = e => {
        e.preventDefault()
        setQuantity(prev => ++prev)
    }

    const handleAddCart = e => {
        e.preventDefault()
        if (accessToken) {
            dispatch(actions.addProductToCart({ userId, productId: products?.id, quantity: quantity, size }))
            toast.info(() => (
                <span className='fw-light' style={{ fontSize: 14, fontFamily: 'serif' }}>
                    Bạn vừa thêm 1 sản phẩm vào giỏ hàng. Bấm
                    <a href={path.CART} className='text-primary' > vào đây </a>
                    để tới giỏ hàng
                </span>
            ), { autoClose: 3000 })
        }
        else {
            setShow({ id: products?.id })
        }
    }

    const handlePathToLogin = () => {
        navigate(path.LOGIN)
    }

    const handleBuyNow = () => {
        const newProduct = { ...products }
        newProduct.size = size
        newProduct.quantityBuy = quantity
        navigate({
            pathname: path.CHECKOUT
        }, { state: [newProduct] })
    }

    return (
        <div ref={body} className='product-detail'>
            <h3 className='fs-4'>{products?.name}</h3>
            <div className='mb-1'>
                <span className='text-banner text-muted'>Đánh giá sản phẩm này</span>
            </div>
            <div className='banner d-flex gap-4 mb-2'>
                <div className='brand'>
                    <span className='text-banner text-muted'>Thương hiệu:
                        <span className='text-black fs-6'> {products?.dataBrands?.name}</span>
                    </span>
                </div>
                <div className='code'>
                    <span className='text-banner text-muted'>Mã:
                        <span className='text-black fs-6'> {products?.code}</span>
                    </span>
                </div>
            </div>
            <div className='price mb-2'>
                {
                    products?.dataDiscounts?.value !== 0 ? <span className='price-last fs-4 fw-bold' style={{ color: '#942319' }}>{formatVND(+products?.price - +products?.price * +products?.dataDiscounts?.value)}</span> : ''
                }
                <span
                    className={products?.dataDiscounts?.value !== 0 ? 'price-begin fs-5 ms-2 text-decoration-line-through' : 'price-begin fs-4 fw-bold'}
                    style={products?.dataDiscounts?.value !== 0 ? { color: '#949494' } : { color: '#942319' }}
                >
                    {formatVND(products?.price)}
                </span>
            </div>
            <form>
                {
                    products?.dataSizeDetail?.length === 0 ?
                        '' :
                        <div className='size'>
                            <div className='title mb-2'>
                                <span className='text-banner text-muted'>Size: </span>
                                <span style={{ color: '#942319', fontWeight: '600' }}> {size}</span>
                            </div>
                            <div className='select-size mb-2'>
                                <div className='row gy-2'>
                                    {
                                        products?.dataSizeDetail?.map((item, index) => {
                                            return (
                                                <div
                                                    className='col-3'
                                                    key={index}
                                                >
                                                    <input
                                                        type="radio"
                                                        checked={size === item.name ? true : false}
                                                        className="form-control"
                                                        id={`checkItem${item.name}`}
                                                        value={item.name}
                                                        onChange={e => handleOnchangeRadio(e)}
                                                        hidden={true}
                                                    />
                                                    <label
                                                        className={size === item.name ? 'form-check-label rounded active py-2 w-100 text-center' : 'form-check-label rounded py-2 w-100 text-center label-select'}
                                                        htmlFor={`checkItem${item.name}`}
                                                    >
                                                        {item.name}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                }
                <div className='d-flex align-items-center'>
                    <span className='text-banner text-muted'>Số lượng:</span>
                    <div className='col-md-4 ps-4 d-flex'>
                        <button
                            className="btn py-0 px-2 button-hover"
                            onClick={(e) => handleStepDown(e)}
                        >
                            <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faMinus} />
                        </button>
                        <input
                            type='number'
                            className='form-control w-100'
                            min={1}
                            max={100}
                            value={quantity}
                            onChange={e => handleOnchangeQuantity(e)}
                        />
                        <button
                            className="btn py-0 px-2 button-hover"
                            onClick={(e) => handleStepUp(e)}
                        >
                            <FontAwesomeIcon style={{ fontSize: '11px' }} icon={faPlus} />
                        </button>
                    </div>
                </div>
                <div className='d-flex mt-3 gap-3'>
                    <div className='add-cart col-md-5'>
                        <button
                            className='btn btn-add-cart text-white w-100 fw-500'
                            onClick={(e) => handleAddCart(e)}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                    <div className='add-cart col-md-5'>
                        <button
                            className='btn btn-add-buy text-white w-100 fw-500'
                            onClick={handleBuyNow}
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </form>
            <div className='mt-2 fw-500 fs-14'>
                <Link
                    className='text-color-root-dark'
                    to={path.TUTORIAL_SIZE}
                    target='_blank'
                >
                    <FontAwesomeIcon className='pe-2' icon={faFileLines} />
                    Xem hướng dẫn chọn size
                </Link>
            </div>

            <Modal show={show?.id === products?.id || false} onHide={handleClose}>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(Detail));
