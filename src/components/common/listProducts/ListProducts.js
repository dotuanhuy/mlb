import React, { memo } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { formatVND } from "../../../utils";
import {Buffer} from 'buffer';
import Toast from "../Actions/Toast";
import './ListProducts.scss';
import { Link } from "react-router-dom";
import { path } from "../../../utils";


function ListProducts({accessToken, products, images, col='col-4', productFavourites}) {
    return (
        <>
            {
                products && products.length > 0 &&
                products.map((item, index) => {
                    let size = item?.listSize.split(',').at(0)
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
                    let isFavourite = false
                    if (productFavourites.length !== 0) {
                        isFavourite = productFavourites.some(element => element.id === item.id)
                    }
                    return (
                        <div className={`list-products ${col}`} key={index}>
                            {
                                item.dataDiscount.valueEn !== '0' ?
                                <div className='discount'>
                                    <span>-{item.dataDiscount.valueEn}</span>
                                </div>
                                : ''
                            }
                            {/* <div className='actions text-center'>
                                <div className='tym mb-2 px-3'>
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <div className='cart'>
                                    <button className='btn-buy'>
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </button>
                                </div>
                            </div> */}
                            <Toast 
                                productId={item.id} 
                                productFavourites={productFavourites} 
                                isFavourite={isFavourite}
                                size = {size}
                            />
                            <div className='product-img product-img-first'>
                                <Link 
                                    to={`${path.PRODUCT}/${item.name}`} 
                                    state={{ 
                                        productId: item.id,
                                        productName: item.name,
                                    }}
                                >
                                    <div 
                                        style={{ 
                                            maxWidth: '100%', 
                                            height: '340px',
                                            backgroundImage: `url(${imageBase64})`,
                                            backgroundPosition: '0% 0%',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    ></div>
                                </Link>
                            </div>        
                            <div className='product-img product-img-second'>
                                <Link 
                                    to={`${path.PRODUCT}/${item.name}`} 
                                    state={{ 
                                        productId: item.id,
                                        productName: item.name,
                                    }}
                                >
                                    <div 
                                        style={{ 
                                            maxWidth: '100%', 
                                            height: '340px',
                                            backgroundImage: `url(${imageHoverBase64})`,
                                            backgroundPosition: '0% 0%',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    ></div>
                                </Link>
                            </div>           
                            <div className='product-infor text-center'>
                                <span className='brand'>{item.dataBrand.valueEn}</span>    
                                <h4 className='product-name'>
                                    <Link 
                                        to={`${path.PRODUCT}/${item.name}`} 
                                        state={{ 
                                            productId: item.id,
                                            productName: item.name,
                                        }}
                                    >{item.name}</Link>
                                </h4>
                                <span className='product-price'>{price}</span>
                            </div>          
                        </div>
                    )
                })
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        // productFavourites: state.product.productFavourtie,
        productFavourites: state.fouriteProduct.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ListProducts));