import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar/Navbar'

function HomePage() {
    return (
        <div>
            <Navbar />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
