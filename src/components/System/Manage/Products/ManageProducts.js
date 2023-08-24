import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageProducts.scss'
import Nav from '../../nav/nav';
import { Link, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../../utils';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const cookies = new Cookies();

function ManageProducts({isLogin}) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!cookies.get('userLogin')) {
            navigate(path.LOGIN)
        }
        else {
            let token = cookies.get('userLogin')
            let loginInfor = jwt_decode(token)
            if (loginInfor.role === Role.USER) {
                navigate(path.HOMEPAGE)
            }
        }
    }, [])
    useEffect(() => {
        if (!cookies.get('userLogin')) {
            navigate(path.LOGIN)
        }
    }, [isLogin])

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
                                <a>Túi-balo</a>
                            </div>
                            <div className='product-type-item col-3'>
                                <a>Mũ nón</a>
                            </div>
                            <div className='product-type-item col-3'>
                                <a>Áo quần</a>
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
