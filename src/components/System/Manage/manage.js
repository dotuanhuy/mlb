import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './manage.scss'
import TableUser from '../TableUsers/TableUser';
import Nav from '../nav/nav';
import { useNavigate } from 'react-router-dom';
import { path, Role } from '../../../utils';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const cookies = new Cookies();

function Manage({isLogin}) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!cookies.get('userLogin')) {
            navigate(path.LOGIN)
        }
        else {
            let token = cookies.get('userLogin')
            let loginInfor = jwt_decode(token)
            if (loginInfor.role === Role.USER) {
                navigate(path.HOMEPAGE)
            }
        }
    }, [])
    useEffect(() => {
        if (!cookies.get('userLogin')) {
            navigate(path.LOGIN)
        }
    }, [isLogin])

    return (    
        <div className='manage-system'>
            <div className='manage-container'>
                <Nav />
                <TableUser />
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
