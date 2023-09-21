import React, { useState } from 'react';
import { connect } from 'react-redux';
import './MLBBag.scss'
import CrossBag from './CrossBag/CrossBag';
import Bucketbag from './BucketBag/Bucketbag';
import HipStack from './HipStack/HipStack';
import HoboBag from './HoboBag/HoboBag';
import ToteBag from './ToteBag/ToteBag';
import PhonePouch from './PhonePouch/PhonePouch';

function MLBBag() {
    const [type, setType] = useState('CrossBag')

    return (
        <div className='mlbbag'>
            <div className='mlbbag-container px-4'>
                <div className='title text-center py-5'>
                    <h2 className='title-mlbbag mb-4'>
                        <a href='#'>MLB BAG</a>
                    </h2>
                    <p>Những bộ sưu tập <a href='#'>Túi MLB</a> hot nhất</p>
                    <ul className='mlbbag-tabs row my-4'>
                        <li 
                            className={type === 'CrossBag' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('CrossBag')}
                        >
                            <span>Cross Bag</span>
                        </li>
                        <li 
                            className={type === 'BucketBag' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('BucketBag')}
                        >
                            <span>Bucket Bag</span>
                        </li>
                        <li 
                            className={type === 'HipStack' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('HipStack')}
                        >
                            <span>Hip Stack</span>
                        </li>
                        <li 
                            className={type === 'HoboBag' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('HoboBag')}
                        >
                            <span>Hobo Bag</span>
                        </li>
                        <li 
                            className={type === 'ToteBag' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('ToteBag')}
                        >
                            <span>Tote Bag</span>
                        </li>
                        <li 
                            className={type === 'PhonePouch' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('PhonePouch')}
                        >
                            <span>Phone Pouch</span>
                        </li>
                    </ul>
                </div>
                <div className='menu-box'>
                    {/* <div className='menu-product row'>
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
                    </div> */}
                    {
                        type === 'CrossBag' ? <CrossBag /> : ''
                    }
                    {
                        type === 'BucketBag' ? <Bucketbag /> : ''
                    }
                    {
                        type === 'HipStack' ? <HipStack /> : ''
                    }
                    {
                        type === 'HoboBag' ? <HoboBag /> : ''
                    }
                    {
                        type === 'ToteBag' ? <ToteBag /> : ''
                    }
                    {
                        type === 'PhonePouch' ? <PhonePouch /> : ''
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MLBBag);
