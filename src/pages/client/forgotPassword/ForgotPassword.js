import React, { useEffect, useState, memo, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { path, CustomToast } from '../../../utils'
import * as actions from '../../../store/actions'
import { useNavigate } from 'react-router-dom';
import Banner from '../../../components/clients/banner/Banner';
import Footer from '../../../components/clients/footer/Footer';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import { validate } from '../../../validate/valiedate';
import VerifyOtp from '../../../components/clients/verify/VerifyOtp';
import Navbar from '../../../components/clients/navbar/Navbar';
import Loading from '../../../components/loading/Loading';

function ForgotPassword({ titlePage }) {
    const dispatch = useDispatch()
    const { message, isLogin, errCode, isVerify, email } = useSelector(state => state.auth)
    const messageUser = useSelector(state => state.user.message)
    const [password, setPassword] = useState({ password: '', rePassword: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const body = useRef()
    const initialRender = useRef(true)

    useEffect(() => {
        document.title = titlePage
        dispatch(actions.refreshStateAuth())
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
                    top: body.current.offsetTop - 80
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
                setIsLoading(false)
            }
            dispatch(actions.refreshStateAuth())
        }
    }, [message])

    useEffect(() => {
        if (messageUser) {
            toast.error(CustomToast(messageUser), { autoClose: 3000 })
            dispatch(actions.refreshStateMessage())
        }
    }, [messageUser])

    const handleConfirmPassword = (e) => {
        e.preventDefault()
        const err = validate(password)
        if (Object.keys(err).length !== 0) {
            setErrors(err)
        }
        else {
            dispatch(actions.forgotPassword({
                email: email,
                password: password.password
            }))
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
                <div>
                    <div>
                        <Banner categoryProduct={titlePage} title={titlePage} />
                        <div ref={body} style={{
                            margin: '50px 200px',
                            padding: '0 40px'
                        }}>
                            <div className='shadow-sm mb-5 bg-body rounded' style={{
                                width: '680px',
                                margin: '10px auto'
                            }}>
                                <div className='fs-18 fw-500 d-flex align-items-center justify-content-center mb-2 py-2 border-bottom'>
                                    Quên mật khẩu
                                </div>
                                <div className='p-4'>
                                    <Form>
                                        {
                                            !isVerify ?
                                                <VerifyOtp type='forgot password' setIsLoading={setIsLoading} />
                                                :
                                                <>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label className='fw-500'>Mật khẩu mới<span className='text-danger'>*</span></Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Nhập mật khẩu mới..."
                                                            value={password.password}
                                                            onChange={(e) => {
                                                                setErrors({
                                                                    ...errors,
                                                                    password: ''
                                                                })
                                                                setPassword({
                                                                    ...password,
                                                                    password: e.target.value
                                                                })
                                                            }}
                                                        />
                                                        {
                                                            errors && errors.password ? <span className='error'>{errors.password}</span> : ''
                                                        }
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label className='fw-500'>Nhập lại mật khẩu<span className='text-danger'>*</span></Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Nhập lại mật khẩu..."
                                                            value={password.rePassword}
                                                            onChange={(e) => {
                                                                setErrors({
                                                                    ...errors,
                                                                    rePassword: ''
                                                                })
                                                                setPassword({
                                                                    ...password,
                                                                    rePassword: e.target.value
                                                                })
                                                            }}
                                                        />
                                                        {
                                                            errors && errors.rePassword ? <span className='error'>{errors.rePassword}</span> : ''
                                                        }
                                                    </Form.Group>
                                                    <button
                                                        className='btn btn-root w-100 fw-500'
                                                        onClick={handleConfirmPassword}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                </>
                                        }

                                    </Form>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));
