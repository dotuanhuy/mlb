import React, { useEffect, memo } from 'react';
import {Routes, Route, redirect, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';



function PublicRoute({isLogin, isAdmin}) {

    return (
        <>
            Page is not found
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
