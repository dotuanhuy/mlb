import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageShoes.scss'
import Nav from '../../../nav/nav';
import { Link, useNavigate } from 'react-router-dom';
import { path, Role, categorieType } from '../../../../../utils';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import TableProducts from '../TableProducts/TableProducts';

const cookies = new Cookies();

function ManageShoes({isLogin}) {
    const navigate = useNavigate()

    return (    
        <div className='manage-product'>
            <div className='manage-product-container'>
                <Nav />
                <div className='create'>
                    <button className='btn btn-success my-4 btn-add'>
                        <Link to={path.MANAGE_PRODUCTS_SHOES_CREATE} state={categorieType.SHOES_SANDAL}>Add</Link>
                    </button>
                </div>
                <TableProducts typeCategore={categorieType.SHOES_SANDAL}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageShoes);
