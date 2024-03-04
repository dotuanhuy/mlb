import React, { useEffect, useState, memo, useRef } from 'react';
import { connect } from 'react-redux';
import Navbar from '../HomePage/Navbar/Navbar';
import './Login.scss'
import { Link } from 'react-router-dom';
import { path,  } from '../../utils'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom';
import LoginOrther from '../common/loginOrthers/LoginOrther';
import Banner from '../common/Banners/Banner';
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';

const initState = {
    email: '',
    password: ''
}

function Login({titlePage, user, isLogin, fetLoginRedux}) {
    const [dataInput, setDataInput] = useState(initState)
    const navigate = useNavigate()
    const body = useRef()
    const initialRender  = useRef(true)
    
    useEffect(() => {
        document.title = titlePage
        if(isLogin) {
            navigate(path.HOMEPAGE)
        }
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            if (body.current) {
                window.scrollTo({
                    behavior: "smooth",
                    top: body.current.offsetTop
                });
            }
        }
    }, [])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            if (body.current) {
                window.scrollTo({
                    behavior: "smooth",
                    top: body.current.offsetTop - 80
                });
            }
        }
    }, [body.current])

    useEffect(() => {
        if (isLogin && user.roleId === 1) {
            navigate(path.MANAGE)
        }
        else if (isLogin && user.roleId === 2) {
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
                    <Banner categoryProduct='Đăng nhập tài khoản' title='Đăng nhập tài khoản'/>
                    <div ref={body} className='login-box'>
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
                                        <label className='label-input' htmlFor="exampleInputEmail1">EMAIL<span className='text-danger'>*</span></label>
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
                                        <label className='label-input' htmlFor="exampleInputPassword1">MẬT KHẨU<span className='text-danger'>*</span></label>
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
                                <LoginOrther />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HomeFooter />
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
