import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { categorieType } from '../../../../utils';
import Product from '../../../common/products/Product';

function SkirtDress({products, images}) {
    const [tShirt, settShirt] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            let arr = products.filter(item => item.dataCategory.type === categorieType.CLOTHES)
            let newArr = arr.filter(item => item.name.includes('Đầm') || item.name.includes('Váy'))
            settShirt(newArr)
        }
    }, [products])
    return (
        <div className='menu-product row'>
            <Product products={tShirt} images={images} col='col-3'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SkirtDress);
