import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './TableProducts.scss'
import { path, categorieType } from '../../../../../utils';
import * as actions from '../../../../../store/actions'
import { useNavigate, useSearchParams } from 'react-router-dom';
import {Buffer} from 'buffer';
import Loading from '../../../../Loading/Loading';
import Pagination from '../../../../Paginations/Pagination';
import { useRef } from 'react';

function TableProducts({
    typeCategore, 
    pathPage,
    products, 
    accessToken, 
    isLoading, 
    getAllProductsRedux, 
    deleteProductRedux, 
    refreshIsloadingStateProductRedux,
    getLimitProductsRedux
}) {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const listRef = useRef()
    
    useEffect(() => {
        refreshIsloadingStateProductRedux()
        // getAllProductsRedux(typeCategore, accessToken)
        getLimitProductsRedux(typeCategore, params.get('page') ? params.get('page') : 1, accessToken)
    }, [])

    useEffect(() => {
        if (params.get('page')) {
            getLimitProductsRedux(typeCategore, params.get('page') ? params.get('page') : 1, accessToken)
            if (listRef.current) {
                window.scrollTo({
                  behavior: "smooth",
                  top: listRef.current.offsetTop
                });
            }
        }
    }, [params.get('page')])
    
    const handleDeleteProduct = (id) => {
        deleteProductRedux(id, typeCategore, accessToken, params.get('page') ? params.get('page') : 1)
    }

    const handleEditProduct = (id) => {
        if (typeCategore === categorieType.SHOES_SANDAL) {
            navigate(path.MANAGE_PRODUCTS_SHOES_EDIT, {
                state: { 
                    id, 
                    typeCategore, 
                    path:  path.MANAGE_PRODUCTS_SHOES,
                    pageCurrent: params.get('page') ? params.get('page') : 1
                }
            })
        }
        else if (typeCategore === categorieType.BAG_BALO) {
            navigate(path.MANAGE_PRODUCTS_BAG_BALO_EDIT, {
                state: { 
                    id, 
                    typeCategore, 
                    path: path.MANAGE_PRODUCTS_BAG_BALO ,
                    pageCurrent: params.get('page') ? params.get('page') : 1
                }
            })
        }
        else if (typeCategore === categorieType.HAT) {
            navigate(path.MANAGE_PRODUCTS_HAT_EDIT, {
                state: { 
                    id, 
                    typeCategore, 
                    path: path.MANAGE_PRODUCTS_HAT ,
                    pageCurrent: params.get('page') ? params.get('page') : 1
                }
            })
        }
        else if (typeCategore === categorieType.CLOTHES) {
            navigate(path.MANAGE_PRODUCTS_CLOTHES_EDIT, {
                state: { 
                    id, 
                    typeCategore, 
                    path: path.MANAGE_PRODUCTS_CLOTHES ,
                    pageCurrent: params.get('page') ? params.get('page') : 1
                }
            })
        }
    }

    const handleAddImage = (product) => {
        // navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, { state: product})
        if (typeCategore === categorieType.SHOES_SANDAL) {
            navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, {
                state: { 
                    product, 
                    path:  path.MANAGE_PRODUCTS_SHOES,
                    pageCurrent: params.get('page') ? params.get('page') : 1
                }
            })
        }
        else if (typeCategore === categorieType.BAG_BALO) {
            navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, {
                state: {  
                    product, 
                    path: path.MANAGE_PRODUCTS_BAG_BALO,
                    pageCurrent: params.get('page') ? params.get('page') : 1
                }
            })
        }
        else if (typeCategore === categorieType.HAT) {
            navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, {
                state: {  
                    product, 
                    path: path.MANAGE_PRODUCTS_HAT,
                    pageCurrent: params.get('page') ? params.get('page') : 1 
                }
            })
        }
        else if (typeCategore === categorieType.CLOTHES) {
            navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, {
                state: {  
                    product, 
                    path: path.MANAGE_PRODUCTS_CLOTHES,
                    pageCurrent: params.get('page') ? params.get('page') : 1 
                }
            })
        }
    }

    const handleAddDescription = (id) => {
        // navigate(path.MANAGE_PRODUCTS_DESCRIPTION_ADD, { state: id })
        if (typeCategore === categorieType.SHOES_SANDAL) {
            navigate(path.MANAGE_PRODUCTS_DESCRIPTION_ADD, {
                state: { 
                    id, 
                    path:  path.MANAGE_PRODUCTS_SHOES,
                    pageCurrent: params.get('page') ? params.get('page') : 1
                }
            })
        }
        else if (typeCategore === categorieType.BAG_BALO) {
            navigate(path.MANAGE_PRODUCTS_DESCRIPTION_ADD, {
                state: {  
                    id, 
                    path: path.MANAGE_PRODUCTS_BAG_BALO,
                    pageCurrent: params.get('page') ? params.get('page') : 1 
                }
            })
        }
        else if (typeCategore === categorieType.HAT) {
            navigate(path.MANAGE_PRODUCTS_DESCRIPTION_ADD, {
                state: {  
                    id, 
                    path: path.MANAGE_PRODUCTS_HAT,
                    pageCurrent: params.get('page') ? params.get('page') : 1 
                }
            })
        }
        else if (typeCategore === categorieType.CLOTHES) {
            navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, {
                state: {  
                    id, 
                    path: path.MANAGE_PRODUCTS_CLOTHES,
                    pageCurrent: params.get('page') ? params.get('page') : 1 
                }
            })
        }
    }

    return (
        <>
            {
                isLoading ? 
                <Loading />
                :
                <div ref={listRef} className='products-all-system'>
                    <div className='products-all-container'>
                        <div className='products-all-table'>
                            <table id="customers">
                                <tr>
                                    <th>ID</th>
                                    <th>CategoreId</th>
                                    <th>Name</th>
                                    <th>ProductCode</th>
                                    <th>Price</th>
                                    <th>DiscountId</th>
                                    <th>Image</th>
                                    <th>Site</th>
                                    <th>Release date</th>
                                    <th>BrandId</th>
                                    <th>List color</th>
                                    <th>LogoId</th>
                                    <th>Material</th>
                                    <th>ListSize</th>
                                    <th>ListGender</th>
                                    <th>Actions</th>
                                </tr>
                                {   
                                    products && products.length > 0 &&
                                    products.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.image) {
                                            imageBase64 = Buffer.from(item.image.data, 'base64').toString('binary')
                                        }
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.categoresId}</td>
                                                <td>{item.name}</td>
                                                <td>{item.productCode}</td>
                                                <td>{item.price}</td>
                                                <td>{item.discountId}</td>
                                                <td>
                                                    <div 
                                                        style={{ 
                                                            width: '140px', 
                                                            height: '100px',
                                                            backgroundImage: `url(${imageBase64})`,
                                                            backgroundPosition: '0% 0%',
                                                            backgroundSize: 'contain',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}
                                                    ></div>
                                                </td>
                                                <td>{item.productionSite}</td>
                                                <td>{item.releaseDate}</td>
                                                <td>{item.brandId}</td>
                                                <td>                                          
                                                    <div 
                                                        style={{ wordWrap: 'break-word', width: '120px'}}
                                                    >
                                                        {item.listColor}
                                                    </div>
                                                </td>
                                                <td>{item.logoId}</td>
                                                <td>{item.material}</td>
                                                <td>
                                                    <div 
                                                        style={{ wordWrap: 'break-word', width: '100px'}}
                                                    >
                                                        {item.listSize}
                                                    </div>
                                                </td>
                                                <td>{item.listGender}</td>
                                                <td>
                                                    <div className='action'>
                                                        <button 
                                                            className='btn btn-outline-primary btn-delete me-2'
                                                            onClick={() => handleDeleteProduct(item.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button 
                                                            className='btn btn-outline-info btn-edit me-2'
                                                            onClick={() => handleEditProduct(item.id)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                            className='btn btn-outline-info btn-image'
                                                            onClick={() => handleAddImage(item)}
                                                        >
                                                            Image
                                                        </button>
                                                        <button 
                                                            className='btn btn-outline-info btn-description'
                                                            onClick={() => handleAddDescription(item.id)}
                                                        >
                                                            Description
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
        products: state.product.products,
        accessToken: state.auth.token,
        isLoading: state.product.isLoadingProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProductsRedux: (type, accessToken) => dispatch(actions.getAllProducts(type, accessToken)),
        deleteProductRedux: (id, typeCategore, accessToken, page) => dispatch(actions.deleteProduct(id, typeCategore, accessToken, page)),
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
        getLimitProductsRedux: (categore, page, accessToken) => dispatch(actions.getLimitProducts(categore, page, accessToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableProducts);
