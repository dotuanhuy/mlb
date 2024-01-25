import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageProducts.scss'
import { Link, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../../utils';
import Navbar from '../../common/navbar/Navbar';
import Sidebar from '../../common/sidebars/Sidebar';
import HorizontalBarChart from '../../common/charts/HorizontalBarChart';
import * as actions from '../../../../store/actions'
import Loading from '../../../common/Loading/Loading'


function ManageProducts({
    accessToken,
    categories,
    quantityArr,
    isLoading,
    getAllCategoriesRedux,
    getQuantityOfEechProductByCategory
}) {
    const navigate = useNavigate()
    
    useEffect(() => {
        getAllCategoriesRedux(accessToken)
        getQuantityOfEechProductByCategory(accessToken)
    }, [])

    return (    
        // <div className='manage-product'>
        //     <div className='manage-product-container'>
        //         <Nav />
        //         <div className='product-menu'>
        //             <div className='container mt-4'>
        //                 <div className='create-product-type mb-4'>
        //                     <button className='btn btn-success'>Thêm loại sản phẩm</button>
        //                 </div>
        //                 <div className='product-type-menu row'>
        //                     <div 
        //                         className='product-type-item col-3'
        //                     >
        //                         <Link to={path.MANAGE_PRODUCTS_SHOES}>Giày-dép</Link>
        //                     </div>
        //                     <div className='product-type-item col-3'>
        //                         <Link to={path.MANAGE_PRODUCTS_BAG_BALO}>Túi-balo</Link>
        //                     </div>
        //                     <div className='product-type-item col-3'>
        //                         <Link to={path.MANAGE_PRODUCTS_HAT}>Mũ-nón</Link>
        //                     </div>
        //                     <div className='product-type-item col-3'>
        //                         <Link to={path.MANAGE_PRODUCTS_CLOTHES}>Áo-quần</Link>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

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
                                    labels={categories}
                                    label='Quantity products'
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
        categories: state.product.categories,
        quantityArr: state.product.quantityArr,
        isLoading: state.product.isLoadingProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategoriesRedux: (accessToken) => dispatch(actions.getAllCategories(accessToken)),
        getQuantityOfEechProductByCategory: (accessToken) => dispatch(actions.getQuantityOfEechProductByCategory(accessToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);
