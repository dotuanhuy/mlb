import React, { useEffect, useState, memo, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Navbar from '../HomePage/Navbar/Navbar';
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';
import Account from './Account';
import Banner from '../common/Banners/Banner';
import { FloatingLabel, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils';
import * as actions from '../../store/actions'
import { toast } from 'react-toastify';

function AccountInfor({ titlePage }) {
    const dispatch = useDispatch()
    const { message } = useSelector(state => state.user)
    const body = useRef()
    const navigate = useNavigate()
    const initialRender = useRef(true)
    const [isUpdateName, setIsUpdateName] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: ''
    })

    useEffect(() => {
        document.title = titlePage
        const token = window.localStorage.getItem('accessToken')
        if (!token) {
            navigate(path.LOGIN)
        }
        else {
            let tokenDecoded = jwt_decode(token)
            setNewUser({
                firstName: tokenDecoded?.firstName,
                lastName: tokenDecoded?.lastName,
            })
            setCurrentUser({
                firstName: tokenDecoded?.firstName,
                lastName: tokenDecoded?.lastName,
                email: tokenDecoded?.email
            })
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
                    top: body.current.offsetTop - 100
                });
            }
        }
    }, [body.current])

    useEffect(() => {
        if (message) {
            toast.success((
                <span className='fw-light' style={{ fontSize: 14, fontFamily: 'serif' }}>
                    {message}
                </span>
            ), { autoClose: 3000 })
            setCurrentUser({
                ...currentUser,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            })
            dispatch(actions.refreshStateMessage())
        }
    }, [message])

    const handleSave = () => {
        dispatch(actions.updateName({
            firstName: newUser.firstName,
            lastName: newUser.lastName
        }))
        console.log(message)
        setIsUpdateName(!isUpdateName)
    }

    return (
        <>
            <Navbar />
            <Banner categoryProduct='Trang khách hàng' title='Trang khách hàng' />
            <div ref={body} className='account'>
                <div className='account-body p-5'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3'>
                                <div className='list-option'>
                                    <Account activeType={'infor'} />
                                </div>
                            </div>
                            <div className='col-9'>
                                <div className='list-option-select'>
                                    <h5 className='text-uppercase mb-2'>Thông tin tài khoản</h5>
                                    <p className='mt-0'>
                                        <span className='fw-500'>Họ tên: </span>
                                        {`${currentUser?.firstName} ${currentUser?.lastName}`}
                                        <FontAwesomeIcon
                                            data-toggle="tooltip"
                                            title='Sửa'
                                            className='ps-4'
                                            style={{ cursor: 'pointer' }}
                                            icon={faPen}
                                            onClick={() => setIsUpdateName(!isUpdateName)}
                                        />
                                    </p>
                                    {
                                        isUpdateName ?
                                            <>
                                                <FloatingLabel
                                                    controlId="floatingInput" label="Họ" className="mb-3 p-0">
                                                    <Form.Control
                                                        value={newUser.firstName}
                                                        type="text"
                                                        placeholder="Họ"
                                                        onChange={(e) => setNewUser({
                                                            ...newUser,
                                                            firstName: e.target.value
                                                        })}
                                                    />
                                                </FloatingLabel>
                                                <FloatingLabel controlId="floatingLastName" label="Tên">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Tên"
                                                        value={newUser.lastName}
                                                        onChange={(e) => setNewUser({
                                                            ...newUser,
                                                            lastName: e.target.value
                                                        })}
                                                    />
                                                </FloatingLabel>
                                                <div className='my-3'>
                                                    <button
                                                        className='btn border fw-500 me-2'
                                                        onClick={() => setIsUpdateName(!isUpdateName)}
                                                    >Hủy</button>
                                                    <button
                                                        disabled={newUser.firstName === currentUser.firstName && newUser.lastName === currentUser.lastName}
                                                        className='btn btn-root fw-500'
                                                        onClick={handleSave}
                                                    >Lưu</button>
                                                </div>
                                            </>
                                            : ''
                                    }
                                    <p className='mt-0'>
                                        <span className='fw-500'>Email: </span>
                                        {`${currentUser?.email}`}
                                    </p>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(AccountInfor));
