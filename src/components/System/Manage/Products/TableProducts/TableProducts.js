import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './TableProducts.scss'
import { Link } from 'react-router-dom';
import { path } from '../../../../../utils';
import * as actions from '../../../../../store/actions'
import { useNavigate } from 'react-router-dom';
import {Buffer} from 'buffer';

function TableProducts({products, getAllProductsRedux, deleteProductRedux}) {
    const navigate = useNavigate()

    useEffect(() => {
        getAllProductsRedux()
    }, [])

    const handleDeleteProduct = (id) => {
        deleteProductRedux(id)
    }

    const handleEditProduct = (id) => {
        navigate(path.MANAGE_PRODUCTS_SHOES_EDIT, {state: id})
    }

    return (
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
                            <th>Description</th>
                            <th>Site</th>
                            <th>Release date</th>
                            <th>BrandId</th>
                            <th>List color</th>
                            <th>LogoId</th>
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
                                        <td>{item.description}</td>
                                        <td>{item.productionSite}</td>
                                        <td>{item.releaseDate}</td>
                                        <td>{item.brandId}</td>
                                        <td>{item.listColor}</td>
                                        <td>{item.logoId}</td>
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
                                                    
                                                >
                                                    Image
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
    );
}

const mapStateToProps = state => {
    return {
        products: state.product.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProductsRedux: () => dispatch(actions.getAllProducts()),
        deleteProductRedux: (id) => dispatch(actions.deleteProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableProducts);
