import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './manage.scss'
import TableUser from '../TableUsers/TableUser';
import Nav from '../nav/nav';
import { Link, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../utils';
import * as actions from '../../../store/actions'


function Manage({isLogin, accessToken, fetAllUsersRedux}) {
    const navigate = useNavigate()   
    return (    
        <div className='manage-system'>
            <div className='manage-container'>
                <Nav />
                <div className='create'>
                    <button className='btn btn-success my-4 btn-add'>
                        <Link to={path.MANAGE_CREATE}>Add</Link>
                    </button>
                </div>
                <TableUser pathPage={path.MANAGE}/>
            </div>
        </div>        
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
