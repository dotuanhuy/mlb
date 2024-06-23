import React, { useEffect, useState, memo } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../../utils';
import { AES, enc } from 'crypto-js';

const initState = {
    firstName: '',
    lastName: '',
    email: ''
}

function Account({ activeType }) {
    const [active, setActive] = useState('infor')
    const { message } = useSelector(state => state.user)
    const [userLogin, setUserLogin] = useState(initState)
    const navigate = useNavigate()

    useEffect(() => {
        const infoUser = window.localStorage.getItem('info')
        // const infoUser = Cookies.get('info')
        if (!infoUser) {
            alert('not info')
            navigate(path.LOGIN)
        }
        else {
            const infoDecoded = JSON.parse(AES.decrypt(infoUser, process.env.REACT_APP_KEY_AES).toString(enc.Utf8))
            setUserLogin({
                firstName: infoDecoded?.firstName,
                lastName: infoDecoded?.lastName,
                email: infoDecoded?.email
            })
            setActive(activeType)
        }
    }, [])

    useEffect(() => {
        if (message) {
            const infoUser = window.localStorage.getItem('info')
            // const infoUser = Cookies.get('info')
            if (!infoUser) {
                navigate(path.LOGIN)
            }
            else {
                const infoDecoded = JSON.parse(AES.decrypt(infoUser, process.env.REACT_APP_KEY_AES).toString(enc.Utf8))
                setUserLogin({
                    firstName: infoDecoded?.firstName,
                    lastName: infoDecoded?.lastName,
                    email: infoDecoded?.email
                })
                setActive(activeType)
            }
        }
    }, [message])

    return (
        <div className='col-3'>
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
                        className='fs-16 text-muted text-sm-hover'
                    >Đăng xuất</Link>
                </li>
            </ul>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(Account));
