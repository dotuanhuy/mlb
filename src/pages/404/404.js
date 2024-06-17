import React, { memo } from 'react';
import { connect } from 'react-redux';

function NotFound() {

    return (
        <>
            Page is not found
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(NotFound));
