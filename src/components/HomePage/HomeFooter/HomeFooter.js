import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faPhone, faHeadphonesSimple } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import './HomeFooter.scss'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path } from '../../../utils';
import { LOGO_MLB } from '../../../utils/images';

function HomeFooter() {
    
    return (
        <div className='homeFooter'>
            <div className='pt-5 pb-2'>
                <div className='container'>
                    <div className='row homefooter-menu pb-5'>
                        <div className='contact col-4'>
                            <div className='homeFooter-logo'>
                                <Link href='/'>
                                    <img src={LOGO_MLB.logo_mlb}/>
                                </Link>
                            </div>
                            <ul className='contact-menu'>
                                <li className='mb-4'>
                                    <FontAwesomeIcon className='pe-3' icon={faLocationDot} />
                                    Golden Mansion Building - HCM City
                                </li>
                                <li className='mb-4'>
                                    <FontAwesomeIcon className='pe-3' icon={faPhone} />
                                    <a href='#'>
                                        +12312312312
                                    </a>
                                </li>
                                <li className='mb-4'>
                                    <FontAwesomeIcon className='pe-3' icon={faHeadphonesSimple} />
                                    <a href='#'>
                                        +12312312312
                                    </a>
                                </li>
                                <li className='mb-4'>
                                    <FontAwesomeIcon className='pe-3' icon={faClock} />
                                    Giờ làm việc: 8:00am - 10:00pm
                                </li>
                            </ul>
                        </div>
                        <div className='suport general col-2'>
                            <p>HỖ TRỢ</p>
                            <div className='suport-menu general-menu row'>
                                <a href='#' className='mb-3'>Tìm kiếm sản phẩm</a>
                                <a href='#' className='mb-3'>Giỏ hàng</a>
                                <a href='#' className='mb-3'>Kiểm tra tình trạng đơn hàng</a>
                                <a href='#' className='mb-3'>Đăng ký tk</a>
                                <a href='#' className='mb-3'>Đăng nhập tk</a>
                            </div>
                        </div>
                        <div className='policy general col-2'>
                        <p>Chính sách mlb</p>
                            <div className='policy-menu general-menu row'>
                                <a href='#' className='mb-3'>Chính sách đổi trả</a>
                                <a href='#' className='mb-3'>Chính sách bảo mật</a>
                                <a href='#' className='mb-3'>Chính sách vận chuyển</a>
                                <a href='#' className='mb-3'>Quy định sử dụng</a>
                            </div>
                        </div>
                        <div className='footer-right col-3'>
                            <div className='footer-right-box'>
                                <div className='socail-footer'>
                                    <p>
                                        <a href='#'>MLB VIỆT NAM </a>
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
                                    <div className='socail-footer-menu row'>                             
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
