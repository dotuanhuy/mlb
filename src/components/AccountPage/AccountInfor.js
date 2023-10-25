import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import './Account.scss'
import { Link } from 'react-router-dom';
import Navbar from '../HomePage/Navbar/Navbar';
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';
import jwt_decode from 'jwt-decode';
import Account from './Account';

const initState = {
    firstName: '',
    lastName: '',
    email: ''
}

function AccountInfor({token}) {
    const [userLogin, setUserLogin] = useState(initState)
    useEffect(() => {
        if (token) {
            let tokenDecoded = jwt_decode(token)
            setUserLogin({
                firstName: tokenDecoded?.firstName,
                lastName: tokenDecoded?.lastName,
                email: tokenDecoded?.email
            })
        }
    }, [])

    return (
        <>
            {/* {
                isLoading ? 
                <Loading />
                : */}
                <div className='account'>
                    <Navbar />
                    <div className='account-header'>
                        <div className='title'>
                            TRANG KHÁCH HÀNG
                        </div>
                        <ul className='list-link'>
                            <li className='item-link-home'>
                                <Link to='/'>Trang chủ</Link>
                            </li>
                            <li>
                                <span>Trang khách hàng</span>
                            </li>
                        </ul>
                    </div>
                    <div className='account-body p-5'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-3'>
                                    <div className='list-option'>
                                        <Account userLogin={userLogin} activeType={'infor'}/>
                                    </div>
                                </div>
                                <div className='col-9'>
                                    <div className='list-option-select'>
                                        <h5>Thông tin tài khoản</h5>
                                        <p>
                                            <strong>Họ tên: </strong>
                                            {`${userLogin?.firstName} ${userLogin?.lastName}`}
                                        </p>
                                        <p>
                                            <strong>Email: </strong>
                                            {`${userLogin?.email}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <HomeFooter />
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(AccountInfor));
