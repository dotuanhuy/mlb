import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './TableUser.scss'
import { Link, createSearchParams, useSearchParams } from 'react-router-dom';
import { path } from '../../../../utils'
import * as actions from '../../../../store/actions'
import { useNavigate } from 'react-router-dom';
import Loading from '../../../common/Loading/Loading'
import Pagination from '../../../Paginations/Pagination';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'react-bootstrap';

function TableCategory({
    pathPage,
    users, 
    isLoading, 
    refreshIsloadingStateRedux, 
    getLimitUsersRedux,
    deleteUserRedux
}) {
    const accessToken = window.localStorage.getItem('accessToken')
    const navigate = useNavigate()   
    const [params] = useSearchParams()
    const [show, setShow] = useState({});

    const handleClose = () => setShow({});
    const handleShow = (id) => setShow({id})

    useEffect(() => {
        refreshIsloadingStateRedux()
        getLimitUsersRedux(params?.get('page') ? params?.get('page') : 1)
    }, [])

    useEffect(() => {
        getLimitUsersRedux(params?.get('page') ? params?.get('page') : 1)
    }, [params?.get('page')])

    const handleDeleteUser = (id) => {
        deleteUserRedux(id, params.get('page') ? params.get('page') : 1)
    }

    const handleEdit = (user) => {
        navigate(
            {
                pathname: path.MANAGE_USER_EDIT, 
                search: createSearchParams({id: user.id, page: params.get('page') ? params.get('page') : 1}).toString(),
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
                                        let page = params?.get('page') ? params?.get('page') : 1
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
                                                        to={`${path.MANAGE_USER_DETAIL}?id=${item.id}&page=${page}`}
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
                                                                className='btn btn-root fw-500' 
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
        isLoading: state.user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteUserRedux: (id, page) => dispatch(actions.deleteUser(id, page)),
        refreshIsloadingStateRedux: () => dispatch(actions.refreshIsloadingState()),
        getLimitUsersRedux: (page) => dispatch(actions.getLimitUsers(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableCategory);
