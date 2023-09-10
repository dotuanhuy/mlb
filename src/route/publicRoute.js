import React, { useEffect, memo } from 'react';
import {Routes, Route, redirect, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from '.././utils'
import HomePage from '../components/HomePage/HomePage';
import Shoes from '../components/Products/ShoesList/Shoes';



function PublicRoute({isLogin, isAdmin}) {

    return (
        <>
            <Routes>
                <Route path={path.HOMEPAGE} element={<HomePage />}/> 
                <Route path={path.GIAY_MLB} element={<Shoes />} />
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(PublicRoute));
