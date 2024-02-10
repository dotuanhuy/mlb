import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import './ManageShoes.scss'
import Navbar from '../common/navbar/Navbar'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { path, Role, TitleProduct } from '../../../utils';
import TableProduct from '../common/tableProducts/TableProducts';
import Sidebar from '../common/sidebars/Sidebar';
import * as actions from '../../../store/actions'

function CategoryManage({
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
                        {/* <h2>{actives?.active}</h2> */}
                        {/* <Link 
                            className='text-white fw-500 btn btn-root text-center' 
                            to={actives?.pathToCreate}
                        >
                            Add new
                        </Link> */}
                    </div>
                    <hr/>
                    {/* <TableProduct categoryType={categoryType} actives={actives}/> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManage);
