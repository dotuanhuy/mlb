import React from 'react';
import { connect } from 'react-redux';
import './ManageClothes.scss'
import Nav from '../../../nav/nav';
import { Link } from 'react-router-dom';
import { path, categorieType } from '../../../../../utils';
import TableProducts from '../../../common/tableProducts/TableProducts';


function ManageClothes({isLogin}) {
    return (    
        <div className='manage-product'>
            <div className='manage-product-container'>
                <Nav />
                <div className='create'>
                    <button className='btn btn-success my-4 btn-add'>
                        <Link to={path.MANAGE_PRODUCTS_CLOTHES_CREATE} state={categorieType.CLOTHES}>Add</Link>
                    </button>
                </div>
                <TableProducts typeCategore={categorieType.CLOTHES} pathPage={path.MANAGE_PRODUCTS_CLOTHES}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClothes);
