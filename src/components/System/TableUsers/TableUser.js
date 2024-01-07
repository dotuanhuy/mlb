import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './TableUser.scss'
import { Link, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils'
import * as actions from '../../../store/actions'
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/common/Loading/Loading'
import Pagination from '../../Paginations/Pagination';

function TableUsers({
    pathPage,
    users, 
    accessToken, 
    isLoading, 
    refreshIsloadingStateRedux, 
    fetAllUsersRedux, 
    getLimitUsersRedux,
    deleteUserRedux
}) {
    const navigate = useNavigate()   
    const [params] = useSearchParams()
    
    useEffect(() => {
        refreshIsloadingStateRedux()
        // fetAllUsersRedux(accessToken)
        getLimitUsersRedux(params.get('page') ? params.get('page') : 1, accessToken)
    }, [])

    useEffect(() => {
        if (params.get('page')) {
            getLimitUsersRedux(params.get('page') ? params.get('page') : 1, accessToken)
        }
    }, [params.get('page')])

    const handleDeleteUser = (id) => {
        deleteUserRedux(id, accessToken, params.get('page') ? params.get('page') : 1)
    }

    const handleEdit = (user) => {
        navigate(
            path.MANAGE_EDIT, 
            {
                state: {
                    id: user.id, 
                    pageCurrent: (params.get('page') ? params.get('page') : 1)
                }
            }
        )
    }

    return (
        <>
            {
                isLoading ? 
                <Loading />
                :
                <div className='user-all-system'>
                    <div className='user-all-container'>
                        <div className='user-all-table'>
                            <table id="customers">
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Phone number</th>
                                    <th>Address</th>
                                    <th>Gender</th>
                                    <th>RoleId</th>
                                    <th>Actions</th>
                                </tr>
                                { users && users.length > 0 &&
                                    users.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.address}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.roleId}</td>
                                                <td>
                                                    <div className='actions'>
                                                        <button 
                                                            className='btn btn-outline-primary btn-delete'
                                                            onClick={() => handleDeleteUser(item.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button 
                                                            className='btn btn-outline-info btn-edit'
                                                            onClick={() => handleEdit(item)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        </div>
                        
                        <Pagination pathPage={pathPage} currentPage={params.get('page') || 1} />
                    </div>
                </div>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
        accessToken: state.auth.token,
        isLoading: state.user.isLoadingUser

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetAllUsersRedux: (accessToken) => dispatch(actions.fetAllUsers(accessToken)),
        deleteUserRedux: (id, accessToken, page) => dispatch(actions.deleteUser(id, accessToken, page)),
        refreshIsloadingStateRedux: () => dispatch(actions.refreshIsloadingState()),
        getLimitUsersRedux: (page, accessToken) => dispatch(actions.getLimitUsers(page, accessToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableUsers);
