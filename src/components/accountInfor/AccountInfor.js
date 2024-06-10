import React, { useEffect, useState, memo, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Navbar from '../HomePage/Navbar/Navbar';
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';
import Account from '../common/AccountSideBar/Account';
import Banner from '../common/Banners/Banner';
import { FloatingLabel, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { GENDERS, KEY_AES, path } from '../../utils';
import * as actions from '../../store/actions'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AES, enc } from 'crypto-js';
import { validate } from '../../validate/valiedate';
import DatePicker from "react-datepicker";
import moment from 'moment';
import Select from 'react-select';

function AccountInfor({ titlePage }) {
    const dispatch = useDispatch()
    const { message, errCode } = useSelector(state => state.user)
    const body = useRef()
    const navigate = useNavigate()
    const initialRender = useRef(true)
    const [isUpdateName, setIsUpdateName] = useState(false)
    const [isUpdatePhone, setIsUpdatePhone] = useState(false)
    const [isUpdateBirthDate, setIsUpdateBirthDate] = useState(false)
    const [isUpdateSex, setIsUpdateSex] = useState(false)
    const [isUpdateAddress, setIsUpdateAddress] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        gender: '',
        address: ''
    })
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        phone: '',
        gender: '',
        address: ''
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        document.title = titlePage
        const infoUser = Cookies.get('info')
        if (!infoUser) {
            navigate(path.LOGIN)
        }
        else {
            const infoDecoded = JSON.parse(AES.decrypt(infoUser, KEY_AES).toString(enc.Utf8))
            setNewUser({
                firstName: infoDecoded?.firstName,
                lastName: infoDecoded?.lastName,
                phone: infoDecoded.phone,
                gender: infoDecoded.gender,
                address: infoDecoded.address,
                birthDate: infoDecoded.birthDate
            })
            setCurrentUser(infoDecoded)
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
            if (errCode === 0) {
                toast.success((
                    <span className='fw-light' style={{ fontSize: 14, fontFamily: 'serif' }}>
                        {message}
                    </span>
                ), { autoClose: 3000 })
            }
            else {
                toast.error((
                    <span className='fw-light' style={{ fontSize: 14, fontFamily: 'serif' }}>
                        {message}
                    </span>
                ), { autoClose: 3000 })
            }
            setCurrentUser({
                ...currentUser,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phone: newUser.phone,
                birthDate: newUser.birthDate,
                gender: newUser.gender,
                address: newUser.address
            })
            dispatch(actions.refreshStateMessage())
        }
    }, [message])

    const handleSave = () => {
        const error = validate(newUser)
        if (error) {
            setErrors(error)
        }
        if (Object.keys(error).length === 0) {
            dispatch(actions.updateInfoUser(newUser))
        }
    }

    return (
        <>
            <Navbar />
            <Banner categoryProduct='Trang khách hàng' title='Trang khách hàng' />
            <div ref={body} className='account'>
                <div className='account-body p-5'>
                    <div className='container'>
                        <div className='row'>
                            <Account activeType={'infor'} />
                            <div className='col-9 border rounded'>
                                <div className='p-3'>
                                    <p className='mb-2 fs-18 fw-500'>Thông tin tài khoản</p>
                                    <div>
                                        <div className='d-flex justify-content-between'>
                                            <div className='col-4'>
                                                <span className='fw-500 text-muted'>Họ tên</span>
                                            </div>
                                            <div className='col-8'>
                                                {currentUser?.firstName ? currentUser?.firstName : 'None'} {currentUser?.lastName ? currentUser?.lastName : 'None'}
                                                <FontAwesomeIcon
                                                    data-toggle="tooltip"
                                                    title='Sửa'
                                                    className='ps-4 fs-14'
                                                    style={{ cursor: 'pointer' }}
                                                    icon={faPen}
                                                    onClick={() => {
                                                        setIsUpdateName(!isUpdateName)
                                                        setNewUser({
                                                            ...newUser,
                                                            firstName: currentUser.firstName,
                                                            lastName: currentUser.lastName
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {
                                            isUpdateName ?
                                                <div className='mt-2'>
                                                    <FloatingLabel
                                                        controlId="floatingInput" label="Họ" className="mb-3 p-0">
                                                        <Form.Control
                                                            value={newUser.firstName}
                                                            type="text"
                                                            placeholder="Họ"
                                                            onChange={(e) => setNewUser({
                                                                ...newUser,
                                                                firstName: e.target.value.trim()
                                                            })}
                                                        />
                                                    </FloatingLabel>
                                                    {
                                                        errors && errors.firstName ? <span className='error'>{errors.firstName}</span> : ''
                                                    }
                                                    <FloatingLabel controlId="floatingLastName" label="Tên">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Tên"
                                                            value={newUser.lastName}
                                                            onChange={(e) => setNewUser({
                                                                ...newUser,
                                                                lastName: e.target.value.trim()
                                                            })}
                                                        />
                                                    </FloatingLabel>
                                                    {
                                                        errors && errors.lastName ? <span className='error'>{errors.gender}</span> : ''
                                                    }
                                                    <div className='my-3'>
                                                        <button
                                                            className='btn border fw-500 me-2'
                                                            onClick={() => {
                                                                setIsUpdateName(!isUpdateName)
                                                                setNewUser({
                                                                    ...newUser,
                                                                    firstName: currentUser.firstName,
                                                                    lastName: currentUser.lastName
                                                                })
                                                                setErrors({
                                                                    ...errors,
                                                                    firstName: '',
                                                                    lastName: ''
                                                                })
                                                            }}
                                                        >Hủy</button>
                                                        <button
                                                            disabled={newUser.firstName === currentUser.firstName && newUser.lastName === currentUser.lastName}
                                                            className='btn btn-root fw-500'
                                                            onClick={handleSave}
                                                        >Lưu</button>
                                                    </div>
                                                </div>
                                                : ''
                                        }
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <div className='d-flex justify-content-between'>
                                            <div className='col-4'>
                                                <span className='fw-500 text-muted'>Email</span>
                                            </div>
                                            <div className='col-8'>
                                                {currentUser?.email ? currentUser?.email : 'None'}
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <div className='d-flex justify-content-between'>
                                            <div className='col-4'>
                                                <span className='fw-500 text-muted'>Số điện thoại</span>
                                            </div>
                                            <div className='col-8'>
                                                {currentUser.phone ? currentUser.phone : 'None'}
                                                <FontAwesomeIcon
                                                    data-toggle="tooltip"
                                                    title='Sửa'
                                                    className='ps-4 fs-14'
                                                    style={{ cursor: 'pointer' }}
                                                    icon={faPen}
                                                    onClick={() => {
                                                        setIsUpdatePhone(!isUpdatePhone)
                                                        setNewUser({
                                                            ...newUser,
                                                            phone: currentUser.phone
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {
                                            isUpdatePhone ?
                                                <div className='mt-2'>
                                                    <FloatingLabel
                                                        controlId="floatingInput" label="Số điện thoại" className="mb-3 p-0">
                                                        <Form.Control
                                                            value={newUser.phone ? newUser.phone : 'None'}
                                                            type="text"
                                                            placeholder="Số điện thoại"
                                                            onChange={(e) => {
                                                                setNewUser({
                                                                    ...newUser,
                                                                    phone: e.target.value.trim()
                                                                })
                                                                setErrors({
                                                                    ...errors,
                                                                    phone: ''
                                                                })
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                    {
                                                        errors && errors.phone ? <span className='error'>{errors.phone}</span> : ''
                                                    }
                                                    <div className='my-3'>
                                                        <button
                                                            className='btn border fw-500 me-2'
                                                            onClick={() => {
                                                                setIsUpdatePhone(!isUpdatePhone)
                                                                setNewUser({
                                                                    ...newUser,
                                                                    phone: currentUser.phone
                                                                })
                                                                setErrors({
                                                                    ...errors,
                                                                    phone: '',
                                                                })
                                                            }}
                                                        >Hủy</button>
                                                        <button
                                                            disabled={newUser.phone === currentUser.phone}
                                                            className='btn btn-root fw-500'
                                                            onClick={handleSave}
                                                        >Lưu</button>
                                                    </div>
                                                </div>
                                                : ''
                                        }
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <div className='d-flex justify-content-between'>
                                            <div className='col-4'>
                                                <span className='fw-500 text-muted'>Ngày sinh</span>
                                            </div>
                                            <div className='col-8'>
                                                {currentUser.birthDate ? currentUser.birthDate : 'None'}
                                                <FontAwesomeIcon
                                                    data-toggle="tooltip"
                                                    title='Sửa'
                                                    className='ps-4 fs-14'
                                                    style={{ cursor: 'pointer' }}
                                                    icon={faPen}
                                                    onClick={() => {
                                                        setIsUpdateBirthDate(!isUpdateBirthDate)
                                                        setNewUser({
                                                            ...newUser,
                                                            birthDate: currentUser.birthDate
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {
                                            isUpdateBirthDate ?
                                                <div className='mt-2'>
                                                    <DatePicker
                                                        className='border rounded py-1 px-2'
                                                        placeholderText='dd/MM/yyyy'
                                                        dateFormat="dd/MM/yyyy"
                                                        selected={moment(newUser.birthDate, 'DD/MM/YYYY').toDate()}
                                                        onChange={(date) => setNewUser({
                                                            ...newUser,
                                                            birthDate: moment(date).format('DD/MM/YYYY')
                                                        })}
                                                    />
                                                    {
                                                        errors && errors.birthDate ? <span className='error'>{errors.birthDate}</span> : ''
                                                    }
                                                    <div className='my-3'>
                                                        <button
                                                            className='btn border fw-500 me-2'
                                                            onClick={() => {
                                                                setIsUpdateBirthDate(!isUpdateBirthDate)
                                                                setNewUser({
                                                                    ...newUser,
                                                                    birthDate: currentUser.birthDate
                                                                })
                                                                setErrors({
                                                                    ...errors,
                                                                    birthDate: '',
                                                                })
                                                            }}
                                                        >Hủy</button>
                                                        <button
                                                            disabled={newUser.birthDate === currentUser.birthDate}
                                                            className='btn btn-root fw-500'
                                                            onClick={handleSave}
                                                        >Lưu</button>
                                                    </div>
                                                </div>
                                                : ''
                                        }
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <div className='d-flex justify-content-between'>
                                            <div className='col-4'>
                                                <span className='fw-500 text-muted'>Giới tính</span>
                                            </div>
                                            <div className='col-8'>
                                                {currentUser.gender ? currentUser.gender : 'None'}
                                                <FontAwesomeIcon
                                                    data-toggle="tooltip"
                                                    title='Sửa'
                                                    className='ps-4 fs-14'
                                                    style={{ cursor: 'pointer' }}
                                                    icon={faPen}
                                                    onClick={() => {
                                                        setIsUpdateSex(!isUpdateSex)
                                                        setNewUser({
                                                            ...newUser,
                                                            gender: currentUser.gender
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {
                                            isUpdateSex ?
                                                <div className='mt-2'>
                                                    <Select
                                                        placeholder="Chọn giới tính"
                                                        value={newUser.gender ? {
                                                            value: newUser.gender,
                                                            label: newUser.gender
                                                        } : ''}
                                                        onChange={(select) => setNewUser({
                                                            ...newUser,
                                                            gender: select.value
                                                        })}
                                                        options={GENDERS}
                                                    />
                                                    {
                                                        errors && errors.gender ? <span className='error'>{errors.gender}</span> : ''
                                                    }
                                                    <div className='my-3'>
                                                        <button
                                                            className='btn border fw-500 me-2'
                                                            onClick={() => {
                                                                setIsUpdateSex(!isUpdateSex)
                                                                setNewUser({
                                                                    ...newUser,
                                                                    gender: currentUser.gender
                                                                })
                                                                setErrors({
                                                                    ...errors,
                                                                    gender: '',
                                                                })
                                                            }}
                                                        >Hủy</button>
                                                        <button
                                                            disabled={newUser.gender === currentUser.gender}
                                                            className='btn btn-root fw-500'
                                                            onClick={handleSave}
                                                        >Lưu</button>
                                                    </div>
                                                </div>
                                                : ''
                                        }
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <div className='d-flex justify-content-between'>
                                            <div className='col-4'>
                                                <span className='fw-500 text-muted'>Địa chỉ nhận hàng</span>
                                            </div>
                                            <div className='col-8'>
                                                {currentUser.address ? currentUser.address : 'None'}
                                                <FontAwesomeIcon
                                                    data-toggle="tooltip"
                                                    title='Sửa'
                                                    className='ps-4 fs-14'
                                                    style={{ cursor: 'pointer' }}
                                                    icon={faPen}
                                                    onClick={() => {
                                                        setIsUpdateAddress(!isUpdateAddress)
                                                        setNewUser({
                                                            ...newUser,
                                                            address: currentUser.address.trim()
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {
                                            isUpdateAddress ?
                                                <div className='mt-2'>
                                                    <FloatingLabel
                                                        controlId="floatingInput" label="Địa chỉ nhận hàng" className="mb-3 p-0">
                                                        <Form.Control
                                                            value={newUser.address}
                                                            type="text"
                                                            placeholder="Địa chỉ nhận hàng"
                                                            onChange={(e) => setNewUser({
                                                                ...newUser,
                                                                address: e.target.value
                                                            })}
                                                        />
                                                    </FloatingLabel>
                                                    {
                                                        errors && errors.address ? <span className='error'>{errors.address}</span> : ''
                                                    }
                                                    <div className='my-3'>
                                                        <button
                                                            className='btn border fw-500 me-2'
                                                            onClick={() => {
                                                                setIsUpdateAddress(!isUpdateAddress)
                                                                setNewUser({
                                                                    ...newUser,
                                                                    address: currentUser.address
                                                                })
                                                                setErrors({
                                                                    ...errors,
                                                                    address: '',
                                                                })
                                                            }}
                                                        >Hủy</button>
                                                        <button
                                                            disabled={newUser.address === currentUser.address}
                                                            className='btn btn-root fw-500'
                                                            onClick={handleSave}
                                                        >Lưu</button>
                                                    </div>
                                                </div>
                                                : ''
                                        }
                                    </div>
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
