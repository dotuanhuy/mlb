import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode';



function Action({product}) {
    console.log(product)
    return (
       <></>
    );
}

const mapStateToProps = state => {
    return {
        product: state.product.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Action));
