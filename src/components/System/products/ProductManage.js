import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import './ManageProducts.scss'
import { Link, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../utils';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import HorizontalBarChart from '../common/charts/HorizontalBarChart';
import * as actions from '../../../store/actions'
import Loading from '../../common/Loading/Loading'


function ProductManage({
    accessToken,
    categoriesDetail,
    quantityArr,
    isLoading,
    getAllCategoriesDetailRedux,
    getQuantityOfEechProductByCategory
}) {
    const navigate = useNavigate()
    
    useEffect(() => {
        getAllCategoriesDetailRedux(accessToken)
        getQuantityOfEechProductByCategory(accessToken)
    }, [])

    return (    
        <> 
            {
                isLoading ? 
                <Loading />
                :
                <>
                    <Navbar />
                    <div className='row gx-0'>
                        <div className='col-2'>
                            <Sidebar active={'product'}/>
                        </div> 
                        <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                            <div className='d-flex justify-content-between'>
                                <h2>Product</h2>
                            </div>
                            <hr/>
                            
                            <div className='mb-4'>
                                <HorizontalBarChart 
                                    titleText='Horizontal chart statistics the number of products of the type'
                                    labels={categoriesDetail}
                                    label='Quantity'
                                    data={quantityArr}
                                />
                            </div>
                            <div>
                                <span className='text-muted fw-500'>
                                    Total products: {
                                        quantityArr.reduce((acc, cur) => acc + +cur.quantity, 0)
                                    } products
                                    
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            }
            
        </>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        isLogin: state.auth.isLogin,
        categoriesDetail: state.category.categoriesDetail,
        quantityArr: state.product.quantityArr,
        isLoading: state.product.isLoadingProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategoriesDetailRedux: (accessToken) => dispatch(actions.getAllCategoriesDetail(accessToken)),
        getQuantityOfEechProductByCategory: (accessToken) => dispatch(actions.getQuantityOfEechProductByCategory(accessToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
