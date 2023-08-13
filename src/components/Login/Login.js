import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../HomePage/Navbar/Navbar';
import './Login.scss'
import { Link } from 'react-router-dom';
import { socialLogin } from '../../utils/images';
import { path } from '../../utils'

function Login() {
    return (
        <div className='container-not'>
            <Navbar />  
            <div className='login'>
                <div className='login-container'>
                    <div className='login-header'>
                        <div className='title'>
                            ĐĂNG NHẬP TÀI KHOẢN
                        </div>
                        <ul className='list-link'>
                            <li className='item-link-home'>
                                <Link to='/'>Trang chủ</Link>
                            </li>
                            <li>
                                <span>Đăng nhập tài khoản</span>
                            </li>
                        </ul>
                    </div>
                    <div className='login-box'>
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
                                    <div class="form-group pb-4">
                                        <label className='label-input' for="exampleInputEmail1">EMAIL*</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập Địa chỉ Email" />
                                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                    <div class="form-group">
                                        <label className='label-input' for="exampleInputPassword1">MẬT KHẨU*</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Nhập Mật khẩu" />
                                    </div>
                                    <div class="form-group py-2">
                                        <label >
                                            <a href='#' class="form-forgot-label" >Quên mật khẩu?</a>
                                        </label>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100 btn-login">ĐĂNG NHẬP</button>
                                    <div className='commit'>
                                        MLB Việt Nam cam kết bảo mật và sẽ không bao giờ đăng
                                        <br></br>
                                        hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
                                    </div>
                                </form>
                                <div className='line-break'>
                                    <span>hoặc đăng nhập qua</span>
                                </div>
                                <div className='social-login'>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
