import React, { memo } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import System from './route/system';
import AuthRoute from './route/authRoute';
import PublicRoute from './route/publicRoute';
import NoMatch from './route/NoMatch';

function App() {
    return (
        <React.Fragment>
            <Router>
                <AuthRoute />
                <System />
                <PublicRoute />
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
