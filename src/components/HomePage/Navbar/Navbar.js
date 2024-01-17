import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { shoes, bag, hat, shirts, PK, logo } from '../../../utils/images';
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path } from '../../../utils';
import jwt_decode from "jwt-decode";
import { typeShoesSandanl, typeBagBalo, typeHat, typeClothes } from '../../../utils';
import SearchProducts from '../../SearchProducts/SearchProducts';
import ListCarts from '../../carts/ListCarts';

const initState = {
    firstName: '',
    lastName: '',
}

function Navbar({isLogin, token, countFavourite, countProductsCart, fetLogoutRedux}) {
    const [userLogin, setUserLogin] = useState(initState)
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            let tokenDecoded = jwt_decode(token)
            setUserLogin({
                firstName: tokenDecoded.firstName,
                lastName: tokenDecoded.lastName,
            })
        }
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
                                        <li>
                                            <Link to={path.GIAY_MLB_BIGBALL_CHUNKY} state={{typeName: typeShoesSandanl.GIAY_MLB_BIGBALL_CHUNKY}}>
                                                <img src={shoes.BIGBALL_CHUNKY}/>
                                            </Link>
                                            <Link to={path.GIAY_MLB_BIGBALL_CHUNKY} state={{typeName: typeShoesSandanl.GIAY_MLB_BIGBALL_CHUNKY}} className='name-shoes'>BIGBALL CHUNKY</Link>
                                        </li>
                                        <li>
                                            <Link to={path.GIAY_MLB_MULE} state={{typeName: typeShoesSandanl.GIAY_MLB_MULE}}>
                                                <img src={shoes.MULE}/>
                                            </Link>
                                            <Link to={path.GIAY_MLB_MULE} state={{typeName: typeShoesSandanl.GIAY_MLB_MULE}} className='name-shoes'>MULE</Link>
                                        </li>
                                        <li>
                                            <Link to={path.GIAY_MLB_CHUNKY_LINER} state={{typeName: typeShoesSandanl.GIAY_MLB_CHUNKY_LINER}}>
                                                <img src={shoes.CHUNKY_LINER}/>
                                            </Link>
                                            <Link path={path.GIAY_MLB_CHUNKY_LINER} state={{typeName: typeShoesSandanl.GIAY_MLB_CHUNKY_LINER}} className='name-shoes'>CHUNKY LINER</Link>
                                        </li>
                                        <li>
                                            <Link to={path.GIAY_MLB_PLAYBALL} state={{typeName: typeShoesSandanl.GIAY_MLB_PLAYBALL}}>
                                                <img src={shoes.PLAYBALL}/>
                                            </Link>
                                            <Link path={path.GIAY_MLB_PLAYBALL} state={{typeName: typeShoesSandanl.GIAY_MLB_PLAYBALL}} className='name-shoes'>PLAYBALL</Link>
                                        </li>
                                        <li>
                                            <Link to={path.GIAY_MLB_CHUNKY_CLASSIC} state={{typeName: typeShoesSandanl.GIAY_MLB_CHUNKY_CLASSIC}}>
                                                <img src={shoes.CHUNKY_CLASSIC}/>
                                            </Link>
                                            <Link to={path.GIAY_MLB_CHUNKY_CLASSIC} state={{typeName: typeShoesSandanl.GIAY_MLB_CHUNKY_CLASSIC}} className='name-shoes'>CHUNKY CLASSIC</Link>
                                        </li>
                                        <li>
                                            <Link to={path.GIAY_MLB_CHUNKY_RUNNER} state={{typeName: typeShoesSandanl.GIAY_MLB_CHUNKY_RUNNRE}}>
                                                <img src={shoes.CHUNKY_JOGGER_RUNNER}/>
                                            </Link>
                                            <Link to={path.GIAY_MLB_CHUNKY_RUNNER} state={{typeName: typeShoesSandanl.GIAY_MLB_CHUNKY_RUNNRE}} className='name-shoes'>CHUNKY JOGGER/RUNNER</Link>
                                        </li>
                                        <li>
                                            <Link to={path.DEP_MLB} state={{typeName: typeShoesSandanl.DEP_MLB}}>
                                                <img src={shoes.SLIDERS_SANDALS}/>
                                            </Link>
                                            <Link to={path.DEP_MLB} state={{typeName: typeShoesSandanl.DEP_MLB}} className='name-shoes'>SLIDERS/SANDALS</Link>
                                        </li>
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
                                        <li>
                                            <Link to={path.BALO_MLB} state={{typeName: typeBagBalo.BALO_MLB}} >
                                                <img src={bag.BACKPACK}/>
                                            </Link>
                                            <Link to={path.BALO_MLB} state={{typeName: typeBagBalo.BALO_MLB}} className='name-shoes'>BACKPACK</Link>
                                        </li>
                                        <li>
                                            <Link to={path.TUI_MLB_BUCKET_BAG} state={{typeName: typeBagBalo.TUI_MLB_BUCKET_BAG}}>
                                                <img src={bag.BUCKET_BAG}/>
                                            </Link>
                                            <Link to={path.TUI_MLB_BUCKET_BAG} state={{typeName: typeBagBalo.TUI_MLB_BUCKET_BAG}} className='name-shoes'>BUCKET BAG</Link>
                                        </li>
                                        <li>
                                            <Link to={path.TUI_MLB_HIP_SACK} state={{typeName: typeBagBalo.TUI_MLB_HIP_SACK}}>
                                                <img src={bag.HIP_SACK}/>
                                            </Link>
                                            <Link to={path.TUI_MLB_HIP_SACK} state={{typeName: typeBagBalo.TUI_MLB_HIP_SACK}} className='name-shoes'>HIP SACK</Link>
                                        </li>
                                        <li>
                                            <Link to={path.TUI_MLB_HOBO_BAG} state={{typeName: typeBagBalo.TUI_MLB_HOBO_BAG}}>
                                                <img src={bag.HOBO_BAG}/>
                                            </Link>
                                            <Link to={path.TUI_MLB_HOBO_BAG} state={{typeName: typeBagBalo.TUI_MLB_HOBO_BAG}} className='name-shoes'>HOBO BAG</Link>
                                        </li>
                                        <li>
                                            <Link to={path.TUI_MLB_CROSS_BAG} state={{typeName: typeBagBalo.TUI_MLB_CROSS_BAG}}>
                                                <img src={bag.CROSS_BAG}/>
                                            </Link>
                                            <Link to={path.TUI_MLB_CROSS_BAG} state={{typeName: typeBagBalo.TUI_MLB_CROSS_BAG}} className='name-shoes'>CROSS BAG</Link>
                                        </li>
                                        <li>
                                            <Link to={path.TUI_MLB_TOTE_BAG} state={{typeName: typeBagBalo.TUI_MLB_TOTE_BAG}}>
                                                <img src={bag.TOTE_BAG}/>
                                            </Link>
                                            <Link to={path.TUI_MLB_TOTE_BAG} state={{typeName: typeBagBalo.TUI_MLB_TOTE_BAG}} className='name-shoes'>TOTE BAG</Link>
                                        </li>
                                        <li>
                                            <Link to={path.TUI_MLB_PHONE_POUCH} state={{typeName: typeBagBalo.TUI_MLB_PHONE_POUCH}}>
                                                <img src={bag.PHONE_POUCH}/>
                                            </Link>
                                            <Link to={path.TUI_MLB_PHONE_POUCH} state={{typeName: typeBagBalo.TUI_MLB_PHONE_POUCH}} className='name-shoes'>PHONE POUCH</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='menu-list_item' >
                                <Link to={path.MU_NON_MLB} className='menu-list_item-name text-white pe-2'>Mũ-nón</Link>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item bg-white w-100 position-absolute'>
                                    <ul>
                                        <li>
                                            <Link to={path.NON_MLB_BALL_CAP} state={{typeName: typeHat.NON_MLB_BALL_CAP}}>
                                                <img src={hat.BALL_CAP}/>
                                            </Link>
                                            <Link to={path.NON_MLB_BALL_CAP} state={{typeName: typeHat.NON_MLB_BALL_CAP}} className='name-shoes' >ball cap</Link>
                                        </li>
                                        <li>
                                            <Link to={path.NON_MLB_BUCKET_HAT} state={{typeName: typeHat.NON_MLB_BUCKET_HAT}}>
                                                <img src={hat.BUCKET_HAT}/>
                                            </Link>
                                            <Link to={path.NON_MLB_BUCKET_HAT} state={{typeName: typeHat.NON_MLB_BUCKET_HAT}} className='name-shoes'>BUCKET HAT</Link>
                                        </li>
                                        <li>
                                            <Link to={path.NON_MLB_SUN_CAP} state={{typeName: typeHat.NON_MLB_SUN_CAP}}>
                                                <img src={hat.SUN_CAP}/>
                                            </Link>
                                            <Link to={path.NON_MLB_SUN_CAP} state={{typeName: typeHat.NON_MLB_SUN_CAP}} className='name-shoes'>SUN CAP</Link>
                                        </li>
                                    </ul>
                                </div> 
                            </li>
                            <li className='menu-list_item' >
                                <Link to={path.OUTFIT_MLB} className='menu-list_item-name text-white pe-2'>Áo-quần</Link>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item bg-white w-100 position-absolute'>
                                    <ul>
                                        <li>
                                            <Link to={path.OUTFIT_MLB_TSHIRT} state={{typeName: typeClothes.OUTFIT_MLB_TSHIRT}}>
                                                <img src={shirts.T_SHIRT}/>
                                            </Link>
                                            <Link to={path.OUTFIT_MLB_TSHIRT} state={{typeName: typeClothes.OUTFIT_MLB_TSHIRT}} className='name-shoes' >T-SHIRT</Link>
                                        </li>
                                        <li>
                                            <Link to={path.OUTFIT_MLB_SHORTS} state={{typeName: typeClothes.OUTFIT_MLB_SHORTS}}>
                                                <img src={shirts.SHORTS}/>
                                            </Link>
                                            <Link to={path.OUTFIT_MLB_SHORTS} state={{typeName: typeClothes.OUTFIT_MLB_SHORTS}} className='name-shoes'>SHORTS</Link>
                                        </li>
                                        <li>
                                            <Link to={path.OUTFIT_MLB_SKIRT_DRESS} state={{typeName: typeClothes.OUTFIT_MLB_SKIRT_DRESS}}>
                                                <img src={shirts.SKIRT_DRESS}/>
                                            </Link>
                                            <Link to={path.OUTFIT_MLB_SKIRT_DRESS} state={{typeName: typeClothes.OUTFIT_MLB_SKIRT_DRESS}} className='name-shoes'>SKIRT-DRESS</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='menu-list_item' >
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
                            </li>
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
        // countFavourite: state.product.countFavouriteProduct,
        countFavourite: state.fouriteProduct.countProducts,
        countProductsCart: state.cart.countProducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetLogoutRedux: () => dispatch(actions.fetLogout())
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Navbar));
