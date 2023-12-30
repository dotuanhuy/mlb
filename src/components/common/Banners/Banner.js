import React, { memo } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { Link } from "react-router-dom";
import './Banner.scss'

function Banner({categoryProduct}) {
    
    return (
        <div className='product-banner d-flex justify-content-center align-items-center text-white'>
            <div className="container position-relative text-center">
                <div className='title text-uppercase text-white'>
                    MLB VIETNAM | {categoryProduct} CHÍNH HÃNG TẠI VIỆT NAM
                </div>
                    <ul className='list-link d-flex justify-content-center align-items-center'>
                        <li className='item-link-home'>
                            <Link to='/' className="text-white">Trang chủ</Link>
                        </li>
                        <li>
                            <span>{categoryProduct}</span>
                        </li>
                    </ul>
                </div>
            <div/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Banner));
