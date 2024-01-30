import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../common/sidebars/Sidebar';
import Navbar from '../common/navbar/Navbar';
import TableUser from '../common/tableUsers/TableUser';
import { path } from '../../../utils';
import { Link } from 'react-router-dom';



function UserManage() {

    return (    
        <>
            <Navbar />
            <div className='row gx-0'>
               <div className='col-2'>
                    <Sidebar active={'user'}/>
                </div> 
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between'>
                        <h2>User</h2>
                        <button className='btn btn-root btn-add py-1'>
                            <Link className='text-white fw-500' to={path.MANAGE_USER_CREATE}>Add new</Link>
                        </button>
                    </div>
                    <hr/>
                    <TableUser pathPage={path.MANAGE_USER}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
