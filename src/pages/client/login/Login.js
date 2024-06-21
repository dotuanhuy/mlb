import React, { useEffect, useState, memo, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Navbar from '../../../components/clients/navbar/Navbar';
import './Login.scss'
import { Link } from 'react-router-dom';
import { path, CustomToast } from '../../../utils'
import * as actions from '../../../store/actions'
import { useNavigate } from 'react-router-dom';
import LoginOrther from '../../../components/clients/loginOrthers/LoginOrther';
import Banner from '../../../components/clients/banner/Banner';
import Footer from '../../../components/clients/footer/Footer';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import { validateRequire } from '../../../validate/valiedate';

const initState = {
    email: '',
    password: ''
}

function Login({ titlePage }) {
    const dispatch = useDispatch()
    const { message, roleId, isLogin } = useSelector(state => state.auth)
    const [dataInput, setDataInput] = useState(initState)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const body = useRef()
    const initialRender = useRef(true)

    useEffect(() => {
        dispatch(actions.refreshStoreUser)
        document.title = titlePage
        if (isLogin) {
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
                    top: body.current.offsetTop - 140
                });
            }
        }
    }, [body.current])

    useEffect(() => {
        if (message) {
            toast.error(CustomToast(message), { autoClose: 3000 })
            dispatch(actions.refreshStateAuth())
        }
    }, [message])

    useEffect(() => {
        if (isLogin && roleId === 1) {
            window.localStorage.setItem('notifications', 0)
            navigate(path.MANAGE)
        }
        else if (isLogin && roleId === 2) {
            navigate(path.HOMEPAGE)
        }
    }, [isLogin])

    const handleLogin = () => {
        const errorEmail = validateRequire('Email', dataInput.email)
        const errorPassword = validateRequire('Mật khẩu', dataInput.password)
        setErrors({
            email: errorEmail,
            password: errorPassword
        })
        if (!errorEmail && !errorPassword) {
            dispatch(actions.login(dataInput.email, dataInput.password))
        }
    }

    return (
        <div className='container-not'>
            <Navbar />
            <div className='login'>
                <div className='login-container'>
                    <Banner categoryProduct='Đăng nhập tài khoản' title='Đăng nhập tài khoản' />
                    <div ref={body} className='login-box'>
                        <div className='login-form-container shadow-sm mb-5 bg-body rounded'>
                            <div className='login-form-header d-flex align-items-center justify-content-around mb-2 border-bottom'>
                                <div className='title title-login position-relative d-flex align-items-center justify-content-center'>
                                    <Link className='fs-18' to='#'>Đăng nhập</Link>
                                </div>
                                <div className='title d-flex align-items-center justify-content-center'>
                                    <Link className='fs-18 text-muted' to={path.REGISTER}>Đăng ký</Link>
                                </div>
                            </div>
                            <div className='login-form-input p-4'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className='fw-500'>Email<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Nhập địa chỉ email..."
                                            value={dataInput.email}
                                            onChange={(e) => {
                                                setErrors({
                                                    ...errors,
                                                    email: ''
                                                })
                                                setDataInput({
                                                    ...dataInput,
                                                    email: e.target.value
                                                })
                                            }}
                                        />
                                        {
                                            errors && errors.email ? <span className='error'>{errors.email}</span> : ''
                                        }
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className='fw-500'>Mật khẩu<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Nhập mật khẩu..."
                                            value={dataInput.password}
                                            onChange={(e) => {
                                                setErrors({
                                                    ...errors,
                                                    password: ''
                                                })
                                                setDataInput({
                                                    ...dataInput,
                                                    password: e.target.value
                                                })
                                            }}
                                        />
                                        {
                                            errors && errors.password ? <span className='error'>{errors.password}</span> : ''
                                        }
                                    </Form.Group>
                                </Form>
                                <div className="form-group mb-2">
                                    <Link to={path.FORGOT_PASSWORD} className="text-sm-hover" >Quên mật khẩu?</Link>
                                </div>
                                <button
                                    className="btn btn-root w-100 fw-500"
                                    onClick={handleLogin}
                                >
                                    ĐĂNG NHẬP
                                </button>
                                <div className='my-2 fs-12 fw-500 text-muted text-center'>
                                    MLB Việt Nam cam kết bảo mật và sẽ không bao giờ đăng
                                    <br></br>
                                    hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
                                </div>
                                <div className='line-break'>
                                    <span>hoặc đăng nhập qua</span>
                                </div>
                                <LoginOrther />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(Login));
