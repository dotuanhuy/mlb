import React from 'react';
import { connect } from 'react-redux';
import './manage.scss'
import TableUser from '../TableUsers/TableUser';
import Nav from '../nav/nav';

function Manage() {

    return (
        <div className='manage-system'>
            <div className='manage-container'>
                <Nav />
                <TableUser />
            </div>
        </div>
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
