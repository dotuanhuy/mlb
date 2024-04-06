import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import './ManageShoes.scss'
import Navbar from '../common/navbar/Navbar'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { path, Role, TitleProduct } from '../../../utils';
import Sidebar from '../common/sidebars/Sidebar';
import * as actions from '../../../store/actions'
import TableProductType from './TableProductType';
import ProductManageCreate from './ProductManageCreate';

function ProductTypeManage({
    // getProductByCategoryLimitRedux
    categoryType,
    actives
}) {

    return (    
        <div className='manage-product'>
            <Navbar />
            <div className='row gx-0'>
               <div className='col-2'>
                    <Sidebar active='category' activeChild={actives?.active}/>
                </div> 
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>{actives?.active}</h2>
                        <ProductManageCreate />
                    </div>
                    <hr/>
                    <TableProductType categoryType={categoryType} actives={actives}/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // getProductByCategoryLimitRedux:  (type, offset) => dispatch(actions.getProductByCategoryLimit(type, offset)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeManage);
