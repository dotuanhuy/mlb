import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './NewShoes.scss'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path, categorieType } from '../../../utils';
import { Chunky_Liner_Mid_New_York_Yankees_Green } from '../../../utils/images';
import { useState } from 'react';
import {Buffer} from 'buffer';
import { formatVND } from '../../../utils';

function NewShoes({products, images}) {
    const [shoes, setShoes] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            let arr = products.filter(item => item.dataCategory.type === categorieType.SHOES_SANDAL)
            setShoes(arr)
        }
    }, [products])
    return (
        <div className='newShoes'>
            <div className='newShoes-container px-4'>
                <div className='title text-center'>
                    <h2 className='title-newshoes mb-4'>
                        <a href='#'>NEW SHOES</a>
                    </h2>
                    <p>Những phiên bản <Link to={path.GIAY_MLB}>Giày MLB</Link> mới nhất tại Việt Nam</p>
                </div>
                <div className='menu-box'>
                    <div className='menu-product row'>
                        {
                            shoes && shoes.length > 0 &&
                            shoes.map((item, index) => {
                                let imageBase64 = ''
                                let imageHoverBase64 = ''
                                let imageHover = images.find(image => image.productId === item.id)
                                let price = ''
                                if (item.image) {
                                    imageBase64 = Buffer.from(item.image.data, 'base64').toString('binary')
                                }
                                if (imageHover) {
                                    imageHoverBase64 = Buffer.from(imageHover.image.data, 'base64').toString('binary')
                                }
                                if (item.price) {
                                    price = formatVND(item.price)
                                }
                                return (
                                    <div className='product col-3' key={index}>
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
                                                <div 
                                                    style={{ 
                                                        maxWidth: '100%', 
                                                        height: '340px',
                                                        backgroundImage: `url(${imageBase64})`,
                                                        backgroundPosition: '0% 0%',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}
                                                ></div>
                                            </a>
                                        </div>        
                                        <div className='product-img product-img-second'>
                                            <a href='#'>
                                                <div 
                                                    style={{ 
                                                        maxWidth: '100%', 
                                                        height: '340px',
                                                        backgroundImage: `url(${imageHoverBase64})`,
                                                        backgroundPosition: '0% 0%',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}
                                                ></div>                                                
                                            </a>
                                        </div>           
                                        <div className='product-infor text-center'>
                                            <span className='brand'>{item.dataBrand.valueEn}</span>    
                                            <h4 className='product-name'>
                                                <a href='#'>{item.name}</a>
                                            </h4>
                                            <span className='product-price'>{price}</span>
                                        </div>          
                                    </div>
                                )
                            })
                        }
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
        products: state.product.products,
        images: state.product.images
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewShoes);
