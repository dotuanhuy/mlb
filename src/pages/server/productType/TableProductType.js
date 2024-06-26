import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useLocation, useSearchParams } from 'react-router-dom';
import { formatDateVN, path } from '../../../utils'
import * as actions from '../../../store/actions'
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/loading/Loading'
import Pagination from '../../../components/pagination/Pagination';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'react-bootstrap';

function TableProductType({ textSearch }) {
    const dispatch = useDispatch()
    const { productTypes, isLoading } = useSelector(state => state.productType)
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [show, setShow] = useState({})
    const { pathname } = useLocation()

    const handleClose = () => setShow({});
    const handleShow = (id) => setShow({ id })

    useEffect(() => {
        dispatch(actions.refreshStoreProductType())
    }, [])

    useEffect(() => {
        if (textSearch) {
            dispatch(actions.getLimitProductTypesByName(params?.get('page') || 1, textSearch))
        }
        else if (params?.get('page')) {
            dispatch(actions.getLimitProductTypes(params?.get('page') || 1))
        }
    }, [params?.get('page')])

    const handleDeleteProductType = (id) => {
        dispatch(actions.deleteProductType(id, params.get('page') || 1))
    }

    const handleEdit = (product) => {
        navigate(
            {
                pathname: path.MANAGE_PRODUCT_TYPE_UPDATE,
                search: createSearchParams({ id: product.id, page: params.get('page') ? params.get('page') : 1 }).toString(),
            }
        )
    }

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <div className=''>
                        <div className=''>
                            <table className="customers table-light table">
                                <thead>
                                    <tr>
                                        <th scope='col'>ID</th>
                                        <th>Tên</th>
                                        <th>Tên thể loại</th>
                                        <th>Ảnh</th>
                                        <th>Trạng thái</th>
                                        <th>Ngày tạo</th>
                                        <th>Sửa</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productTypes && productTypes.length > 0 &&
                                        productTypes.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td scope='row'>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item?.dataProductTypeCategory?.name}</td>
                                                    <td>
                                                        <div
                                                            style={{
                                                                width: '100%',
                                                                height: '100px',
                                                                backgroundImage: `url(${item.imageRoot})`,
                                                                backgroundPosition: '0% 0%',
                                                                backgroundSize: 'contain',
                                                                backgroundRepeat: 'no-repeat'
                                                            }}
                                                        ></div>
                                                    </td>
                                                    <td>{item.status ? 'Active' : 'Not active'}</td>
                                                    <td>{formatDateVN(item.createdAt)}</td>
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
                                                                <Modal.Title>Xóa kiểu sản phẩm</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>Bạn có chắc xóa kiểu sản phẩm "{item.name}"</Modal.Body>
                                                            <Modal.Footer>
                                                                <button className='btn btn-secondary' onClick={handleClose}>
                                                                    Hủy
                                                                </button>
                                                                <button
                                                                    className='btn btn-root fw-500'
                                                                    onClick={() => handleDeleteProductType(item.id)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableProductType);
