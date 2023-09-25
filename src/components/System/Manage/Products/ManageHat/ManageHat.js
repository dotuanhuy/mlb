import React from 'react';
import { connect } from 'react-redux';
import './ManageHat.scss'
import Nav from '../../../nav/nav';
import { Link, useNavigate } from 'react-router-dom';
import { path, categorieType } from '../../../../../utils';
import TableProducts from '../TableProducts/TableProducts';


function ManageHat({isLogin}) {
    const navigate = useNavigate()

    return (    
        <div className='manage-product'>
            <div className='manage-product-container'>
                <Nav />
                <div className='create'>
                    <button className='btn btn-success my-4 btn-add'>
                        <Link to={path.MANAGE_PRODUCTS_HAT_CREATE} state={categorieType.HAT}>Add</Link>
                    </button>
                </div>
                <TableProducts typeCategore={categorieType.HAT} pathPage={path.MANAGE_PRODUCTS_HAT}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHat);
