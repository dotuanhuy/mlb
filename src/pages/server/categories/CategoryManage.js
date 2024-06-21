import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../../components/server/navbar/Navbar'
import Sidebar from '../../../components/server/sidebars/Sidebar';

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
                    <Sidebar active='category' activeChild={actives?.active} />
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
                    <hr />
                    {/* <TableProduct categoryType={categoryType} actives={actives}/> */}
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
        // getProductByCategoryLimitRedux:  (type, offset) => dispatch(actions.getProductByCategoryLimit(type, offset)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManage);
