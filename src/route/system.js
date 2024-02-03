import React from 'react';
import {Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import UserManageEdit from '../components/System/users/UserManageEdit';
import UserManageCreate from '../components/System/users/UserManageCreate';
import UserManageDetail from '../components/System/users/UserManageDetail';
import Manage from '../components/System/Manage/manage';
import ProductManage from '../components/System/products/ProductManage';
import HomeProduct from '../components/System/products/HomeProduct';
import ManageProductCreate from '../components/System/products/ManageProductCreate';
import ManageProductEdit from '../components/System/products/ManageProductEdit';
import ProductManageDetail from '../components/System/products/ProductManageDetail';
import ManageBag from '../components/System/Manage/Products/ManageBag/ManageBag';
import ManageHat from '../components/System/Manage/Products/ManageHat/ManageHat';
import ManageClothes from '../components/System/Manage/Products/ManageClothes/ManageClothes';
import AddImageProduct from '../components/System/manageImages/AddImageProduct';
import AddDescriptionProduc from '../components/System/Manage/Products/HandleAddDescriptions/AddDescriptionProduc';
import { Active, categorieType, path } from '../utils';
import PrivateRouter from './PrivateRouter';
import UserManage from '../components/System/users/UserManage';

function System({isLogin}) {
    return (
       <>
            <Routes>
                <Route path={path.MANAGE} element={<PrivateRouter Component={Manage}/>}/> 
                {/* <Route path={path.MANAGE} element={isLogin && <Manage /> }/> */}
                <Route 
                    path={path.MANAGE_USER}
                    element={<PrivateRouter Component={UserManage} />}
                />
                <Route 
                    path={path.MANAGE_USER_CREATE}
                    element={<PrivateRouter Component={UserManageCreate}/>}
                />
                <Route 
                    path={path.MANAGE_USER_EDIT}
                    element={<PrivateRouter Component={UserManageEdit}/>} 
                />
                <Route 
                    path={path.MANAGE_USER_DETAIL}
                    element={<PrivateRouter Component={UserManageDetail} />} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS}
                    element={<PrivateRouter Component={ProductManage}/>} 
                />  

                <Route  
                    path={path.MANAGE_PRODUCTS_SHOES}
                    element={<PrivateRouter active={Active.SHOSE} categoryType={categorieType.SHOES_SANDAL} Component={HomeProduct}/>} 
                /> 
                <Route 
                    path={path.MANAGE_PRODUCTS_SHOES_CREATE}
                    element={<PrivateRouter active={Active.SHOSE} categoryType={categorieType.SHOES_SANDAL} Component={ManageProductCreate}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_SHOES_EDIT}
                    element={<PrivateRouter active={Active.SHOSE} categoryType={categorieType.SHOES_SANDAL} Component={ManageProductEdit}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_SHOES_DETAIL}
                    element={<PrivateRouter active={Active.SHOSE} Component={ProductManageDetail}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_SHOES_IMAGES}
                    element={<PrivateRouter active={Active.SHOSE} Component={AddImageProduct}/>} 
                />

                <Route 
                    path={path.MANAGE_PRODUCTS_BAG_BALO}
                    element={<PrivateRouter active={Active.BAG_BALO} categoryType={categorieType.BAG_BALO} Component={HomeProduct}/>} 
                /> 
                <Route 
                    path={path.MANAGE_PRODUCTS_BAG_BALO_CREATE}
                    element={<PrivateRouter active={Active.BAG_BALO} categoryType={categorieType.BAG_BALO} Component={ManageProductCreate}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_BAG_BALO_EDIT}
                    element={<PrivateRouter active={Active.BAG_BALO} categoryType={categorieType.BAG_BALO} Component={ManageProductEdit}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_BAG_BALO_DETAIL}
                    element={<PrivateRouter active={Active.BAG_BALO} Component={ProductManageDetail}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_BAG_BALO_IMAGES}
                    element={<PrivateRouter active={Active.BAG_BALO} Component={AddImageProduct}/>} 
                />
                
                <Route 
                    path={path.MANAGE_PRODUCTS_HAT}
                    element={<PrivateRouter active={Active.HAT} categoryType={categorieType.HAT} Component={HomeProduct}/>} 
                /> 
                <Route 
                    path={path.MANAGE_PRODUCTS_HAT_CREATE}
                    element={<PrivateRouter active={Active.HAT} categoryType={categorieType.HAT} Component={ManageProductCreate}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_HAT_EDIT}
                    element={<PrivateRouter active={Active.HAT} categoryType={categorieType.HAT} Component={ManageProductEdit}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_HAT_DETAIL}
                    element={<PrivateRouter active={Active.HAT} Component={ProductManageDetail}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_HAT_IMAGES}
                    element={<PrivateRouter active={Active.HAT} Component={AddImageProduct}/>} 
                />
                
                <Route 
                    path={path.MANAGE_PRODUCTS_CLOTHES}
                    element={<PrivateRouter active={Active.CLOTHES} categoryType={categorieType.CLOTHES} Component={HomeProduct}/>} 
                /> 
                <Route 
                    path={path.MANAGE_PRODUCTS_CLOTHES_CREATE}
                    element={<PrivateRouter active={Active.CLOTHES} categoryType={categorieType.CLOTHES} Component={ManageProductCreate}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_CLOTHES_EDIT}
                    element={<PrivateRouter active={Active.CLOTHES} categoryType={categorieType.CLOTHES} Component={ManageProductEdit}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_CLOTHES_DETAIL}
                    element={<PrivateRouter active={Active.CLOTHES} Component={ProductManageDetail}/>} 
                />
                <Route 
                    path={path.MANAGE_PRODUCTS_CLOTHES_IMAGES}
                    element={<PrivateRouter active={Active.CLOTHES} Component={AddImageProduct}/>} 
                />
        
                {/* <Route 
                    path={path.MANAGE_PRODUCTS_IMAGE_ADD}
                    element={<PrivateRouter Component={AddImageProduct}/>} 
                /> */}
                {/* <Route 
                    path={path.MANAGE_PRODUCTS_DESCRIPTION_ADD}
                    element={<PrivateRouter Component={AddDescriptionProduc}/>} 
                /> */}
            </Routes>
       </>
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
