import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../common/navbar/Navbar';
import { Link } from 'react-router-dom';
import { path } from '../../../utils';
import Sidebar from '../common/sidebars/Sidebar';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableDiscount from './TableDiscount';

function DiscountManage() {

    return (    
        <>
            <Navbar />
            <div className='row gx-0'>
               <div className='col-2'>
                    <Sidebar active={'discount'}/>
                </div> 
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between'>
                        <h2>Discount</h2>
                        <button className='btn btn-root btn-add py-1'>
                            <Link className='text-white fw-500' to={path.MANAGE_DISCOUNT_CREATE}>
                                <FontAwesomeIcon className='pe-1' icon={faCirclePlus} />
                                Add new
                            </Link>
                        </button>
                    </div>
                    <hr/>
                    <TableDiscount />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountManage);
