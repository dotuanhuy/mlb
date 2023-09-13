import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageProducts.scss'
import Nav from '../../nav/nav';
import { Link, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../../utils';


function ManageProducts({isLogin}) {
    const navigate = useNavigate()

    return (    
        <div className='manage-product'>
            <div className='manage-product-container'>
                <Nav />
                <div className='product-menu'>
                    <div className='container mt-4'>
                        <div className='create-product-type mb-4'>
                            <button className='btn btn-success'>Thêm loại sản phẩm</button>
                        </div>
                        <div className='product-type-menu row'>
                            <div 
                                className='product-type-item col-3'
                            >
                                <Link to={path.MANAGE_PRODUCTS_SHOES}>Giày-dép</Link>
                            </div>
                            <div className='product-type-item col-3'>
                                <Link to={path.MANAGE_PRODUCTS_BAG_BALO}>Túi-balo</Link>
                            </div>
                            <div className='product-type-item col-3'>
                                <Link to={path.MANAGE_PRODUCTS_HAT}>Mũ-nón</Link>
                            </div>
                            <div className='product-type-item col-3'>
                                <Link to={path.MANAGE_PRODUCTS_CLOTHES}>Áo-quần</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);
