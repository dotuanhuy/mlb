import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from './utils'
import HomePage from './components/HomePage/HomePage';
import UserManage from './components/System/UserManage'

function App() {
    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path={path.HOMEPAGE} element={<HomePage />}/>
                    <Route path='/system/user-manage' element={<UserManage />}/>
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
