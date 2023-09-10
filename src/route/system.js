import React from 'react';
import {Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import EditUser from '../components/System/CRUD/EditUser';
import UserManage from '../components/System/CRUD/UserManage'
import Manage from '../components/System/Manage/manage';
import ManageProducts from '../components/System/Manage/Products/ManageProducts';
import ManageShoes from '../components/System/Manage/Products/ManageShoes/ManageShoes';
import ManageShoesCreate from '../components/System/Manage/Products/ManageShoes/ManageShoesCreate';
import ManageShoesEdit from '../components/System/Manage/Products/ManageShoes/ManageShoesEdit';
import AddImageProduct from '../components/System/Manage/Products/ManageShoes/HandleImage/AddImageProduct';
import AddDescriptionProduc from '../components/System/Manage/Products/ManageShoes/HandleDescription/AddDescriptionProduc';
import { path } from '../utils';
import PrivateRouter from './PrivateRouter';

function System({isLogin}) {
    return (
       <>
            <Routes>
                <Route path={path.MANAGE} element={<PrivateRouter Component={Manage}/>}/> 
                {/* <Route path={path.MANAGE} element={isLogin && <Manage /> }/> */}
                <Route path={path.MANAGE_CREATE} element={<PrivateRouter Component={UserManage}/>}/>
                <Route path={path.MANAGE_EDIT} element={<PrivateRouter Component={EditUser}/>} />
                <Route path={path.MANAGE_PRODUCTS} element={<PrivateRouter Component={ManageProducts}/>} />
                <Route path={path.MANAGE_PRODUCTS_SHOES} element={<PrivateRouter Component={ManageShoes}/>} />
                <Route path={path.MANAGE_PRODUCTS_SHOES_CREATE} element={<PrivateRouter Component={ManageShoesCreate}/>} />
                <Route path={path.MANAGE_PRODUCTS_SHOES_EDIT} element={<PrivateRouter Component={ManageShoesEdit}/>} />
                <Route path={path.MANAGE_PRODUCTS_IMAGE_ADD} element={<PrivateRouter Component={AddImageProduct}/>} />
                <Route path={path.MANAGE_PRODUCTS_DESCRIPTION_ADD} element={<PrivateRouter Component={AddDescriptionProduc}/>} />
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
