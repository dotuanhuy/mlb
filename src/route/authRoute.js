import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from '../utils'
import Login from '../pages/client/login/Login'
import Register from '../pages/client/register/Register';
import LoginSuccess from '../pages/client/login/loginSuccess';
import ForgotPassword from '../pages/client/forgotPassword/ForgotPassword';

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
