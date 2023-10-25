import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './MLBBackPack.scss'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path, typeBagBalo } from '../../../utils';
import { categorieType } from '../../../utils';
import {Buffer} from 'buffer';
import { formatVND } from '../../../utils';

function MLBBackPack({products, images}) {
    const [backPack, setbackPack] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            let arr = products.filter(item => item.dataCategory.type === categorieType.BAG_BALO)
            let newArr = arr.filter(item => item.name.includes('Balo'))
            setbackPack(newArr)
        }
    }, [products])

    return (
        <div className='mlbbackpack'>
            <div className='mlbbackpack-container px-4'>
                <div className='title text-center'>
                    <h2 className='title-mlbbackpack mb-4'>
                        <Link to={path.BALO_MLB} state={{typeName: typeBagBalo.BALO_MLB}}>MLB BACK PACK</Link>
                    </h2>
                    <p>Balo mới nhất tại <Link to={path.BALO_MLB} state={{typeName: typeBagBalo.BALO_MLB}}>MLB Việt Nam</Link></p>
                </div>
                <div className='menu-box'>
                    <div className='menu-product row'>
                        {
                            backPack && backPack.length > 0 &&
                            backPack.map((item, index) => {
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
                                        {
                                            item.dataDiscount.valueEn !== '0' ?
                                            <div className='discount'>
                                                <span>-{item.dataDiscount.valueEn}</span>
                                            </div>
                                            : ''
                                        }
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
                        <Link to={path.BALO_MLB} state={{typeName: typeBagBalo.BALO_MLB}}>Xem tất cả</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(MLBBackPack);
