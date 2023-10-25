import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import './Account.scss'
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { path } from '../../utils';

// const initState = {
//     firstName: '',
//     lastName: '',
//     email: ''
// }

function Account({token, userLogin, activeType}) {
    const [active, setActive] = useState('infor')
    // const [userLogin, setUserLogin] = useState(initState)
    // useEffect(() => {
    //     if (token) {
    //         let tokenDecoded = jwt_decode(token)
    //         setUserLogin({
    //             firstName: tokenDecoded.firstName,
    //             lastName: tokenDecoded.lastName,
    //             email: tokenDecoded.email
    //         })
    //     }
    // }, [])
    // console.log('check userLogin: ', userLogin)
    
    useEffect(() => {
        setActive(activeType)
    }, [])

    return (
        <>
            {/* {
                isLoading ? 
                <Loading />
                : */}
                <h5>Trang tài khoản</h5>
                <p>{`Xin chào, ${userLogin.firstName} ${userLogin.lastName} !`}</p>
                <ul>
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
                        <Link>Đăng xuất</Link>
                    </li>
                </ul>
            {/* } */}
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
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Account));
