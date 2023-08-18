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

function App({isLogin}) {
    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path={path.HOMEPAGE} element={<HomePage />}/>
                    <Route path={path.MANAGE} element={<Manage />}/> 
                    <Route path={path.MANAGE_CREATE} element={<UserManage />}/>
                    <Route path={path.MANAGE_EDIT} element={<EditUser />}/>
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
