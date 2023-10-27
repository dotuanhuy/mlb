import React, { useEffect, memo } from 'react';
import {Routes, Route, redirect, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from '.././utils'
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Logout from '../components/Logout/Logout';


function AuthRoute({isLogin}) {

    return (
        <>
            <Routes>
                <Route path={path.LOGIN} element={<Login />}/>
                <Route path={path.REGISTER} element={<Register />}/>
                <Route path={path.LOG_OUT} element={<Logout />}></Route>
            </Routes>
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(AuthRoute));
