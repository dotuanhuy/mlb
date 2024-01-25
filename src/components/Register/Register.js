import React, { useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../HomePage/Navbar/Navbar';
import './Register.scss'
import { Link } from 'react-router-dom';
import { socialLogin } from '../../utils/images';
import { path, Role } from '../../utils'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom';
import { validate } from '../../validate/valiedate';

const inintState = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    roleId: Role.USER,
}

const inforUserNotValue = {
    address: '',
    gender: '',
    avatar: ''
}

function Register({createNewUserRedux}) {
    const [inforUser, setInforUser] = useState(inintState)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    
    const handleRegister = (e) => {
        e.preventDefault()
        let error = validate(inforUser)
        setErrors(error)
        if (Object.keys(error).length === 0) {
            let newInfoUser = { ...inforUser, ...inforUserNotValue }
            createNewUserRedux(newInfoUser)
            navigate('/login')
        }
        
    }

    return (
        <div className='container-not'>
            <Navbar />  
            <div className='register'>
                <div className='register-container'>
                    <div className='register-header'>
                        <div className='title'>
                            ĐĂNG Ký TÀI KHOẢN
                        </div>
                        <ul className='list-link'>
                            <li className='item-link-home'>
                                <Link to='/'>Trang chủ</Link>
                            </li>
                            <li>
                                <span>Đăng ký tài khoản</span>
                            </li>
                        </ul>
                    </div>
                    <div className='register-box'>
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
                                <form className='p-4'>
                                    <div className="form-group pb-4">
                                        <label className='label-input' htmlFor="exampleInputFirstName">HỌ*</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="exampleInputFirstName" 
                                            placeholder="Nhập Họ" 
                                            value={inforUser.firstName}
                                            onChange={(e) => {
                                                setErrors({})
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
                                        <label className='label-input' htmlFor="exampleInputLastName">TÊN*</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="exampleInputLastName" 
                                            placeholder="Nhập Tên" 
                                            value={inforUser.lastName}
                                            onChange={(e) => {
                                                setErrors({})
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
                                        <label className='label-input' htmlFor="exampleInputphone">SỐ ĐIỆN THOẠI*</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="exampleInputphone" 
                                            placeholder="Nhập Số điện thoại" 
                                            value={inforUser.phone}
                                            onChange={(e) =>  {
                                                setErrors({})
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
                                        <label className='label-input' htmlFor="exampleInputEmail1">EMAIL*</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="exampleInputEmail1" 
                                            aria-describedby="emailHelp" 
                                            placeholder="Nhập Địa chỉ Email" 
                                            value={inforUser.email}
                                            onChange={(e) => {
                                                setErrors({})
                                                setInforUser({
                                                    ...inforUser,
                                                    email: e.target.value
                                                })
                                            }}
                                        />
                                        {
                                            errors && errors.email ? <span className='error'>{errors.email}</span> : ''
                                        }  
                                    </div>
                                    <div className="form-group pb-4">
                                        <label className='label-input' htmlFor="exampleInputPassword1">MẬT KHẨU*</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="exampleInputPassword1" 
                                            placeholder="Nhập Mật khẩu" 
                                            value={inforUser.password}
                                            onChange={(e) => {
                                                setErrors({})
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
                                <div className='line-break'>
                                    <span>hoặc đăng nhập qua</span>
                                </div>
                                <div className='social-register'>
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

    }
}

const mapDispatchToProps = dispatch => {
    return {
        createNewUserRedux: (data) => dispatch(actions.register(data)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
