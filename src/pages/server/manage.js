import React from 'react';
import { connect } from 'react-redux';
import './manage.scss'
import Sidebar from '../../components/server/navbar/Navbar';
import Dashboard from './dashboards/Dashboard';
import Navbar from '../../components/server/navbar/Navbar';

function Manage() {
    return (
        <>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <Dashboard />
                </div>
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
