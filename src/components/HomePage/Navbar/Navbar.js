import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { shoes, bag, hat, shirts, PK, logo } from '../../../utils/images';
import './Navbar.scss'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { categorieType, path } from '../../../utils';
import jwt_decode from "jwt-decode";
import { typeShoesSandanl, typeBagBalo, typeHat, typeClothes } from '../../../utils';
import SearchProducts from '../../SearchProducts/SearchProducts';
import ListCarts from '../../carts/ListCarts';
import { Buffer } from 'buffer';

const initState = {
    firstName: '',
    lastName: '',
}

function Navbar({
    isLogin, 
    token, 
    countFavourite, 
    countProductsCart, 
    productTypes,
    refreshStoreProductType,
    getAllProductsFavouriteRedux, 
    fetLogoutRedux,
    getAllProductTypesRedux
}) {
    const [userLogin, setUserLogin] = useState(initState)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    useEffect(() => {
        // refreshStoreProductType()
        if (token) {
            let tokenDecoded = jwt_decode(token)
            setUserLogin({
                firstName: tokenDecoded.firstName,
                lastName: tokenDecoded.lastName,
            })
            // getAllProductsFavouriteRedux(token, tokenDecoded.id)
        }
        getAllProductTypesRedux(token)
    }, [])
    
    const handleLogout = async () => {
        fetLogoutRedux()
    }

    return (
        <div className='header-top text-light sticky-top'>
            <div className='nav-container'>
                <div className='header-top-nav d-flex justify-content-evenly align-items-center my-0 mx-100'>
                    <Link to={path.HOMEPAGE}>
                        <div className='nav-logo'>
                            
                        </div>
                    </Link>
                    <div className='nav-menu'>
                        <ul className='menu-list w-100 d-flex justify-content-around align-items-center text-uppercase position-relative m-0'>
                            <li className='menu-list_item'>
                                <Link to={path.GIAY_MLB} className='menu-list_item-name text-white pe-2'>Giày-dép</Link>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item bg-white w-100 position-absolute'>
                                    <ul>
                                        <li>
                                            <Link to={path.GIAY_MLB}>
                                                <img src={shoes.allShoes}/>
                                            </Link>
                                            <Link to={path.GIAY_MLB} className='name-shoes' >all shoes</Link>
                                        </li>
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
                                                                        backgroundImage: `url(${Buffer.from(item.imageRoot.data, 'base64').toString('binary')})`,
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
                                <div className='menu-item bg-white w-100 position-absolute'>
                                    <ul>
                                        <li>
                                            <Link to={path.TUI_MLB}>
                                                <img src={bag.allBag}/>
                                            </Link>
                                            <Link to={path.TUI_MLB} className='name-shoes' >All bag</Link>
                                        </li>
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
                                                                    backgroundImage: `url(${Buffer.from(item.imageRoot.data, 'base64').toString('binary')})`,
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
                                <div className='menu-item bg-white w-100 position-absolute'>
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
                                                                        backgroundImage: `url(${Buffer.from(item.imageRoot.data, 'base64').toString('binary')})`,
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
                                <div className='menu-item bg-white w-100 position-absolute'>
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
                                                                        backgroundImage: `url(${Buffer.from(item.imageRoot.data, 'base64').toString('binary')})`,
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
                            {/* <li className='menu-list_item' >
                                <span className='menu-list_item-name text-white pe-2'>Phụ-kiện</span>                               
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item bg-white w-100 position-absolute'>
                                    <ul>
                                        <li>
                                            <a href='#'>
                                                <img src={PK.MASK}/>
                                            </a>
                                            <a href='#' className='name-shoes' >MASK</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={PK.SOCK}/>
                                            </a>
                                            <a href='#' className='name-shoes'>SOCKT</a>
                                        </li>
                                    </ul>
                                </div>
                            </li> */}
                            <li className='menu-list_item' >                              
                                <span className='menu-list_item-name text-white pe-2'>Logo</span>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item bg-white w-100 position-absolute'>
                                    <ul>
                                        <li>
                                            <a href='#'>
                                                <img src={logo.NY}/>
                                            </a>
                                            <a href='#' className='name-shoes' >NEW YORK YANKEES (NY)</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={logo.LA}/>
                                            </a>
                                            <a href='#' className='name-shoes'>LOS ANGELES DODGERS (LA)</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={logo.B}/>
                                            </a>
                                            <a href='#' className='name-shoes'>BOSTON RED SOX (B)</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='menu-list_item' >
                                <span className='menu-list_item-name text-white pe-2'>Tin mlb</span>                                                             
                            </li>
                        </ul>
                    </div>
                    <div className='infor d-flex align-items-center justify-content-between'>
                        <SearchProducts />

                        <div className='user'>
                            <Link to={userLogin && isLogin ? path.ACCOUNT : path.LOGIN} className='user-link text-white'>
                                <FontAwesomeIcon className='icon-infor' icon={faUser} />
                                <div className='box-acc bg-white'>
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
                        <div className='love'>
                            <Link to={path.FAVOURITE} className='text-white'>
                                <FontAwesomeIcon icon={faHeart} className='icon-infor' />
                                <span className='numberTym rounded-circle text-white text-center'>{countFavourite}</span>
                            </Link>
                        </div>
                        <div className='cart'>
                            <Link to={path.CART} className='text-white'>
                                <FontAwesomeIcon className='icon-infor' icon={faCartShopping} />
                                <span className='numberProduct rounded-circle text-white text-center'>{countProductsCart}</span>
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
        token: state.auth.token,
        isLogin: state.auth.isLogin,
        productTypes: state.productType.productTypes,
        countFavourite: state.fouriteProduct.countProducts,
        countProductsCart: state.cart.countProducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshStoreProductType: () => dispatch(actions.refreshStoreProductType()),
        fetLogoutRedux: () => dispatch(actions.fetLogout()),
        getAllProductsFavouriteRedux: (token, userId) => dispatch(actions.getAllProductsFavourite(token, userId)),
        getAllProductTypesRedux: (accessToken) => dispatch(actions.getAllProductTypes(accessToken))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Navbar));
