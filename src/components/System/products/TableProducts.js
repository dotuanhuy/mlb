import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { path, formatVND } from '../../../utils';
import * as actions from '../../../store/actions'
import { Link, createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {Buffer} from 'buffer';
import Loading from '../../common/Loading/Loading';
import Pagination from '../../Paginations/Pagination';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import { faCommentDots, faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function TableProducts({
    categoryType, 
    actives,
    products, 
    isLoading, 
    getProductByCategoryLimitRedux,
    deleteProductRedux, 
    refreshIsloadingStateProductRedux,
}) {
    const accessToken = window.localStorage.getItem('accessToken')
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const {pathname} = useLocation()
    const listRef = useRef()
    const [show, setShow] = useState({})
    const [pathTo, setPathTo] = useState({})

    const handleClose = () => setShow({});
    const handleShow = (id) => setShow({id})

    useEffect(() => {
        refreshIsloadingStateProductRedux()
    }, [])

    useEffect(() => {
        getProductByCategoryLimitRedux(categoryType, params?.get('page') ? params?.get('page') : 1)
    }, [params?.get('page')])

    useEffect(() => {
        if(pathname === path.MANAGE_PRODUCTS_SHOES) {
            setPathTo({
                pathToEdit: path.MANAGE_PRODUCTS_SHOES_EDIT,
                pathToDetail: path.MANAGE_PRODUCTS_SHOES_DETAIL
            })
        }
        else if (pathname === path.MANAGE_PRODUCTS_BAG_BALO) {
            setPathTo({
                pathToEdit: path.MANAGE_PRODUCTS_BAG_BALO_EDIT,
                pathToDetail: path.MANAGE_PRODUCTS_BAG_BALO_DETAIL
            })
        } 
        else if (pathname === path.MANAGE_PRODUCTS_HAT) {
            setPathTo({
                pathToEdit: path.MANAGE_PRODUCTS_HAT_EDIT,
                pathToDetail: path.MANAGE_PRODUCTS_HAT_DETAIL
            }) 
        }
        else if (pathname === path.MANAGE_PRODUCTS_CLOTHES) {
            setPathTo({
                pathToEdit: path.MANAGE_PRODUCTS_CLOTHES_EDIT,
                pathToDetail: path.MANAGE_PRODUCTS_CLOTHES_DETAIL
            })
        }
        refreshIsloadingStateProductRedux()
        getProductByCategoryLimitRedux(categoryType, params?.get('page') ? params?.get('page') : 1)
        // getAllProductsRedux(typeCategore, accessToken)
        // getLimitProductsRedux(typeCategore, params.get('page') ? params.get('page') : 1, accessToken)
    }, [categoryType])

    // useEffect(() => {
    //     if (params.get('page')) {
    //         getLimitProductsRedux(typeCategore, params.get('page') ? params.get('page') : 1, accessToken)
    //         if (listRef.current) {
    //             window.scrollTo({
    //               behavior: "smooth",
    //               top: listRef.current.offsetTop
    //             });
    //         }
    //     }
    // }, [params.get('page')])
    
    const handleDeleteProduct = (id) => {
        deleteProductRedux(id, categoryType, params.get('page') ? params.get('page') : 1)
    }

    const handleEdit = (id) => {
        navigate({
            pathname: actives.pathToEdit,
            search: createSearchParams({
                id,
                page: params.get('page') ? params.get('page') : 1
            }).toString()
        })
    }


    // const handleAddDescription = (id) => {
    //     // navigate(path.MANAGE_PRODUCTS_DESCRIPTION_ADD, { state: id })
    //     if (typeCategore === categorieType.SHOES_SANDAL) {
    //         navigate(path.MANAGE_PRODUCTS_DESCRIPTION_ADD, {
    //             state: { 
    //                 id, 
    //                 path:  path.MANAGE_PRODUCTS_SHOES,
    //                 pageCurrent: params.get('page') ? params.get('page') : 1
    //             }
    //         })
    //     }
    //     else if (typeCategore === categorieType.BAG_BALO) {
    //         navigate(path.MANAGE_PRODUCTS_DESCRIPTION_ADD, {
    //             state: {  
    //                 id, 
    //                 path: path.MANAGE_PRODUCTS_BAG_BALO,
    //                 pageCurrent: params.get('page') ? params.get('page') : 1 
    //             }
    //         })
    //     }
    //     else if (typeCategore === categorieType.HAT) {
    //         navigate(path.MANAGE_PRODUCTS_DESCRIPTION_ADD, {
    //             state: {  
    //                 id, 
    //                 path: path.MANAGE_PRODUCTS_HAT,
    //                 pageCurrent: params.get('page') ? params.get('page') : 1 
    //             }
    //         })
    //     }
    //     else if (typeCategore === categorieType.CLOTHES) {
    //         navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, {
    //             state: {  
    //                 id, 
    //                 path: path.MANAGE_PRODUCTS_CLOTHES,
    //                 pageCurrent: params.get('page') ? params.get('page') : 1 
    //             }
    //         })
    //     }
    // }

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
                                    <th>Name</th>
                                    <th>Category name</th>
                                    <th>Code</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Logo</th>
                                    <th>Detail</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
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
                                                <td>{item.name}</td>
                                                <td>{item.dataCategoryDetail?.dataCategory?.name}</td>
                                                <td>{item.code}</td>
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
                                                <td>{item.dataLogos?.name}</td>
                                                <td>
                                                    <Link 
                                                        className='btn text-info'
                                                        to={`${actives.pathToDetail}?id=${item.id}&page=${page}`}
                                                        // to={`${pathTo?.pathToDetail}?id=${item.id}&page=${page}`}
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
                                                            <Modal.Title>Delete a product</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Are you sure delete product "{item.name}"</Modal.Body>
                                                        <Modal.Footer>
                                                            <button className='btn btn-secondary' onClick={handleClose}>
                                                                Close
                                                            </button>
                                                            <button 
                                                                className='btn btn-root fw-500' 
                                                                onClick={() => handleDeleteProduct(item.id)}
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
        products: state.product.products,
        isLoading: state.product.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductByCategoryLimitRedux:  (type, offset) => dispatch(actions.getProductByCategoryLimit(type, offset)),
        deleteProductRedux: (id, typeCategore, page) => dispatch(actions.deleteProduct(id, typeCategore, page)),
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableProducts);
