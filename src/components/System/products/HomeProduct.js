import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import './ManageShoes.scss'
import Navbar from '../common/navbar/Navbar'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { path, Role, TitleProduct } from '../../../utils';
import TableProduct from '../common/tableProducts/TableProducts';
import Sidebar from '../common/sidebars/Sidebar';
import * as actions from '../../../store/actions'

function HomeProduct({
    // getProductByCategoryLimitRedux
    categoryType,
    active
}) {
    const navigate = useNavigate()
    const [pathTo, setPathTo] = useState('')
    const pathName = useLocation().pathname

    useEffect(() => {
        if(pathName === path.MANAGE_PRODUCTS_SHOES) {
            setPathTo(path.MANAGE_PRODUCTS_SHOES_CREATE)
        }
        else if (pathName === path.MANAGE_PRODUCTS_BAG_BALO) {
            setPathTo(path.MANAGE_PRODUCTS_BAG_BALO_CREATE)
        }
        else if (pathName === path.MANAGE_PRODUCTS_HAT) {
            setPathTo(path.MANAGE_PRODUCTS_HAT_CREATE)
        }
        else if (pathName === path.MANAGE_PRODUCTS_CLOTHES) {
            setPathTo(path.MANAGE_PRODUCTS_CLOTHES_CREATE)
        }
    }, [active])

    return (    
        <div className='manage-product'>
            <Navbar />
            <div className='row gx-0'>
               <div className='col-2'>
                    <Sidebar active='product' activeChild={active}/>
                </div> 
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>{active}</h2>
                        <Link 
                            className='text-white fw-500 btn btn-root text-center' 
                            to={pathTo}
                        >
                            Add new
                        </Link>
                    </div>
                    <hr/>
                    <TableProduct categoryType={categoryType}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeProduct);
