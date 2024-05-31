import React, { useEffect, useState, memo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../HomePage/Navbar/Navbar';
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';
import Account from './Account';
import * as actions from '../../store/actions'
import { validate } from '../../validate/valiedate';
import Banner from '../common/Banners/Banner';
import { path, CustomToast } from '../../utils';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const initInforChangePassword = {
    newPassword: '',
    oldPassword: '',
    rePassword: ''
}

function ChangePassword({ titlePage }) {
    const dispatch = useDispatch()
    const { isChangePassword, message } = useSelector(state => state.auth)
    const [inforChangePassword, setInforChangePassword] = useState(initInforChangePassword);
    const [error, setError] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        document.title = titlePage
        dispatch(actions.refreshStateAuth())
    }, [])

    useEffect(() => {
        if (isChangePassword && message) {
            toast.success((
                <span className='fw-light' style={{ fontSize: 14, fontFamily: 'serif' }}>
                    {message}
                </span>
            ), { autoClose: 3000 })
            dispatch(actions.refreshStateAuth())
            dispatch(actions.fetLogout())
            navigate(path.HOMEPAGE)
        }
        else if (!isChangePassword && message) {
            toast.error(CustomToast(message), { autoClose: 3000 })
        }
    }, [isChangePassword, message])

    const handleResetPassword = () => {
        let error = validate(inforChangePassword)
        setError(error)
        if (Object.keys(error).length === 0) {
            dispatch(actions.changePassword(inforChangePassword))
        }
    }

    return (
        <>
            <div className='account'>
                <Navbar />

                <Banner categoryProduct='Thay đổi mật khẩu' title='Trang thay đổi mật khẩu' />
                <div className='account-body p-5'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3'>
                                <div className='list-option'>
                                    <Account activeType={'changePassword'} />
                                </div>
                            </div>
                            <div className='col-9'>
                                <div className='list-option-select'>
                                    <h5>Đổi mật khẩu</h5>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Mật khẩu cũ<span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Nhập mật khẩu cũ"
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
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Mật khẩu mới<span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Nhập mật khẩu mới"
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
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Xác nhận lại mật khẩu mới<span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Nhập lại mật khẩu mới"
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
                                        </Form.Group>
                                    </Form>
                                    <button
                                        type="submit"
                                        className="btn btn-root fw-500"
                                        onClick={handleResetPassword}
                                    >
                                        Đặt lại mật khẩu
                                    </button>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));
