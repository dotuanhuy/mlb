import React, { memo, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import System from './route/system';
import AuthRoute from './route/authRoute';
import PublicRoute from './route/publicRoute';
import NoMatch from './route/NoMatch';
import Loading from './components/common/Loading/Loading';

function App() {
    return (
        <React.Fragment>
            <Suspense  fallback={<Loading />}>
                <Router>
                    <AuthRoute />
                    <System />
                    <PublicRoute />
                </Router>
            </Suspense>
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
