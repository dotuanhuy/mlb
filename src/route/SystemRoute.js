import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import EditUser from '../components/System/users/EditUser';
import CreateUser from '../components/System/users/CreateUser';
import UserManageDetail from '../components/System/users/UserManageDetail';
import Manage from '../components/System/Manage/manage';
import CategoryManage from '../components/System/manageCategries/CategoryManage';
import ProductTypeManage from '../components/System/manageCategries/ProductTypeManage';
import UpdateProductType from '../components/System/manageCategries/UpdateProductType';
import ProductManage from '../components/System/products/ProductManage';
import CreateProduct from '../components/System/products/CreateProduct';
import EditProduct from '../components/System/products/EditProduct';
import ProductManageDetail from '../components/System/products/ProductManageDetail';
import AddDescriptionProduc from '../components/System/Manage/Products/HandleAddDescriptions/AddDescriptionProduc';
import { Active, categorieType, path } from '../utils';
import PrivateRouter from './PrivateRouter';
import UserManage from '../components/System/users/UserManage';
import DiscountManage from '../components/System/discounts/DiscountManage';
import CreateDiscount from '../components/System/discounts/CreateDiscount';
import EditDiscount from '../components/System/discounts/EditDiscount';
import OrderMange from '../components/System/orders/OrderMange';
import OrderMangeDetail from '../components/System/orders/OrderMangeDetail';
import Report from '../components/System/reports/Report'

function SystemRoute() {
    return (
        <>
            <Routes>
                <Route path={path.MANAGE} element={<PrivateRouter Component={Manage} />} />
                {/* <Route path={path.MANAGE} element={isLogin && <Manage /> }/> */}
                <Route
                    path={path.MANAGE_USER}
                    element={<PrivateRouter Component={UserManage} />}
                />
                <Route
                    path={path.MANAGE_USER_CREATE}
                    element={<PrivateRouter Component={CreateUser} />}
                />
                <Route
                    path={path.MANAGE_USER_EDIT}
                    element={<PrivateRouter Component={EditUser} />}
                />
                <Route
                    path={path.MANAGE_USER_DETAIL}
                    element={<PrivateRouter Component={UserManageDetail} />}
                />

                {/* <Route 
                    path={path.MANAGE_PRODUCTS}
                    // element={<PrivateRouter Component={ProductManage}/>} 
                />   */}

                <Route
                    path={path.MANAGE_CATEGORY_PRODUCT}
                    element={<PrivateRouter active={Active.CATEGORY} Component={CategoryManage} />}
                />
                <Route
                    path={path.MANAGE_PRODUCT_TYPE}
                    element={<PrivateRouter active={Active.PRODUCT_TYPE} Component={ProductTypeManage} />}
                />
                <Route
                    path={path.MANAGE_PRODUCT_TYPE_UPDATE}
                    element={<PrivateRouter active={Active.PRODUCT_TYPE} Component={UpdateProductType} />}
                />

                <Route
                    path={path.MANAGE_PRODUCTS_SHOES}
                    element={<PrivateRouter active={Active.SHOSE} categoryType={categorieType.SHOES_SANDAL} Component={ProductManage} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_SHOES_CREATE}
                    element={<PrivateRouter active={Active.SHOSE} categoryType={categorieType.SHOES_SANDAL} Component={CreateProduct} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_SHOES_EDIT}
                    element={<PrivateRouter active={Active.SHOSE} categoryType={categorieType.SHOES_SANDAL} Component={EditProduct} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_SHOES_DETAIL}
                    element={<PrivateRouter active={Active.SHOSE} Component={ProductManageDetail} />}
                />

                <Route
                    path={path.MANAGE_PRODUCTS_BAG_BALO}
                    element={<PrivateRouter active={Active.BAG_BALO} categoryType={categorieType.BAG_BALO} Component={ProductManage} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_BAG_BALO_CREATE}
                    element={<PrivateRouter active={Active.BAG_BALO} categoryType={categorieType.BAG_BALO} Component={CreateProduct} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_BAG_BALO_EDIT}
                    element={<PrivateRouter active={Active.BAG_BALO} categoryType={categorieType.BAG_BALO} Component={EditProduct} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_BAG_BALO_DETAIL}
                    element={<PrivateRouter active={Active.BAG_BALO} Component={ProductManageDetail} />}
                />

                <Route
                    path={path.MANAGE_PRODUCTS_HAT}
                    element={<PrivateRouter active={Active.HAT} categoryType={categorieType.HAT} Component={ProductManage} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_HAT_CREATE}
                    element={<PrivateRouter active={Active.HAT} categoryType={categorieType.HAT} Component={CreateProduct} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_HAT_EDIT}
                    element={<PrivateRouter active={Active.HAT} categoryType={categorieType.HAT} Component={EditProduct} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_HAT_DETAIL}
                    element={<PrivateRouter active={Active.HAT} Component={ProductManageDetail} />}
                />

                <Route
                    path={path.MANAGE_PRODUCTS_CLOTHES}
                    element={<PrivateRouter active={Active.CLOTHES} categoryType={categorieType.CLOTHES} Component={ProductManage} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_CLOTHES_CREATE}
                    element={<PrivateRouter active={Active.CLOTHES} categoryType={categorieType.CLOTHES} Component={CreateProduct} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_CLOTHES_EDIT}
                    element={<PrivateRouter active={Active.CLOTHES} categoryType={categorieType.CLOTHES} Component={EditProduct} />}
                />
                <Route
                    path={path.MANAGE_PRODUCTS_CLOTHES_DETAIL}
                    element={<PrivateRouter active={Active.CLOTHES} Component={ProductManageDetail} />}
                />

                <Route
                    path={path.MANAGE_DISCOUNT}
                    element={<PrivateRouter Component={DiscountManage} />}
                />
                <Route
                    path={path.MANAGE_DISCOUNT_CREATE}
                    element={<PrivateRouter Component={CreateDiscount} />}
                />
                <Route
                    path={path.MANAGE_DISCOUNT_EDIT}
                    element={<PrivateRouter Component={EditDiscount} />}
                />

                <Route
                    path={path.MANAGE_ORDER}
                    element={<PrivateRouter Component={OrderMange} />}
                />
                <Route
                    path={path.MANAGE_ORDER_DETAIL}
                    element={<PrivateRouter Component={OrderMangeDetail} />}
                />

                <Route
                    path={path.MANAGE_REPORT}
                    element={<PrivateRouter Component={Report} />}
                />
            </Routes>
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

export default connect(mapStateToProps, mapDispatchToProps)(SystemRoute);
