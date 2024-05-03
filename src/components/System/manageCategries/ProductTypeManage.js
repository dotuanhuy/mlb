import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../common/navbar/Navbar'
import Sidebar from '../common/sidebars/Sidebar';
import TableProductType from './TableProductType';
import ProductManageCreate from './ProductManageCreate';

function ProductTypeManage({ categoryType, actives }) {

    useEffect(() => {
        document.title = 'Quản lý kiểu sản phẩm'
    }, [])

    return (    
        <div className='manage-product'>
            <Navbar />
            <div className='row gx-0'>
               <div className='col-2'>
                    <Sidebar active='category' activeChild={actives?.active}/>
                </div> 
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Các kiểu sản phẩm</h2>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeManage);
