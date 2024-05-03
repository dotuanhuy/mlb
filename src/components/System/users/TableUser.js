import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, createSearchParams, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils'
import * as actions from '../../../store/actions'
import { useNavigate } from 'react-router-dom';
import Loading from '../../common/Loading/Loading'
import Pagination from '../../Paginations/Pagination';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'react-bootstrap';

function TableUsers({
    pathPage,
    isLoading, 
}) {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)
    const navigate = useNavigate()   
    const [params] = useSearchParams()
    const [show, setShow] = useState({});

    const handleClose = () => setShow({});
    const handleShow = (id) => setShow({id})

    useEffect(() => {
        dispatch(actions.refreshIsloadingState())
    }, [])

    useEffect(() => {
        dispatch(actions.getLimitUsers(params?.get('page') ? params?.get('page') : 1))
    }, [params?.get('page')])

    const handleDeleteUser = (id) => {
        dispatch(actions.deleteUser(id, params.get('page') ? params.get('page') : 1))
    }

    const handleEdit = (user) => {
        navigate(
            {
                pathname: path.MANAGE_USER_EDIT, 
                search: createSearchParams({id: user.id, page: params.get('page') ? params.get('page') : 1}).toString(),
            }
        )
    }

    console.log(users);

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
                                    <th scope='col'>ID</th>
                                    <th>Email</th>
                                    <th>Họ và tên</th>
                                    <th>Số điện thoại</th>
                                    <th>Quyền</th>
                                    <th>Chi tiết</th>
                                    <th>Sửa</th>
                                    <th>Xóa</th>
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
                                                <td>{item.firstName} {item.lastName}</td>
                                                <td>{item.phone}</td>
                                                <td>{item?.dataRole?.name}</td>
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
                                                        className='btn text-danger btn-delete'
                                                        onClick={() => handleShow(item.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                    <Modal show={show?.id === item.id || false} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Xóa người dùng</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Bạn có chắc xóa người dùng có email "{item.email}"</Modal.Body>
                                                        <Modal.Footer>
                                                            <button className='btn btn-secondary' onClick={handleClose}>
                                                                Hủy
                                                            </button>
                                                            <button 
                                                                className='btn btn-root fw-500' 
                                                                onClick={() => handleDeleteUser(item.id)}
                                                            >
                                                                Xóa
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
        isLoading: state.user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableUsers);
