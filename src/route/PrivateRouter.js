import React, { memo, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { MutatingDots } from 'react-loader-spinner'
import axios from "../axios";
import {createAxios} from '../axiosJWT'
import Cookies from 'js-cookie';

function PrivateRouter({users, isLogin, accessToken, Component}) {
    const [isAdmin, setIsAdmin] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post('/api/authentication', { accessToken });
                setIsAdmin(res?.isAdmin)
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error(':');
                navigate('/')
            }
        };
        fetchData()
    }, [])
    if (isAdmin !== null) {
        return ( 
            isAdmin ? <Component /> : <Navigate to='/' />
        );
    }
    return (
        <>Loading.....</>
    )
}

const mapStateToProps = state => {
    return {
        users: state.auth.users,
        isLogin: state.auth.isLogin,
        accessToken: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(PrivateRouter));
