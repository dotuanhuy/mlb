import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './MLBBackPack.scss'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path } from '../../../utils';
import { Chunky_Liner_Mid_New_York_Yankees_Green } from '../../../utils/images';

function MLBBackPack() {
    
    return (
        <div className='mlbbackpack'>
            <div className='mlbbackpack-container px-4'>
                <div className='title text-center'>
                    <h2 className='title-mlbbackpack mb-4'>
                        <a href='#'>MLB BACK PACK</a>
                    </h2>
                    <p>Balo mới nhất tại <a href='#'>MLB Việt Nam</a></p>
                </div>
                <div className='menu-box'>
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
                    <div className='view-all text-center'>
                        <a href='#'>Xem tất cả</a>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MLBBackPack);
