import React, { useEffect, memo } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from './utils'
// import HomePage from './components/HomePage/HomePage';
// import UserManage from './components/System/CRUD/UserManage';
// import Login from './components/Login/Login';
// import Register from './components/Register/Register';
// import Manage from './components/System/Manage/manage';
// import EditUser from './components/System/CRUD/EditUser';
// import Shoes from './components/Products/ShoesList/Shoes'
// import ManageProducts from './components/System/Manage/Products/ManageProducts';
// import ManageShoes from './components/System/Manage/Products/ManageShoes/ManageShoes';
// import ManageShoesCreate from './components/System/Manage/Products/ManageShoes/ManageShoesCreate';
// import ManageShoesEdit from './components/System/Manage/Products/ManageShoes/ManageShoesEdit';
// import AddImageProduct from './components/System/Manage/Products/ManageShoes/HandleImage/AddImageProduct';
// import AddDescriptionProduc from './components/System/Manage/Products/ManageShoes/HandleDescription/AddDescriptionProduc';
// import PrivateRouter from './route/PrivateRouter';
import System from './route/system';
import AuthRoute from './route/authRoute';
import PublicRoute from './route/publicRoute';
import NoMatch from './route/NoMatch';

function App({isLogin}) {
    return (
        <React.Fragment>
            <Router>
                <AuthRoute />
                <System />
                <PublicRoute />
                {/* <Routes>
                    <Route path='*' element={<NoMatch />}/>
                </Routes> */}
                {/* <Routes>
                    <Route path={path.HOMEPAGE} element={<HomePage />}/>

                    <Route path={path.MANAGE} element={isLogin && <Manage /> }/>
                    <Route path={path.MANAGE_USER_CREATE} element={isLogin && <UserManage />}/>
                    <Route path={path.MANAGE_USER_EDIT} element={isLogin && <EditUser />}/>
                    <Route path={path.MANAGE_PRODUCTS} element={isLogin && <ManageProducts />}/>
                    <Route path={path.MANAGE_PRODUCTS_SHOES} element={isLogin && <ManageShoes />}/>
                    <Route path={path.MANAGE_PRODUCTS_SHOES_CREATE} element={isLogin && <ManageShoesCreate />}/>
                    <Route path={path.MANAGE_PRODUCTS_SHOES_EDIT} element={isLogin && <ManageShoesEdit />}/>
                    <Route path={path.MANAGE_PRODUCTS_IMAGE_ADD} element={isLogin && <AddImageProduct />}/>
                    <Route path={path.MANAGE_PRODUCTS_DESCRIPTION_ADD} element={isLogin && <AddDescriptionProduc />}/>

                    <Route path={path.LOGIN} element={<Login />}/>
                    <Route path={path.REGISTER} element={<Register />}/>

                    <Route path={path.GIAY_MLB} element={<Shoes />} />
                </Routes> */}
            </Router>
        </React.Fragment>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(App));
