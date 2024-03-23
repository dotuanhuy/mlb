import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../common/Loading/Loading'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '../../Paginations/Pagination';
import * as actions from '../../../store/actions'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

function TableDicount() {
    const dispatch = useDispatch()
    const { discounts, isLoading } = useSelector(state => state.discount)
    const [params] = useSearchParams()
    const [show, setShow] = useState({})
    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(actions.getLimitDiscount(params?.get('page') ? params?.get('page') : 1))
    }, [params?.get('page')])

    const handleClose = () => setShow({});
    const handleShow = (id) => setShow({id})

    const handleEdit = (item) => {
        navigate(
            {
                pathname: path.MANAGE_DISCOUNT_EDIT, 
                search: createSearchParams({id: item?.id, page: params.get('page') ? params.get('page') : 1}).toString(),
            }
        )
    }

    const handleDeleteDiscount = (id) => {
        if (id) {
            dispatch(actions.deleteDiscount({id, page: params.get('page') ? params.get('page') : 1}))
        }
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
                                    <th>Code</th>
                                    <th>Value</th>
                                    <th>Description</th>
                                    <th>Create at</th>
                                    <th>Update at</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    discounts && discounts.length > 0 &&
                                    discounts.map((item, index) => {
                                        const page = params?.get('page') ? params?.get('page') : 1
                                        return (
                                            <tr key={index}>
                                                <td scope='row'>{item.id}</td>
                                                <td>{item.code}</td>
                                                <td>{item.value*100}%</td>
                                                <td>{item.description}</td>
                                                <td>{item.createdAt}</td>
                                                <td>{item.updatedAt}</td>
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
                                                            <Modal.Title>Delete discount</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Are you sure delete discount code "{item.code}"</Modal.Body>
                                                        <Modal.Footer>
                                                            <button className='btn btn-secondary' onClick={handleClose}>
                                                                Close
                                                            </button>
                                                            <button
                                                                className='btn btn-root fw-500'
                                                                onClick={() => handleDeleteDiscount(item.id)}
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
                    <Pagination pathPage={pathname} currentPage={params.get('page') || 1} />
                </div>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableDicount);
