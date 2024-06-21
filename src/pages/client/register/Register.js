import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Navbar from '../../../components/clients/navbar/Navbar';
import './Register.scss'
import { Link, useNavigate } from 'react-router-dom';
import { CustomToast, path } from '../../../utils'
import * as actions from '../../../store/actions'
import { validate } from '../../../validate/valiedate';
import LoginOrther from '../../../components/clients/loginOrthers/LoginOrther';
import VerifyOtp from '../../../components/clients/verify/VerifyOtp';
import Banner from '../../../components/clients/banner/Banner';
import Footer from '../../../components/clients/footer/Footer';
import { toast } from 'react-toastify';
import Loading from '../../../components/loading/Loading';
import { Form } from 'react-bootstrap';

const inintState = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
}

const inforUserNotValue = {
    address: '',
    gender: '',
    avatar: ''
}

function Register({ titlePage }) {
    const dispatch = useDispatch()
    const { message, errCode, isVerify, email } = useSelector(state => state.auth)
    const [inforUser, setInforUser] = useState(inintState)
    const [errors, setErrors] = useState({})
    const [isVerifyState, setIsverifyState] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const body = useRef()
    const initialRender = useRef(true)

    useEffect(() => {
        dispatch(actions.refreshStoreUser())
        document.title = titlePage
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
            if (errCode === 0) {
                toast.success(CustomToast(message), { autoClose: 3000 })
                navigate(path.LOGIN)
            }
            else {
                toast.error(CustomToast(message), { autoClose: 3000 })
            }
            dispatch(actions.refreshStateMessage())
            setIsLoading(false)
        }
    }, [message])

    useEffect(() => {
        if (isVerify) {
            setIsverifyState(isVerify)
            setInforUser({
                ...inforUser,
                email
            })
        }
    }, [isVerify])


    const handleRegister = (e) => {
        e.preventDefault()
        let error = validate(inforUser)
        setErrors(error)
        if (Object.keys(error).length === 0) {
            let newInfoUser = { ...inforUser, ...inforUserNotValue }
            dispatch(actions.register(newInfoUser))
        }
    }

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    : ''
            }
            <div className='container-not'>
                <Navbar />
                <div className='register'>
                    <div className='register-container'>
                        <Banner categoryProduct='Đăng ký tài khoản' title='Đăng ký tài khoản' />
                        <div ref={body} className='register-box'>
                            <div className='register-form-container'>
                                <div className='register-form-header d-flex align-items-center justify-content-around mb-2 border-bottom'>
                                    <div className='title d-flex align-items-center justify-content-center'>
                                        <Link className='fs-18 text-muted' to={path.LOGIN}>Đăng nhập</Link>
                                    </div>
                                    <div className='title title-register position-relative d-flex align-items-center justify-content-center'>
                                        <Link className='fs-18' to='#'>Đăng ký</Link>
                                    </div>
                                </div>
                                <div className='register-form-input'>
                                    {
                                        isVerifyState ?
                                            <Form className='p-4'>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Họ<span className='text-danger'>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nhập tên..."
                                                        value={inforUser.firstName}
                                                        onChange={(e) => {
                                                            setErrors({ ...errors, firstName: '' })
                                                            setInforUser({
                                                                ...inforUser,
                                                                firstName: e.target.value
                                                            })
                                                        }}
                                                    />
                                                    {
                                                        errors && errors.firstName ? <span className='error'>{errors.firstName}</span> : ''
                                                    }
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Tên<span className='text-danger'>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nhập tên..."
                                                        value={inforUser.lastName}
                                                        onChange={(e) => {
                                                            setErrors({ ...errors, lastName: '' })
                                                            setInforUser({
                                                                ...inforUser,
                                                                lastName: e.target.value
                                                            })
                                                        }}
                                                    />
                                                    {
                                                        errors && errors.lastName ? <span className='error'>{errors.lastName}</span> : ''
                                                    }
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Số điện thoại<span className='text-danger'>*</span></Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Nhập số điện thoại..."
                                                        value={inforUser.phone}
                                                        onChange={(e) => {
                                                            setErrors({ ...errors, phone: '' })
                                                            setInforUser({
                                                                ...inforUser,
                                                                phone: e.target.value
                                                            })
                                                        }}
                                                    />
                                                    {
                                                        errors && errors.phone ? <span className='error'>{errors.phone}</span> : ''
                                                    }
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Email<span className='text-danger'>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nhập email..."
                                                        value={inforUser.email}
                                                        disabled
                                                    />
                                                    {
                                                        errors && errors.email ? <span className='error'>{errors.email}</span> : ''
                                                    }
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Mật khẩu<span className='text-danger'>*</span></Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Nhập mật khẩu..."
                                                        value={inforUser.password}
                                                        onChange={(e) => {
                                                            setErrors({ ...errors, password: '' })
                                                            setInforUser({
                                                                ...inforUser,
                                                                password: e.target.value
                                                            })
                                                        }}
                                                    />
                                                    {
                                                        errors && errors.password ? <span className='error'>{errors.password}</span> : ''
                                                    }
                                                </Form.Group>
                                                <button
                                                    className="btn btn-primary w-100 btn-register"
                                                    onClick={handleRegister}
                                                >
                                                    Tạo tài khoản
                                                </button>
                                            </Form>
                                            :
                                            <VerifyOtp type="register" setIsLoading={setIsLoading} />
                                    }
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
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
