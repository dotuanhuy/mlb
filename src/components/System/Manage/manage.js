import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './manage.scss'
import { Link, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../utils';
import * as actions from '../../../store/actions'
import Sidebar from '../common/sidebars/Sidebar';
import Dashboard from '../dashboards/Dashboard';
import Navbar from '../common/navbar/Navbar';


function Manage({isLogin, accessToken, fetAllUsersRedux}) {
    const navigate = useNavigate()   
    return (    
        // <div className='manage-system'>
        //     <div className='manage-container'>
        //         <Nav />
        //         <div className='create'>
        //             <button className='btn btn-success my-4 btn-add'>
        //                 <Link to={path.MANAGE_USER_CREATE}>Add</Link>
        //             </button>
        //         </div>
        //         <TableUser pathPage={path.MANAGE}/>
        //     </div>
        // </div>     
        
        <>
            <Navbar />
            <div className='row'>
                <Sidebar />
                <Dashboard />
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
