import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './TableProducts.scss'
import { Link } from 'react-router-dom';
import { path, categorieType } from '../../../../../utils';
import * as actions from '../../../../../store/actions'
import { useNavigate } from 'react-router-dom';
import {Buffer} from 'buffer';
import Loading from '../../../../Loading/Loading';

function TableProducts({typeCategore, products, accessToken, isLoading, getAllProductsRedux, deleteProductRedux, refreshIsloadingStateProductRedux}) {
    const navigate = useNavigate()
    useEffect(() => {
        refreshIsloadingStateProductRedux()
        getAllProductsRedux(typeCategore, accessToken)
    }, [])

    const handleDeleteProduct = (id) => {
        deleteProductRedux(id, typeCategore, accessToken)
    }

    const handleEditProduct = (id) => {
        if (typeCategore === categorieType.SHOES_SANDAL) {
            navigate(path.MANAGE_PRODUCTS_SHOES_EDIT, {
                state: { 
                    id, 
                    typeCategore, 
                    path:  path.MANAGE_PRODUCTS_SHOES
                }
            })
        }
        else if (typeCategore === categorieType.BAG_BALO) {
            navigate(path.MANAGE_PRODUCTS_BAG_BALO_EDIT, {
                state: { 
                    id, 
                    typeCategore, 
                    path: path.MANAGE_PRODUCTS_BAG_BALO 
                }
            })
        }
        else if (typeCategore === categorieType.HAT) {
            navigate(path.MANAGE_PRODUCTS_HAT_EDIT, {
                state: { 
                    id, 
                    typeCategore, 
                    path: path.MANAGE_PRODUCTS_HAT 
                }
            })
        }
        else if (typeCategore === categorieType.CLOTHES) {
            navigate(path.MANAGE_PRODUCTS_CLOTHES_EDIT, {
                state: { 
                    id, 
                    typeCategore, 
                    path: path.MANAGE_PRODUCTS_CLOTHES 
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
                    path:  path.MANAGE_PRODUCTS_SHOES
                }
            })
        }
        else if (typeCategore === categorieType.BAG_BALO) {
            navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, {
                state: {  
                    product, 
                    path: path.MANAGE_PRODUCTS_BAG_BALO 
                }
            })
        }
        else if (typeCategore === categorieType.HAT) {
            navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, {
                state: {  
                    product, 
                    path: path.MANAGE_PRODUCTS_HAT 
                }
            })
        }
        else if (typeCategore === categorieType.CLOTHES) {
            navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, {
                state: {  
                    product, 
                    path: path.MANAGE_PRODUCTS_CLOTHES 
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
                    path:  path.MANAGE_PRODUCTS_SHOES
                }
            })
        }
        else if (typeCategore === categorieType.BAG_BALO) {
            navigate(path.MANAGE_PRODUCTS_DESCRIPTION_ADD, {
                state: {  
                    id, 
                    path: path.MANAGE_PRODUCTS_BAG_BALO 
                }
            })
        }
        else if (typeCategore === categorieType.HAT) {
            navigate(path.MANAGE_PRODUCTS_DESCRIPTION_ADD, {
                state: {  
                    id, 
                    path: path.MANAGE_PRODUCTS_HAT 
                }
            })
        }
        else if (typeCategore === categorieType.CLOTHES) {
            navigate(path.MANAGE_PRODUCTS_IMAGE_ADD, {
                state: {  
                    id, 
                    path: path.MANAGE_PRODUCTS_CLOTHES 
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
                <div className='products-all-system'>
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
        deleteProductRedux: (id, typeCategore, accessToken) => dispatch(actions.deleteProduct(id, typeCategore, accessToken)),
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableProducts);
