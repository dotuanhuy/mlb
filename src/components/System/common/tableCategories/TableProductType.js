import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, createSearchParams, useLocation, useSearchParams } from 'react-router-dom';
import { formatDateVN, path } from '../../../../utils'
import * as actions from '../../../../store/actions'
import { useNavigate } from 'react-router-dom';
import Loading from '../../../common/Loading/Loading'
import Pagination from '../../../Paginations/Pagination';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'react-bootstrap';
import { Buffer } from 'buffer';

function TableProductType({
    productTypes, 
    accessToken, 
    isLoading, 
    refreshStoreProductTypeRedux, 
    getLimitProductTypesRedux,
    deleteProductTypeRedux
}) {
    const navigate = useNavigate()   
    const [params] = useSearchParams()
    const [show, setShow] = useState({})
    const {pathname} = useLocation()

    const handleClose = () => setShow({});
    const handleShow = (id) => setShow({id})

    useEffect(() => {
        refreshStoreProductTypeRedux()
        getLimitProductTypesRedux(accessToken, params?.get('page') ? params?.get('page') : 1)
    }, [])

    useEffect(() => {
        getLimitProductTypesRedux(accessToken, params?.get('page') ? params?.get('page') : 1)
    }, [params?.get('page')])

    const handleDeleteProductType = (id) => {
        deleteProductTypeRedux(accessToken, id, params.get('page') ? params.get('page') : 1)
    }

    const handleEdit = (product) => {
        navigate(
            {
                pathname: path.MANAGE_PRODUCT_TYPE_UPDATE, 
                search: createSearchParams({id: product.id, page: params.get('page') ? params.get('page') : 1}).toString(),
            }
        )
    }

    console.log(productTypes)

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
                                    <th>Name</th>
                                    <th>Category name</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Date created</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    productTypes && productTypes.length > 0 &&
                                    productTypes.map((item, index) => {
                                        let page = params?.get('page') ? params?.get('page') : 1
                                        let imageBase64 = item.imageRoot ? Buffer.from(item.imageRoot.data, 'base64').toString('binary') : ''
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
                                                            backgroundImage: `url(${imageBase64})`,
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
                                                            <Modal.Title>Delete a product type</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Are you sure delete product type "{item.name}"</Modal.Body>
                                                        <Modal.Footer>
                                                            <button className='btn btn-secondary' onClick={handleClose}>
                                                                Close
                                                            </button>
                                                            <button 
                                                                className='btn btn-root fw-500' 
                                                                onClick={() => handleDeleteProductType(item.id)}
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
        accessToken: state.auth.token,
        productTypes: state.productType.productTypes,
        isLoading: state.productType.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshStoreProductTypeRedux: () => dispatch(actions.refreshStoreProductType()),
        getLimitProductTypesRedux: (accessToken, page) => dispatch(actions.getLimitProductTypes(accessToken, page)),
        deleteProductTypeRedux: (accessToken, id, page) => dispatch(actions.deleteProductType(accessToken, id, page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableProductType);
