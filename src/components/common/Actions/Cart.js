import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {  faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import * as actions from '../../../store/actions'
import jwt_decode from 'jwt-decode'
import { path } from '../../../utils';

function Action() {
    
    
    return (
        <>    
            <div className='cart'>
                <button 
                    className='btn-buy' 
                    data-toggle="tooltip"
                    title='Thêm vào giỏ hàng'
                >
                    <FontAwesomeIcon icon={faCartShopping} />
                </button>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProductFavouriteRedux: (accessToken, data, page) => dispatch(actions.addProductFavourite(accessToken, data, page)),
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Action));
