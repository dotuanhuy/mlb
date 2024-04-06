import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../common/navbar/Navbar'
import { Link } from 'react-router-dom';
import TableProduct from './TableProducts';
import Sidebar from '../common/sidebars/Sidebar';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomeProduct({
    categoryType,
    actives
}) {

    return (    
        <div className='manage-product'>
            <Navbar />
            <div className='row gx-0'>
               <div className='col-2'>
                    <Sidebar active='product' activeChild={actives?.active}/>
                </div> 
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>{actives?.active}</h2>
                        <Link 
                            className='text-white fw-500 btn btn-root text-center' 
                            to={actives?.pathToCreate}
                        >
                            <FontAwesomeIcon className='pe-1' icon={faCirclePlus} />
                            Add new
                        </Link>
                    </div>
                    <hr/>
                    <TableProduct categoryType={categoryType} actives={actives}/>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeProduct);
