import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from './utils'
import HomePage from './components/HomePage/HomePage';
import UserManage from './components/System/UserManage'
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path={path.HOMEPAGE} element={<HomePage />}/>
                    <Route path='/system/user-manage' element={<UserManage />}/>
                    <Route path={path.LOGIN} element={<Login />}/>
                    <Route path={path.REGISTER} element={<Register />}/>
                </Routes>
            </Router>
        </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
