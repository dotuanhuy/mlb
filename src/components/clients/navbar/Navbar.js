import React, { useEffect, useState, memo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { categorieType, path } from '../../../utils';
import jwt_decode from "jwt-decode";
import SearchProducts from '../searchProduct/SearchProducts'
import ListCarts from '../listCart/ListCarts';

const initState = {
    firstName: '',
    lastName: '',
}

function Navbar() {
    const dispatch = useDispatch()
    const { isLogin } = useSelector(state => state.auth)
    const { productTypes } = useSelector(state => state.productType)
    const countFavourite = useSelector(state => state.favouriteProduct.countProducts)
    const countProductsCart = useSelector(state => state.cart.countProducts)
    const { message } = useSelector(state => state.user)
    const { imageLogoWeb } = useSelector(state => state.firebase)
    const [userLogin, setUserLogin] = useState(initState)
    const [userId, setUserId] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = window.localStorage.getItem('accessToken')
        if (token) {
            let tokenDecoded = jwt_decode(token)
            setUserLogin({
                firstName: tokenDecoded.firstName,
                lastName: tokenDecoded.lastName,
            })
            setUserId(tokenDecoded.id)
        }
        else {
            setUserId('')
        }
        dispatch(actions.getImageLogoWeb())
        dispatch(actions.getAllProductTypes())
    }, [])

    useEffect(() => {
        if (message) {
            const token = window.localStorage.getItem('accessToken')
            if (token) {
                let tokenDecoded = jwt_decode(token)
                setUserLogin({
                    firstName: tokenDecoded.firstName,
                    lastName: tokenDecoded.lastName,
                })
            }
        }
    }, [message])

    useEffect(() => {
        if (userId) {
            dispatch(actions.getAllProductsFavourite())
        }
    }, [userId])

    const handleLogout = () => {
        dispatch(actions.logout())
        navigate(path.HOMEPAGE)
    }

    return (
        <div className='header-top text-light sticky-top'>
            <div className='nav-container'>
                <div className='header-top-nav d-flex justify-content-evenly align-items-center my-0 mx-100'>
                    <Link to={path.HOMEPAGE}>
                        <div
                            style={{
                                width: '150px',
                                height: '55px',
                                backgroundImage: `url(${imageLogoWeb})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                marginTop: '20px'
                            }}
                        >
                        </div>
                    </Link>
                    <div className='nav-menu col-6'>
                        <ul className='menu-list w-100 d-flex justify-content-evenly align-items-center text-uppercase position-relative m-0'>
                            <li className='menu-list_item'>
                                <Link to={path.GIAY_MLB} className='menu-list_item-name text-white pe-2'>Giày-dép</Link>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item bg-white w-100 position-absolute rounded'>
                                    <ul>
                                        {
                                            productTypes && productTypes.length > 0 &&
                                            productTypes.map((item, index) => {
                                                if (item.dataProductTypeCategory.type === categorieType.SHOES_SANDAL) {
                                                    return (
                                                        <li key={index}>
                                                            <Link to={path[item.name.replace(' ', '_').toUpperCase()]} state={{ id: item.id }}>
                                                                <div
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '130px',
                                                                        backgroundImage: `url(${item?.imageRoot})`,
                                                                        backgroundPosition: 'center',
                                                                        backgroundSize: 'contain',
                                                                        backgroundRepeat: 'no-repeat'
                                                                    }}
                                                                ></div>
                                                            </Link>
                                                            <Link to={path[item.name.replace(' ', '_').toUpperCase()]} state={{ id: item.id }} className='name-shoes'>{item.name}</Link>
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                            <li className='menu-list_item' >
                                <Link to={path.TUI_MLB} className='menu-list_item-name text-white pe-2'>Túi-BaLo</Link>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item bg-white w-100 position-absolute rounded'>
                                    <ul>
                                        {
                                            productTypes && productTypes.length > 0 &&
                                            productTypes.map((item, index) => {
                                                if (item.dataProductTypeCategory.type === categorieType.BAG_BALO) {
                                                    return (
                                                        <li key={index}>
                                                            <Link to={path[item.name.replace(' ', '_').toUpperCase()]} state={{ id: item.id }}>
                                                                <div
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '130px',
                                                                        backgroundImage: `url(${item.imageRoot})`,
                                                                        backgroundPosition: 'center',
                                                                        backgroundSize: 'contain',
                                                                        backgroundRepeat: 'no-repeat'
                                                                    }}
                                                                ></div>
                                                            </Link>
                                                            <Link to={path[item.name.replace(' ', '_').toUpperCase()]} className='name-shoes' state={{ id: item.id }}>{item.name}</Link>
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                            <li className='menu-list_item' >
                                <Link to={path.MU_NON_MLB} className='menu-list_item-name text-white pe-2'>Mũ-nón</Link>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item bg-white w-100 position-absolute rounded'>
                                    <ul>
                                        {
                                            productTypes && productTypes.length > 0 &&
                                            productTypes.map((item, index) => {
                                                if (item.dataProductTypeCategory.type === categorieType.HAT) {
                                                    return (
                                                        <li key={index}>
                                                            <Link to={path[item.name.replace(' ', '_').toUpperCase()]} state={{ id: item.id }}>
                                                                <div
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '130px',
                                                                        backgroundImage: `url(${item.imageRoot})`,
                                                                        backgroundPosition: 'center',
                                                                        backgroundSize: 'contain',
                                                                        backgroundRepeat: 'no-repeat'
                                                                    }}
                                                                ></div>
                                                            </Link>
                                                            <Link to={path[item.name.replace(' ', '_').toUpperCase()]} state={{ id: item.id }} className='name-shoes'>{item.name}</Link>
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                            <li className='menu-list_item' >
                                <Link to={path.OUTFIT_MLB} className='menu-list_item-name text-white pe-2'>Áo-quần</Link>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item bg-white w-100 position-absolute rounded'>
                                    <ul>
                                        {
                                            productTypes && productTypes.length > 0 &&
                                            productTypes.map((item, index) => {
                                                if (item.dataProductTypeCategory.type === categorieType.CLOTHES) {
                                                    return (
                                                        <li key={index}>
                                                            <Link to={path[item.name.replace(' ', '_').toUpperCase()]} state={{ id: item.id }}>
                                                                <div
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '130px',
                                                                        backgroundImage: `url(${item.imageRoot})`,
                                                                        backgroundPosition: 'center',
                                                                        backgroundSize: 'contain',
                                                                        backgroundRepeat: 'no-repeat'
                                                                    }}
                                                                ></div>
                                                            </Link>
                                                            <Link to={path[item.name.replace(' ', '_').toUpperCase()]} state={{ id: item.id }} className='name-shoes'>{item.name}</Link>
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='infor d-flex align-items-center justify-content-between'>
                        <SearchProducts />

                        <div className='user position-relative'>
                            <Link to={userLogin && isLogin ? path.ACCOUNT : path.LOGIN} className='user-link text-white'>
                                <FontAwesomeIcon className='fz-18' icon={faUser} />
                                <div className='box-acc text-center rounded position-absolute bg-white'>
                                    {
                                        userLogin && isLogin ? <Link to={path.ACCOUNT}>{`${userLogin.firstName} ${userLogin.lastName}`}</Link>
                                            : <Link to={path.LOGIN}>Đăng nhập</Link>
                                    }
                                    {
                                        userLogin && isLogin ? <Link to={path.LOG_OUT} onClick={handleLogout}>Đăng xuất</Link>
                                            : <Link to={path.REGISTER}>Đăng ký</Link>
                                    }
                                </div>
                            </Link>
                        </div>
                        <div className='love position-relative'>
                            <Link to={path.FAVOURITE} className='text-white'>
                                <FontAwesomeIcon icon={faHeart} className='fz-18' />
                                <span className='numberTym position-absolute rounded-circle text-white text-center'>{countFavourite}</span>
                            </Link>
                        </div>
                        <div className='cart position-relative'>
                            <Link to={path.CART} className='text-white'>
                                <FontAwesomeIcon className='fz-18' icon={faCartShopping} />
                                <span className='numberProduct position-absolute rounded-circle text-white text-center'>{countProductsCart}</span>
                            </Link>
                            <ListCarts />
                        </div>
                    </div>
                </div>
            </div>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(Navbar));
