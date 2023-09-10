import React, { useEffect, memo } from 'react';
import {Routes, Route, redirect, useNavigate, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from '.././utils'
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Manage from '../components/System/Manage/manage';


function PrivateRouter({users, isLogin, isAdmin, Component}) {
    return ( 
        // <>
        //     <Route path={path.MANAGE} element={<component />}/>
        // </>
            isLogin ? <Component /> : <Navigate to='/' />
    );
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
        isLogin: state.auth.isLogin,
        isAdmin: state.auth.isAdmin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(PrivateRouter));
