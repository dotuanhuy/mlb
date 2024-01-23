import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './TableUser.scss'
import { Link, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils'
import * as actions from '../../../store/actions'
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/common/Loading/Loading'
import Pagination from '../../Paginations/Pagination';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'react-bootstrap';

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
    const [show, setShow] = useState({});

    const handleClose = () => setShow({});
    const handleShow = (id) => setShow({id})

    console.log(show)

    useEffect(() => {
        refreshIsloadingStateRedux()
        // fetAllUsersRedux(accessToken)
        getLimitUsersRedux(params?.get('page') ? params?.get('page') : 1, accessToken)
    }, [])

    useEffect(() => {
        getLimitUsersRedux(params?.get('page') ? params?.get('page') : 1, accessToken)
    }, [params?.get('page')])

    const handleDeleteUser = (id) => {
        deleteUserRedux(id, accessToken, params.get('page') ? params.get('page') : 1)
    }

    const handleEdit = (user) => {
        navigate(
            path.MANAGE_USER_EDIT, 
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
                    <div className='user-all-table'>
                        <table className="customers table-light table">
                            <thead>
                                <tr>
                                    <th scope='col'>Id</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>RoleId</th>
                                    <th>Detail</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    users && users.length > 0 &&
                                    users.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td scope='row'>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.roleId}</td>
                                                <td>
                                                    <Link 
                                                        className='btn text-info'
                                                        to={path.MANAGE_USER_DETAIL}
                                                        state={{ 
                                                            userId: item.id
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Link>
                                                </td>     
                                                <td>
                                                    <button 
                                                        className='btn text-primary btn-edit'
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button 
                                                        // className='btn btn-outline-dàner btn-delete'
                                                        className='btn text-danger btn-delete'
                                                        onClick={() => handleShow(item.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                    <Modal show={show?.id === item.id || false} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Delete a user</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Are you sure delete user "{item.email}"</Modal.Body>
                                                        <Modal.Footer>
                                                            <button className='btn btn-secondary' onClick={handleClose}>
                                                                Close
                                                            </button>
                                                            <button 
                                                                className='btn btn-root' 
                                                                onClick={() => handleDeleteUser(item.id)}
                                                            >
                                                                Yes
                                                            </button>
                                                        </Modal.Footer>
                                                    </Modal> 
                                                </td>                                                  
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> 
                    <Pagination pathPage={pathPage} currentPage={params.get('page') || 1} />
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
