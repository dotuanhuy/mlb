import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faTruckFast, faPhoneVolume, faRotate, faGift } from '@fortawesome/free-solid-svg-icons'
import './Intro.scss'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path } from '../../../utils';

function Intro() {
    
    return (
        <div className='intro container'>
            <div className='intro-box'>
                <div className='intro-menu row'>
                    <div className='intro-item col-3 text-center py-4'>
                        <FontAwesomeIcon icon={faTruckFast} className='intro-icon mb-3'/>
                        <h3>GIAO HÀNG TOÀN QUỐC</h3>
                        <p>Miễn phí vận chuyển với các đơn hàng trị giá trên 1.000.000Đ</p>
                    </div>
                    <div className='intro-item col-3 text-center py-4'>
                        <FontAwesomeIcon icon={faPhoneVolume} className='intro-icon mb-3'/>                           
                        <h3>HỖ TRỢ ONLINE</h3>
                        <p>Đội ngũ hỗ trợ hoạt động tất cả các ngày trong tuần, từ 9am->9pm</p>
                    </div>
                    <div className='intro-item col-3 text-center py-4'>
                        <FontAwesomeIcon icon={faRotate} className='intro-icon mb-3'/>                           
                        <h3>ĐỔI HÀNG DỄ DÀNG</h3>
                        <p>Đổi hàng online đơn giản, trực tiếp</p>
                    </div>
                    <div className='intro-item col-3 text-center py-4'>
                        <FontAwesomeIcon icon={faGift} className='intro-icon mb-3'/>                           
                        <h3>QUÀ TẶNG HẤP DẪN</h3>
                        <p>Chương trình khuyễn mãi cực lớn và hấp dẫn hàng tháng</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
