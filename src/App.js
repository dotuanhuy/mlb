import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from './utils'
import HomePage from './components/HomePage/HomePage';
import UserManage from './components/System/CRUD/UserManage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Manage from './components/System/Manage/manage';
import EditUser from './components/System/CRUD/EditUser';
import Shoes from './components/Products/ShoesList/Shoes'
import ManageProducts from './components/System/Manage/Products/ManageProducts';
import ManageShoes from './components/System/Manage/Products/ManageShoes/ManageShoes';
import ManageShoesCreate from './components/System/Manage/Products/ManageShoes/ManageShoesCreate';
import ManageShoesEdit from './components/System/Manage/Products/ManageShoes/ManageShoesEdit';
import AddImageProduct from './components/System/Manage/Products/ManageShoes/HandleImage/AddImageProduct';

function App({isLogin}) {
    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path={path.HOMEPAGE} element={<HomePage />}/>

                    <Route path={path.MANAGE} element={<Manage />}/> 
                    <Route path={path.MANAGE_CREATE} element={<UserManage />}/>
                    <Route path={path.MANAGE_EDIT} element={<EditUser />}/>

                    <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />}/>
                    <Route path={path.MANAGE_PRODUCTS_SHOES} element={<ManageShoes />}/>
                    <Route path={path.MANAGE_PRODUCTS_SHOES_CREATE} element={<ManageShoesCreate />}/>
                    <Route path={path.MANAGE_PRODUCTS_SHOES_EDIT} element={<ManageShoesEdit />}/>
                    <Route path={path.MANAGE_PRODUCTS_IMAGE_ADD} element={<AddImageProduct />}/>

                    <Route path={path.LOGIN} element={<Login />}/>
                    <Route path={path.REGISTER} element={<Register />}/>

                    <Route path={path.GIAY_MLB} element={<Shoes />} />
                </Routes>
            </Router>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
