import React, { useEffect, memo } from 'react';
import {Routes, Route, redirect, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from '.././utils'
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';


function AuthRoute({isLogin, isAdmin}) {

    return (
        <>
            <Routes>
                <Route path={path.LOGIN} element={<Login />}/>
                <Route path={path.REGISTER} element={<Register />}/>
            </Routes>
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        isAdmin: state.auth.isAdmin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(AuthRoute));
