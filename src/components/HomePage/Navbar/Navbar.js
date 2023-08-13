import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faCaretDown, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { shoes, bag, hat, shirts, PK, logo, results } from '../../../utils/images';
import './Navbar.scss'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path } from '../../../utils';

function Navbar() {
    
    return (
        <div className='header-top'>
            <div className='nav-container'>
                <div className='header-top-nav'>
                    <Link to={path.HOMEPAGE}>
                        <div className='nav-logo'>

                        </div>
                    </Link>
                    <div className='nav-menu'>
                        <ul className='menu-list'>
                            <li className='menu-list_item'>
                                <span className='menu-list_item-name'>Giày-dép</span>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item'>
                                    <ul>
                                        <li>
                                            <a href='#'>
                                                <img src={shoes.allShoes}/>
                                            </a>
                                            <a href='#' className='name-shoes' >all shoes</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={shoes.BIGBALL_CHUNKY}/>
                                            </a>
                                            <a href='#' className='name-shoes'>BIGBALL CHUNKY</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={shoes.MULE}/>
                                            </a>
                                            <a href='#' className='name-shoes'>MULE</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={shoes.CHUNKY_LINER}/>
                                            </a>
                                            <a href='#' className='name-shoes'>CHUNKY LINER</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={shoes.PLAYBALL}/>
                                            </a>
                                            <a href='#' className='name-shoes'>PLAYBALL</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={shoes.CHUNKY_CLASSIC}/>
                                            </a>
                                            <a href='#' className='name-shoes'>CHUNKY CLASSIC</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={shoes.CHUNKY_JOGGER_RUNNER}/>
                                            </a>
                                            <a href='#' className='name-shoes'>CHUNKY JOGGER/RUNNER</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={shoes.SLIDERS_SANDALS}/>
                                            </a>
                                            <a href='#' className='name-shoes'>SLIDERS/SANDALS</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='menu-list_item' >
                                <span className='menu-list_item-name'>Túi-BaLo</span>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item'>
                                    <ul>
                                        <li>
                                            <a href='#'>
                                                <img src={bag.allBag}/>
                                            </a>
                                            <a href='#' className='name-shoes' >All bag</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={bag.BACKPACK}/>
                                            </a>
                                            <a href='#' className='name-shoes'>BACKPACK</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={bag.BUCKET_BAG}/>
                                            </a>
                                            <a href='#' className='name-shoes'>BUCKET BAG</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={bag.HIP_SACK}/>
                                            </a>
                                            <a href='#' className='name-shoes'>HIP SACK</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={bag.HOBO_BAG}/>
                                            </a>
                                            <a href='#' className='name-shoes'>HOBO BAG</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={bag.CROSS_BAG}/>
                                            </a>
                                            <a href='#' className='name-shoes'>CROSS BAG</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={bag.TOTE_BAG}/>
                                            </a>
                                            <a href='#' className='name-shoes'>TOTE BAG</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={bag.PHONE_POUCH}/>
                                            </a>
                                            <a href='#' className='name-shoes'>PHONE POUCH</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='menu-list_item' >
                                <span className='menu-list_item-name'>Mũ-nón</span>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item'>
                                    <ul>
                                        <li>
                                            <a href='#'>
                                                <img src={hat.BALL_CAP}/>
                                            </a>
                                            <a href='#' className='name-shoes' >ball cap</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={hat.BUCKET_HAT}/>
                                            </a>
                                            <a href='#' className='name-shoes'>BUCKET HAT</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={hat.SUN_CAP}/>
                                            </a>
                                            <a href='#' className='name-shoes'>SUN CAP</a>
                                        </li>
                                    </ul>
                                </div> 
                            </li>
                            <li className='menu-list_item' >
                                <span className='menu-list_item-name'>Áo-quần</span>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item'>
                                    <ul>
                                        <li>
                                            <a href='#'>
                                                <img src={shirts.T_SHIRT}/>
                                            </a>
                                            <a href='#' className='name-shoes' >T-SHIRT</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={shirts.SHORTS}/>
                                            </a>
                                            <a href='#' className='name-shoes'>SHORTS</a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                <img src={shirts.SKIRT_DRESS}/>
                                            </a>
                                            <a href='#' className='name-shoes'>SKIRT-DRESS</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='menu-list_item' >
                                <span className='menu-list_item-name'>Phụ-kiện</span>                               
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item'>
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
                                <span className='menu-list_item-name'>Logo</span>
                                <FontAwesomeIcon className='icon-down' icon={faCaretDown} />
                                <div className='menu-item'>
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
                                <span className='menu-list_item-name'>Tin mlb</span>                                                             
                            </li>
                        </ul>
                    </div>
                    <div className='infor'>
                        <div className='search'>
                            <FontAwesomeIcon className='icon-infor' icon={faMagnifyingGlass} />
                            <div className='input-search'>
                                <form className='form-search'>
                                    <input placeholder='Tìm kiếm sản phẩm'/>
                                    <button className='btn-search'>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-search'/>
                                    </button>
                                </form>
                                <div className='results-box'>
                                    <div className='results-box_item'>
                                        <a href='#'>
                                            <img src={results.result1} className='results-box_item-img'/>
                                            <div className='result-box_item-infor'>
                                                <div className='results-box_item-name'>MLB Bikini Set Classic Monogram Boston Red Sox L.Lavender</div>
                                                <div className='results-box_item-price'>3.990.000đ</div>
                                            </div>
                                        </a>
                                        <a href='#'>
                                            <img src={results.result1} className='results-box_item-img'/>
                                            <div className='result-box_item-infor'>
                                                <div className='results-box_item-name'>MLB Bikini Set Classic Monogram Boston Red Sox L.Lavender</div>
                                                <div className='results-box_item-price'>3.990.000đ</div>
                                            </div>
                                        </a>
                                        <a href='#'>
                                            Xem tất cả
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='user'>
                            <Link to={path.LOGIN} className='user-link'>
                                <FontAwesomeIcon className='icon-infor' icon={faUser} />
                                <div className='box-acc'>
                                    <Link to={path.LOGIN}>Đăng nhập</Link>
                                    <Link to={path.REGISTER}>Đăng ký</Link>
                                </div>
                            </Link>
                        </div>
                        <div className='love'>
                            <FontAwesomeIcon icon={faHeart} className='icon-infor' />
                            <span className='numberTym'>0</span>
                        </div>
                        <div className='cart'>
                            <FontAwesomeIcon className='icon-infor' icon={faCartShopping} />
                            <span className='numberProduct'>0</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
