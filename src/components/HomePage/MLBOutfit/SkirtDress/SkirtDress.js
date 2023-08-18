import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Chunky_Liner_Mid_New_York_Yankees_Green } from '../../../../utils/images';

function SkirtDress() {
    return (
        <div className='menu-product row'>
            <div className='product col-3'>
                <div className='actions text-center'>
                    <div className='tym mb-2 px-3'>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className='cart'>
                        <button className='btn-buy'>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                    </div>
                </div>
                <div className='product-img product-img-first'>
                    <a href='#'>
                        <img src={Chunky_Liner_Mid_New_York_Yankees_Green.Chunky_Liner_Mid_New_York_Yankees_Green_c}/>
                    </a>
                </div>        
                <div className='product-img product-img-second'>
                    <a href='#'>
                        <img src={Chunky_Liner_Mid_New_York_Yankees_Green.Chunky_Liner_Mid_New_York_Yankees_Green_h}/>
                    </a>
                </div>           
                <div className='product-infor text-center'>
                    <span className='brand'>MLB KOREA</span>    
                    <h4 className='product-name'>
                        <a href='#'>Giày MLB Korea Chunky Liner Mid New York</a>
                    </h4>
                    <span className='product-price'>3.790.000₫</span>
                </div>          
            </div>
            <div className='product col-3'>
                <div className='product-img'>
                    <a href='#'>
                        <img src={Chunky_Liner_Mid_New_York_Yankees_Green.Chunky_Liner_Mid_New_York_Yankees_Green_c}/>
                    </a>
                </div>                  
                <div className='product-infor text-center'>
                    <span className='brand'>MLB KOREA</span>    
                    <h4 className='product-name'>
                        <a href='#'>Giày MLB Korea Chunky Liner Mid New York</a>
                    </h4>
                    <span className='product-price'>3.790.000₫</span>
                </div>          
            </div>
            <div className='product col-3'>
                <div className='product-img'>
                    <a href='#'>
                        <img src={Chunky_Liner_Mid_New_York_Yankees_Green.Chunky_Liner_Mid_New_York_Yankees_Green_c}/>
                    </a>
                </div>                  
                <div className='product-infor text-center'>
                    <span className='brand'>MLB KOREA</span>    
                    <h4 className='product-name'>
                        <a href='#'>Giày MLB Korea Chunky Liner Mid New York</a>
                    </h4>
                    <span className='product-price'>3.790.000₫</span>
                </div>          
            </div>
            <div className='product col-3'>
                <div className='product-img'>
                    <a href='#'>
                        <img src={Chunky_Liner_Mid_New_York_Yankees_Green.Chunky_Liner_Mid_New_York_Yankees_Green_c}/>
                    </a>
                </div>                  
                <div className='product-infor text-center'>
                    <span className='brand'>MLB KOREA</span>    
                    <h4 className='product-name'>
                        <a href='#'>Giày MLB Korea Chunky Liner Mid New York</a>
                    </h4>
                    <span className='product-price'>3.790.000₫</span>
                </div>          
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

export default connect(mapStateToProps, mapDispatchToProps)(SkirtDress);
