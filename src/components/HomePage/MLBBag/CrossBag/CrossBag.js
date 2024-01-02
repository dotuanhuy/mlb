import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { categorieType } from '../../../../utils';
import Product from '../../../common/products/Product';

function CrossBag({products, images}) {
    const [bagBalo, setbagBalo] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            let arr = products.filter(item => item.dataCategory.type === categorieType.BAG_BALO)
            let newArr = arr.filter(item => item.name.includes('Cross Bag'))
            setbagBalo(newArr)
        }
    }, [products])

    return (
        <div className='menu-product row'>
            <Product products={bagBalo} images={images} col='col-3'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CrossBag);
