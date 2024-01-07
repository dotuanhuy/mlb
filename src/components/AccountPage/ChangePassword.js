import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import './Account.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../HomePage/Navbar/Navbar';
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';
import jwt_decode from 'jwt-decode';
import Account from './Account';
import * as action from '../../store/actions'
import { validate } from '../../validate/valiedate';

const initState = {
    firstName: '',
    lastName: '',
    email: ''
}

const initInforChangePassword = {
    newPassword: '',
    oldPassword: '',
    rePassword: ''
}

function ChangePassword({token, isResetPassword, resetPasswordRedux, fetLogoutRedux}) {
    const [userLogin, setUserLogin] = useState(initState)
    const [inforChangePassword, setInforChangePassword] = useState(initInforChangePassword);
    const [error, setError] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            let tokenDecoded = jwt_decode(token)
            setUserLogin({
                id: tokenDecoded?.id,
                firstName: tokenDecoded?.firstName,
                lastName: tokenDecoded?.lastName,
                email: tokenDecoded?.email
            })
        }
        else {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        if (isResetPassword) {
            alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại")
            fetLogoutRedux()
            navigate('/login')
        }
    }, [isResetPassword])

    const handleResetPassword = (e) => {
        e.preventDefault()
        let error = validate(inforChangePassword)
        setError(error)
        if (Object.keys(error).length === 0) {
            inforChangePassword.id = userLogin.id
            resetPasswordRedux(inforChangePassword)
        }
    }

    return (
        <>
            <div className='account'>
                <Navbar />
                <div className='account-header'>
                    <div className='title'>
                        Thay đổi mật khẩu
                    </div>
                    <ul className='list-link'>
                        <li className='item-link-home'>
                            <Link to='/'>Trang chủ</Link>
                        </li>
                        <li>
                            <span>Thay đổi mật khẩu</span>
                        </li>
                    </ul>
                </div>
                <div className='account-body p-5'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3'>
                                <div className='list-option'>
                                    <Account userLogin={userLogin} activeType={'changePassword'}/>
                                </div>
                            </div>
                            <div className='col-9'>
                                <div className='list-option-select'>
                                    <h5>Đổi mật khẩu</h5>
                                    <p>Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 8 kí tự</p>
                                    <form>
                                        <div className="form-group pb-4">
                                            <label className='label-input pb-2' htmlFor="exampleInputPassword1">MẬT KHẨU CŨ *</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                id="exampleInputPassword1" 
                                                placeholder="Mật khẩu cũ" 
                                                onChange={(e) => {
                                                    setError({})
                                                    setInforChangePassword({
                                                        ...inforChangePassword,
                                                        oldPassword: e.target.value
                                                    })
                                                }}
                                            />
                                            {
                                                error && error.oldPassword ? <span className='error'>{error.oldPassword}</span> : ''
                                            }
                                        </div>
                                        <div className="form-group pb-4">
                                            <label className='label-input pb-2' htmlFor="exampleInputPassword1">MẬT KHẨU MỚI *</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                id="exampleInputPassword1" 
                                                placeholder="Mật khẩu mới" 
                                                onChange={(e) => {
                                                    setError({})
                                                    setInforChangePassword({
                                                        ...inforChangePassword,
                                                        newPassword: e.target.value
                                                    })
                                                }}
                                            />
                                            {
                                                error && error.newPassword ? <span className='error'>{error.newPassword}</span> : ''
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label className='label-input pb-2' htmlFor="exampleInputPassword2">XÁC NHẬN LẠI MẬT KHẨU MỚI *</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                id="exampleInputPassword2" 
                                                placeholder="Xác nhận lại mật khẩu mới" 
                                                onChange={(e) => {
                                                    setError({})
                                                    setInforChangePassword({
                                                        ...inforChangePassword,
                                                        rePassword: e.target.value
                                                    })
                                                }}
                                            />
                                            {
                                                error && error.rePassword ? <span className='error'>{error.rePassword}</span> : ''
                                            }
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="btn w-10 mt-4 px-3 py-2 btn-resetPassword"
                                            onClick={e => handleResetPassword(e)}
                                        >
                                            ĐẶT LẠI MẬT KHẨU
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <HomeFooter />
        </>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isResetPassword: state.auth.isResetPassword
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPasswordRedux: (data) => dispatch(action.resetPassword(data)),
        fetLogoutRedux: () => dispatch(action.fetLogout())
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));
