import React, { useEffect, useState, memo } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../../utils';
import * as action from '../../../store/actions'
import jwt_decode from 'jwt-decode';

const initState = {
    firstName: '',
    lastName: '',
    email: ''
}

function Account({ activeType, fetLogoutRedux }) {
    const [active, setActive] = useState('infor')
    const { message } = useSelector(state => state.user)
    const [userLogin, setUserLogin] = useState(initState)
    const navigate = useNavigate()

    useEffect(() => {
        const token = window.localStorage.getItem('accessToken')
        if (!token) {
            navigate(path.LOGIN)
        }
        else {
            let tokenDecoded = jwt_decode(token)
            setUserLogin({
                firstName: tokenDecoded?.firstName,
                lastName: tokenDecoded?.lastName,
                email: tokenDecoded?.email
            })
            setActive(activeType)
        }
    }, [])

    useEffect(() => {
        if (message) {
            const token = window.localStorage.getItem('accessToken')
            if (token) {
                let tokenDecoded = jwt_decode(token)
                setUserLogin({
                    firstName: tokenDecoded?.firstName,
                    lastName: tokenDecoded?.lastName,
                    email: tokenDecoded?.email
                })
            }
        }
    }, [message])

    const handleLogout = () => {
        fetLogoutRedux()
        navigate(path.HOMEPAGE)
    }

    return (
        <>
            <h5 className='text-uppercase'>Trang tài khoản</h5>
            <p className='fw-500'>{`Xin chào, ${userLogin.firstName} ${userLogin.lastName} !`}</p>
            <ul className='p-0 m-0'>
                <li className='mb-2'>
                    <Link
                        to={path.ACCOUNT}
                        className={active === 'infor' ? 'text-color-root-light fs-16 fw-500' : 'fs-16 text-muted text-sm-hover '}
                    >Thông tin tài khoản</Link>
                </li>
                <li className='mb-2'>
                    <Link
                        to={path.ORDER_TRACKING}
                        className={active === 'order' ? 'text-color-root-light fs-16 fw-500' : 'fs-16 text-muted text-sm-hover '}
                    >Đơn hàng của bạn</Link>
                </li>
                <li className='mb-2'>
                    <Link
                        to={path.ACCOUNT_CHANGE_PASSWORD}
                        className={active === 'changePassword' ? 'text-color-root-light fs-16 fw-500' : 'fs-16 text-muted text-sm-hover '}
                    >Đổi mật khẩu</Link>
                </li>
                <li className='mb-2'>
                    <Link>Sổ địa chỉ(0)</Link>
                </li>
                <li className='mb-2'>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetLogoutRedux: () => dispatch(action.fetLogout())
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Account));
