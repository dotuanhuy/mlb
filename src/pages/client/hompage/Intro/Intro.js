import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faPhoneVolume, faRotate, faGift } from '@fortawesome/free-solid-svg-icons'

function Intro() {
    
    return (
        <div className='intro my-5 bg-root-solid container text-white rounded'>
            <div className='intro-box'>
                <div className='intro-menu row'>
                    <div className='intro-item col-3 text-center py-4'>
                        <FontAwesomeIcon style={{ fontSize: '36px' }} icon={faTruckFast} className='intro-icon mb-3'/>
                        <h3 className='fs-14'>GIAO HÀNG TOÀN QUỐC</h3>
                        <p className='fs-12'>Miễn phí vận chuyển với các đơn hàng trị giá trên 1.000.000Đ</p>
                    </div>
                    <div className='intro-item col-3 text-center py-4'>
                        <FontAwesomeIcon style={{ fontSize: '36px' }} icon={faPhoneVolume} className='intro-icon mb-3'/>                           
                        <h3 className='fs-14'>HỖ TRỢ ONLINE</h3>
                        <p className='fs-12'>Đội ngũ hỗ trợ hoạt động tất cả các ngày trong tuần, từ 9am-&gt;9pm</p>
                    </div>
                    <div className='intro-item col-3 text-center py-4'>
                        <FontAwesomeIcon style={{ fontSize: '36px' }} icon={faRotate} className='intro-icon mb-3'/>                           
                        <h3 className='fs-14'>ĐỔI HÀNG DỄ DÀNG</h3>
                        <p className='fs-12'>Đổi hàng online đơn giản, trực tiếp</p>
                    </div>
                    <div className='intro-item col-3 text-center py-4'>
                        <FontAwesomeIcon style={{ fontSize: '36px' }} icon={faGift} className='intro-icon mb-3'/>                           
                        <h3 className='fs-14'>QUÀ TẶNG HẤP DẪN</h3>
                        <p className='fs-12'>Chương trình khuyễn mãi cực lớn và hấp dẫn hàng tháng</p>
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
