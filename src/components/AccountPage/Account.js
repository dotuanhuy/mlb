import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import './Account.scss'
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { path } from '../../utils';
import * as action from '../../store/actions'

function Account({token, userLogin, activeType, fetLogoutRedux}) {
    const [active, setActive] = useState('infor')
    const navigate = useNavigate()

    useEffect(() => {
       if (!token) {
            navigate(path.LOGIN)
       }
    }, [])
    
    useEffect(() => {
        setActive(activeType)
    }, [])

    const handleLogout = () => {
        fetLogoutRedux()
    }

    return (
        <>
            <h5>Trang tài khoản</h5>
            <p>{`Xin chào, ${userLogin.firstName} ${userLogin.lastName} !`}</p>
            <ul className='p-0 m-0'>
                <li>
                    <Link 
                        to={path.ACCOUNT} 
                        className={active === 'infor' ? 'active' : ''}
                    >Thông tin tài khoản</Link>
                </li>
                <li>
                    <Link>Đơn hàng của bạn</Link>
                </li>
                <li>
                    <Link 
                        to={path.ACCOUNT_CHANGE_PASSWORD}
                        className={active === 'changePassword'  ? 'active' : ''}
                    >Đổi mật khẩu</Link>
                </li>
                <li>
                    <Link>Sổ địa chỉ(0)</Link>
                </li>
                <li>
                    <Link
                        to={path.LOG_OUT}
                        onClick={handleLogout}
                    >Đăng xuất</Link>
                </li>
            </ul>
        </>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetLogoutRedux: () => dispatch(action.fetLogout()) 
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Account));
