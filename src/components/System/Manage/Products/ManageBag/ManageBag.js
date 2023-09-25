import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageBag.scss'
import Nav from '../../../nav/nav';
import { Link } from 'react-router-dom';
import { path, Role, categorieType } from '../../../../../utils';
import TableProducts from '../TableProducts/TableProducts';


function ManageBag({isLogin}) {
    return (    
        <div className='manage-product'>
            <div className='manage-product-container'>
                <Nav />
                <div className='create'>
                    <button className='btn btn-success my-4 btn-add'>
                        <Link to={path.MANAGE_PRODUCTS_BAG_BALO_CREATE} state={categorieType.BAG_BALO}>Add</Link>
                    </button>
                </div>
                <TableProducts typeCategore={categorieType.BAG_BALO} pathPage={path.MANAGE_PRODUCTS_BAG_BALO}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageBag);
