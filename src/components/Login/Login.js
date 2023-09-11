import React, { useEffect, useState, memo, useCallback } from 'react';
import { connect } from 'react-redux';
import Navbar from '../HomePage/Navbar/Navbar';
import './Login.scss'
import { Link } from 'react-router-dom';
import { socialLogin } from '../../utils/images';
import { path, Role } from '../../utils'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const cookies = new Cookies();

const initState = {
    email: '',
    password: ''
}

function Login({user, isLogin, fetLoginRedux}) {
    const [dataInput, setDataInput] = useState(initState)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(isLogin) {
            navigate(path.HOMEPAGE)
        }
    }, [])

    useEffect(() => {
        if (isLogin && user.roleId === 'R1') {
            navigate(path.MANAGE)
        }
        else if (isLogin && user.roleId === 'R2') {
            navigate(path.HOMEPAGE)
        }
    }, [isLogin])

    const handleLogin = (e) => {
        e.preventDefault()
        fetLoginRedux(dataInput.email, dataInput.password)
    }

    return (
        <div className='container-not'>
            <Navbar />  
            <div className='login'>
                <div className='login-container'>
                    <div className='login-header'>
                        <div className='title'>
                            ĐĂNG NHẬP TÀI KHOẢN
                        </div>
                        <ul className='list-link'>
                            <li className='item-link-home'>
                                <Link to='/'>Trang chủ</Link>
                            </li>
                            <li>
                                <span>Đăng nhập tài khoản</span>
                            </li>
                        </ul>
                    </div>
                    <div className='login-box'>
                        <div className='login-form-container'>
                            <div className='login-form-header'>
                                <div className='title title-login'>
                                    <Link to='#'>Đăng nhập</Link>
                                </div>
                                <div className='title'>
                                    <Link to={path.REGISTER}>Đăng ký</Link>
                                </div> 
                            </div>
                            <div className='login-form-input'>
                                <form className='p-4'>
                                    <div className="form-group pb-4">
                                        <label className='label-input' htmlFor="exampleInputEmail1">EMAIL*</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="exampleInputEmail1" 
                                            aria-describedby="emailHelp" 
                                            placeholder="Nhập Địa chỉ Email" 
                                            value={dataInput.email}
                                            onChange={(e) => setDataInput({
                                                ...dataInput,
                                                email: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className='label-input' htmlFor="exampleInputPassword1">MẬT KHẨU*</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="exampleInputPassword1" 
                                            placeholder="Nhập Mật khẩu" 
                                            value={dataInput.password}
                                            onChange={(e) => setDataInput({
                                                ...dataInput,
                                                password: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="form-group py-2">
                                        <label >
                                            <a href='#' className="form-forgot-label" >Quên mật khẩu?</a>
                                        </label>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100 btn-login"
                                        onClick={(e) => handleLogin(e)}
                                    >
                                        ĐĂNG NHẬP
                                    </button>
                                    <div className='commit'>
                                        MLB Việt Nam cam kết bảo mật và sẽ không bao giờ đăng
                                        <br></br>
                                        hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
                                    </div>
                                </form>
                                <div className='line-break'>
                                    <span>hoặc đăng nhập qua</span>
                                </div>
                                <div className='social-login'>
                                    <a href='#'>
                                        <img src={socialLogin.fb}/>
                                    </a>
                                    <a href='#'>
                                        <img src={socialLogin.gp}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLogin: state.auth.isLogin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetLoginRedux: (email, password) => dispatch(actions.fetLogin(email, password))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Login));
