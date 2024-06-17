import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { formatVND } from '../../../utils';
import * as actions from '../../../store/actions'
import { Link, createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../common/Loading/Loading';
import Pagination from '../../Paginations/Pagination';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

function TableProducts({ textSearch, categoryType, actives }) {
    const dispatch = useDispatch()
    const { products, isLoading } = useSelector(state => state.product)
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const { pathname } = useLocation()
    const listRef = useRef()
    const [show, setShow] = useState({})
    const [pathTo, setPathTo] = useState({})

    const handleClose = () => setShow({});
    const handleShow = (id) => setShow({ id })

    useEffect(() => {
        dispatch(actions.refreshIsloadingStateProduct())
    }, [])

    useEffect(() => {
        if (!textSearch) {
            dispatch(actions.getProductByCategoryLimit(categoryType, params?.get('page') ? params?.get('page') : 1))
        }
        else {
            dispatch(actions.findNameProductByCategory(textSearch, categoryType, params.get('page') || 1))
        }
    }, [params?.get('page')])

    useEffect(() => {
        // if (pathname === path.MANAGE_PRODUCTS_SHOES) {
        //     setPathTo({
        //         pathToEdit: path.MANAGE_PRODUCTS_SHOES_EDIT,
        //         pathToDetail: path.MANAGE_PRODUCTS_SHOES_DETAIL
        //     })
        // }
        // else if (pathname === path.MANAGE_PRODUCTS_BAG_BALO) {
        //     setPathTo({
        //         pathToEdit: path.MANAGE_PRODUCTS_BAG_BALO_EDIT,
        //         pathToDetail: path.MANAGE_PRODUCTS_BAG_BALO_DETAIL
        //     })
        // }
        // else if (pathname === path.MANAGE_PRODUCTS_HAT) {
        //     setPathTo({
        //         pathToEdit: path.MANAGE_PRODUCTS_HAT_EDIT,
        //         pathToDetail: path.MANAGE_PRODUCTS_HAT_DETAIL
        //     })
        // }
        // else if (pathname === path.MANAGE_PRODUCTS_CLOTHES) {
        //     setPathTo({
        //         pathToEdit: path.MANAGE_PRODUCTS_CLOTHES_EDIT,
        //         pathToDetail: path.MANAGE_PRODUCTS_CLOTHES_DETAIL
        //     })
        // }
        dispatch(actions.refreshIsloadingStateProduct())
        dispatch(actions.getProductByCategoryLimit(categoryType, params?.get('page') || 1))
    }, [categoryType])

    const handleDeleteProduct = (id) => {
        dispatch(actions.deleteProduct(id, categoryType, params.get('page') || 1), 'single')
    }

    const handleEdit = (id) => {
        navigate({
            pathname: actives.pathToEdit,
            search: createSearchParams({
                id,
                page: params.get('page') || 1
            }).toString()
        })
    }

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <div ref={listRef} className='products-all-system'>
                        <div className='products-all-table'>
                            <table className="table table-light">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th style={{ width: '200px' }}>Tên</th>
                                        <th>Mã</th>
                                        <th>Giá gốc</th>
                                        <th>Giá bán</th>
                                        <th>Ảnh gốc</th>
                                        <th>Chi tiết</th>
                                        <th>Sửa</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products && products.length > 0 &&
                                        products.map((item, index) => {
                                            let page = params?.get('page') ? params?.get('page') : 1
                                            return (
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td style={{
                                                        maxWidth: '200px',
                                                        whiteSpace: 'nowrap', /* Ngăn văn bản xuống dòng */
                                                        overflow: 'hidden', /* Ẩn phần văn bản thừa */
                                                        textOverflow: 'ellipsis', /* Thêm dấu ba chấm */
                                                    }}>{item.name}</td>
                                                    <td>{item.code}</td>
                                                    <td>{formatVND(item.originalPrice)}</td>
                                                    <td>{formatVND(item.price)}</td>
                                                    <td>
                                                        <div
                                                            style={{
                                                                width: '50px',
                                                                height: '100px',
                                                                backgroundImage: `url(${item.image})`,
                                                                backgroundPosition: '0% 0%',
                                                                backgroundSize: 'contain',
                                                                backgroundRepeat: 'no-repeat'
                                                            }}
                                                        ></div>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            className='btn text-info'
                                                            to={`${actives.pathToDetail}?id=${item.id}&page=${page}`}
                                                        >
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className='btn text-primary btn-edit'
                                                            onClick={() => handleEdit(item.id)}
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
                                                                <Modal.Title>Xóa sản phẩm</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>Bạn có chắc muốn xóa "{item.name}"</Modal.Body>
                                                            <Modal.Footer>
                                                                <button className='btn btn-secondary' onClick={handleClose}>
                                                                    Hủy
                                                                </button>
                                                                <button
                                                                    className='btn btn-root fw-500'
                                                                    onClick={() => handleDeleteProduct(item.id)}
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
                    </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(TableProducts);
