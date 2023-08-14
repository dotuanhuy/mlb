import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './TableUser.scss'
import { Link } from 'react-router-dom';
import { path } from '../../../utils'
import * as actions from '../../../store/actions'
import { useNavigate } from 'react-router-dom';

function TableUsers({users, fetAllUsersRedux, deleteUserRedux}) {
    const navigate = useNavigate()

    useEffect(() => {
        fetAllUsersRedux()
    }, [])

    const handleDeleteUser = (id) => {
        deleteUserRedux(id)
    }

    const handleEdit = (user) => {
        navigate(path.MANAGE_EDIT, {state: user.id})
    }

    return (
        <div className='user-all-system'>
            <div className='user-all-container'>
                <div className='create'>
                    <button className='btn btn-success my-4 btn-add'>
                        <Link to={path.MANAGE_CREATE}>Add</Link>
                    </button>
                </div>
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
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetAllUsersRedux: () => dispatch(actions.fetAllUsers()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableUsers);
