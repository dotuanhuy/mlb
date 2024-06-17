import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from '../utils'
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import LoginSuccess from '../components/Login/loginSuccess';
import ForgotPassword from '../components/fofgotPassword/ForgotPassword';

function AuthRoute() {

    return (
        <>
            <Routes>
                <Route path={path.LOGIN} element={<Login titlePage='Đăng nhập' />} />
                <Route path={path.REGISTER} element={<Register titlePage='Đăng ký' />} />
                <Route path={path.LOGIN_SUCCESS} element={<LoginSuccess />} />
                <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword titlePage='Quên mật khẩu' />} />
            </Routes>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(AuthRoute));
