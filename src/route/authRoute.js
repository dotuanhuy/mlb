import React, { memo } from 'react';
import {Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from '.././utils'
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Logout from '../components/Logout/Logout';
import LoginSuccess from '../components/Login/loginSuccess';
import VerifyOtp from '../components/common/verifys/VerifyOtp';


function AuthRoute() {

    return (
        <>
            <Routes>
                <Route path={path.LOGIN} element={<Login titlePage='Đăng nhập' />}/>
                <Route path={path.REGISTER} element={<Register titlePage='Đăng ký' />}/>
                <Route path={path.LOGIN_SUCCESS} element={<LoginSuccess />} />
                <Route path={path.LOG_OUT} element={<Logout titlePage='Đăng xuất'/>}></Route>
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
