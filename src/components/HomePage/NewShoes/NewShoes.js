import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './NewShoes.scss'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path, categorieType } from '../../../utils';
import { useState } from 'react';
import Product from '../../common/products/Product'

function NewShoes({products, images, isLoadingProduct}) {
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
                        <Product products={shoes} images={images} col='col-3'/>
                    </div>
                    <div className='view-all text-center'>
                        <Link to={path.GIAY_MLB}>Xem tất cả</Link>
                    </div>
                </div>  
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        products: state.product.products,
        images: state.product.images,
        isLoadingProduct: state.product.isLoadingProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewShoes);
