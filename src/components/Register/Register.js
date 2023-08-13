import React, { useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../HomePage/Navbar/Navbar';
import './Register.scss'
import { Link } from 'react-router-dom';
import { socialLogin } from '../../utils/images';
import { path } from '../../utils'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom';

const inintState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    address: '',
    gender: '',
    roleId: '',
    avatar: ''
}

function Register({createNewUserRedux}) {
    const [inforUser, setInforUser] = useState(inintState)
    const navigate = useNavigate()
    
    const handleRegister = async (e) => {
        e.preventDefault()
        await createNewUserRedux(inforUser)
        navigate('/login')
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
                                    <div class="form-group pb-4">
                                        <label className='label-input' for="exampleInputFirstName">HỌ*</label>
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            id="exampleInputFirstName" 
                                            placeholder="Nhập Họ" 
                                            value={inforUser.firstName}
                                            onChange={(e) => setInforUser({
                                                ...inforUser,
                                                firstName: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div class="form-group pb-4">
                                        <label className='label-input' for="exampleInputLastName">TÊN*</label>
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            id="exampleInputLastName" 
                                            placeholder="Nhập Tên" 
                                            value={inforUser.lastName}
                                            onChange={(e) => setInforUser({
                                                ...inforUser,
                                                lastName: e.target.value
                                            })}
                                        />
                                    </div>  
                                    <div class="form-group pb-4">
                                        <label className='label-input' for="exampleInputPhoneNumber">SỐ ĐIỆN THOẠI*</label>
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            id="exampleInputPhoneNumber" 
                                            placeholder="Nhập Số điện thoại" 
                                            value={inforUser.phoneNumber}
                                            onChange={(e) => setInforUser({
                                                ...inforUser,
                                                phoneNumber: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div class="form-group pb-4">
                                        <label className='label-input' for="exampleInputEmail1">EMAIL*</label>
                                        <input 
                                            type="email" 
                                            class="form-control" 
                                            id="exampleInputEmail1" 
                                            aria-describedby="emailHelp" 
                                            placeholder="Nhập Địa chỉ Email" 
                                            value={inforUser.email}
                                            onChange={(e) => setInforUser({
                                                ...inforUser,
                                                email: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div class="form-group pb-4">
                                        <label className='label-input' for="exampleInputPassword1">MẬT KHẨU*</label>
                                        <input 
                                            type="password" 
                                            class="form-control" 
                                            id="exampleInputPassword1" 
                                            placeholder="Nhập Mật khẩu" 
                                            value={inforUser.password}
                                            onChange={(e) => setInforUser({
                                                ...inforUser,
                                                password: e.target.value
                                            })}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        class="btn btn-primary w-100 btn-register"
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
        createNewUserRedux: (data) => dispatch(actions.createNewUser(data)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
