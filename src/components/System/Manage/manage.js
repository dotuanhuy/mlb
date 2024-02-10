import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './manage.scss'
import { Link, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../utils';
import * as actions from '../../../store/actions'
import Sidebar from '../common/sidebars/Sidebar';
import Dashboard from '../dashboards/Dashboard';
import Navbar from '../common/navbar/Navbar';


function Manage({accessToken, fetAllUsersRedux}) {
    const navigate = useNavigate()   
    return (    
        <>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <Dashboard />
                </div>
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
