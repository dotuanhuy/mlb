import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../HomePage/Navbar/Navbar';
import './Register.scss'
import { Link } from 'react-router-dom';
import { path } from '../../utils'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom';
import { validate } from '../../validate/valiedate';
import { Modal } from 'react-bootstrap';
import LoginOrther from '../common/loginOrthers/LoginOrther';
import VerifyOtp from '../common/verifys/VerifyOtp';
import Banner from '../common/Banners/Banner';
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';

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

function Register({titlePage, errMessage, errCode, isVerify, email, createNewUserRedux, refreshStoreUserRedux}) {
    const [show, setShow] = useState(false);
    const [inforUser, setInforUser] = useState(inintState)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [isVerifyState, setIsverifyState] = useState(false)
    const body = useRef()
    const initialRender  = useRef(true)

    useEffect(() => {
        refreshStoreUserRedux()
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
                    top: body.current.offsetTop - 80
                });
            }
        }
    }, [body.current])

    useEffect(() => {
        if (errMessage) {
            setShow(true)
        }
    }, [errMessage])

    useEffect(() => {
        if (isVerify) {
            setIsverifyState(isVerify)
            setInforUser({
                ...inforUser,
                email
            })
        }
    }, [isVerify])

    const handleClose = () => {
        setShow(false)
        if (errCode === 0) {
            navigate(path.LOGIN)
        }
    }

    const handleRegister = (e) => {
        e.preventDefault()
        let error = validate(inforUser)
        setErrors(error)
        if (Object.keys(error).length === 0) {
            let newInfoUser = { ...inforUser, ...inforUserNotValue }
            createNewUserRedux(newInfoUser)
        }
    }

    return (
        <div className='container-not'>
            <Navbar />  
            <div className='register'>
                <div className='register-container'>
                    <Banner categoryProduct='Đăng ký tài khoản' title='Đăng ký tài khoản'/>
                    <div ref={body}  className='register-box'>
                        <div className='register-form-container'>
                            <div className='register-form-header'>
                                <div className='title'>
                                    <Link to={path.LOGIN}>Đăng nhập</Link>
                                </div>
                                <div className='title title-register'>
                                    <Link to='#'>Đăng ký</Link>
                                </div> 
                            </div>
                            <div className='register-form-input'>
                                {
                                    isVerifyState ? 
                                    <form className='p-4'>
                                        <div className="form-group pb-4">
                                            <label className='label-input' htmlFor="exampleInputFirstName">HỌ<span className='text-danger'>*</span></label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputFirstName" 
                                                placeholder="Nhập Họ" 
                                                value={inforUser.firstName}
                                                onChange={(e) => {
                                                    setErrors({...errors, firstName: ''})
                                                    setInforUser({
                                                        ...inforUser,
                                                        firstName: e.target.value
                                                    })
                                                }}
                                            />
                                            {
                                                errors && errors.firstName ? <span className='error'>{errors.firstName}</span> : ''
                                            }                                        
                                        </div>
                                        <div className="form-group pb-4">
                                            <label className='label-input' htmlFor="exampleInputLastName">TÊN<span className='text-danger'>*</span></label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputLastName" 
                                                placeholder="Nhập Tên" 
                                                value={inforUser.lastName}
                                                onChange={(e) => {
                                                    setErrors({...errors, lastName: ''})
                                                    setInforUser({
                                                        ...inforUser,
                                                        lastName: e.target.value
                                                    })
                                                }}
                                            />
                                            {
                                                errors && errors.lastName ? <span className='error'>{errors.lastName}</span> : ''
                                            }  
                                        </div>  
                                        <div className="form-group pb-4">
                                            <label className='label-input' htmlFor="exampleInputphone">SỐ ĐIỆN THOẠI<span className='text-danger'>*</span></label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputphone" 
                                                placeholder="Nhập Số điện thoại" 
                                                value={inforUser.phone}
                                                onChange={(e) =>  {
                                                    setErrors({...errors, phone: ''})
                                                    setInforUser({
                                                        ...inforUser,
                                                        phone: e.target.value
                                                    })
                                                }}
                                            />
                                            {
                                                errors && errors.phone ? <span className='error'>{errors.phone}</span> : ''
                                            }  
                                        </div>
                                        <div className="form-group pb-4">
                                            <label className='label-input' htmlFor="exampleInputEmail1">EMAIL<span className='text-danger'>*</span></label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                id="exampleInputEmail1" 
                                                aria-describedby="emailHelp" 
                                                placeholder="Nhập Địa chỉ Email" 
                                                value={inforUser.email}
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group pb-4">
                                            <label className='label-input' htmlFor="exampleInputPassword1">MẬT KHẨU<span className='text-danger'>*</span></label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                id="exampleInputPassword1" 
                                                placeholder="Nhập Mật khẩu" 
                                                value={inforUser.password}
                                                onChange={(e) => {
                                                    setErrors({...errors, password: ''})
                                                    setInforUser({
                                                        ...inforUser,
                                                        password: e.target.value
                                                    })
                                                }}
                                            />
                                            {
                                                errors && errors.password ? <span className='error'>{errors.password}</span> : ''
                                            }  
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary w-100 btn-register"
                                            onClick={(e) => handleRegister(e)}
                                        >
                                            TẠO TÀI KHOẢN
                                        </button>
                                    </form>
                                    :
                                    <VerifyOtp />
                                }
                                <div className='line-break'>
                                    <span>hoặc đăng nhập qua</span>
                                </div>
                                <LoginOrther />
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    // centered
                    size="sm"
                >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <span className='fw-500'>{errMessage}</span>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-root fw-500' variant="secondary" onClick={handleClose}>
                        Đóng
                    </button>
                </Modal.Footer>
            </Modal>
            </div>
            <HomeFooter />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        errMessage: state.user.errMessage,
        errCode: state.user.errCode,
        isVerify: state.user.isVerify,
        email: state.user.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createNewUserRedux: (data) => dispatch(actions.register(data)), 
        refreshStoreUserRedux: () => dispatch(actions.refreshStoreUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
