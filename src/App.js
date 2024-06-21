import React, { memo, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import SystemRoute from './route/SystemRoute';
import AuthRoute from './route/AuthRoute';
import PublicRoute from './route/publicRoute';
import Loading from './components/loading/Loading';

function App() {
    return (
        <React.Fragment>
            <Suspense fallback={<Loading />}>
                <Router>
                    <AuthRoute />
                    <SystemRoute />
                    <PublicRoute />
                </Router>
            </Suspense>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(App));
