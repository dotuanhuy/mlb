import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faPhone, faHeadphonesSimple } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import './Footer.scss'
import { Link } from 'react-router-dom';
import { path } from '../../../utils';
import { LOGO_MLB } from '../../../utils/images';

function Footer() {

    return (
        <div className='Footer bg-dark'>
            <div className='pt-5 pb-2'>
                <div className='container'>
                    <div className='row Footer-menu pb-5'>
                        <div className='contact col-4 text-white fs-14'>
                            <div className='Footer-logo'>
                                <Link to='/'>
                                    <img src={LOGO_MLB.logo_mlb} />
                                </Link>
                            </div>
                            <ul className='contact-menu'>
                                <li className='mb-4'>
                                    <FontAwesomeIcon className='pe-3' icon={faLocationDot} />
                                    Golden Mansion Building - HCM City
                                </li>
                                <li className='mb-4'>
                                    <FontAwesomeIcon className='pe-3' icon={faPhone} />
                                    <a href='#' className='text-white text-sm-hover'>
                                        +12312312312
                                    </a>
                                </li>
                                <li className='mb-4'>
                                    <FontAwesomeIcon className='pe-3' icon={faHeadphonesSimple} />
                                    <a href='#' className='text-white text-sm-hover'>
                                        +12312312312
                                    </a>
                                </li>
                                <li className='mb-4'>
                                    <FontAwesomeIcon className='pe-3' icon={faClock} />
                                    Giờ làm việc: 8:00am - 10:00pm
                                </li>
                            </ul>
                        </div>
                        <div className='suport col-2 text-white'>
                            <p className='fs-16 fw-bold text-uppercase'>HỖ TRỢ</p>
                            <div className='suport-menu row'>
                                <Link to={`${path.SEARCH_PRODUCT}?pname=`} className='mb-3 text-sm-hover text-white'>Tìm kiếm sản phẩm</Link>
                                <Link to={path.CART} className='mb-3 text-sm-hover text-white'>Giỏ hàng</Link>
                                <Link to={path.ORDER_TRACKING} className='mb-3 text-sm-hover text-white'>Kiểm tra tình trạng đơn hàng</Link>
                            </div>
                        </div>
                        <div className='policy col-2 text-white'>
                            <p className='fs-16 fw-bold text-uppercase'>Chính sách mlb</p>
                            <div className='policy-menu row'>
                                <a href='#' className='mb-3 text-white text-sm-hover'>Chính sách đổi trả</a>
                                <a href='#' className='mb-3 text-white text-sm-hover'>Chính sách bảo mật</a>
                                <a href='#' className='mb-3 text-white text-sm-hover'>Chính sách vận chuyển</a>
                                <a href='#' className='mb-3 text-white text-sm-hover'>Quy định sử dụng</a>
                            </div>
                        </div>
                        <div className='footer-right col-3 text-white'>
                            <div className='footer-right-box'>
                                <div className='socail-footer'>
                                    <p className='fs-16 fw-bold text-uppercase'>
                                        <Link
                                            to={path.HOMEPAGE}
                                            className='text-decoration-underline'
                                            style={{
                                                color: '#2980b9'
                                            }}
                                        >MLB VIỆT NAM </Link>
                                        HÂN HẠNH ĐƯỢC PHỤC VỤ
                                        <br></br>
                                        GOLDEN MANSION BUILDING
                                        <br></br>
                                        CEO : LE HOANG LONG
                                        <br></br>
                                        BUSINESS REGISTRATION : 150-41-60423
                                        <br></br>
                                        E-COMMERCE PERMIT : 2021-29489
                                        <br></br>
                                        PERSONAL INFOR MANAGER : LE THANH NGHIEM
                                    </p>
                                    <div className='socail-footer-menu d-flex gap-3'>
                                        <a href='#' className='socail-footer-item col-3'>
                                            <FontAwesomeIcon className='socail-footer-icon' icon={faYoutube} />
                                        </a>
                                        <a href='#' className='socail-footer-item col-3'>
                                            <FontAwesomeIcon className='socail-footer-icon' icon={faFacebookF} />
                                        </a>
                                        <a href='#' className='socail-footer-item col-3'>
                                            <FontAwesomeIcon className='socail-footer-icon' icon={faInstagram} />
                                        </a>
                                    </div>
                                </div>
                                <div className='email-footer mt-4'>
                                    <p>Đăng ký để nhận tin</p>
                                    <form className='form-email form-inline'>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Nhập địa chỉ email" />
                                        </div>
                                        <button type="submit" className="btn btn-primary mb-2">Gửi</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='copyright'>
                    <div className='container text-center pt-2'>
                        <p>
                            @ Bản quyền thuộc về MLB Vietnam | Cung cấp bởi <a href='#'>MLB</a>
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
