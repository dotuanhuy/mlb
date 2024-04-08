import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';

function Payment({titlePage}) {
    // useEffect(() => {
    //     window.tit
    // }, [])
    return (
        <></>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(Payment));
