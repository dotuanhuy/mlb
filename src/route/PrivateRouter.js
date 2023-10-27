import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { MutatingDots } from 'react-loader-spinner'


function PrivateRouter({users, isLogin, accessToken, Component}) {
    
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
        accessToken: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(PrivateRouter));
