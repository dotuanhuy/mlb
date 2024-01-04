import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { categorieType } from '../../../../utils';
import ListProducts from '../../../common/listProducts/ListProducts';

function HoboBag({products, images}) {
    const [bagBalo, setbagBalo] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            let arr = products.filter(item => item.dataCategory.type === categorieType.BAG_BALO)
            let newArr = arr.filter(item => item.name.includes('Hobo Bag'))
            setbagBalo(newArr)
        }
    }, [products])

    return (
        <div className='menu-product row'>
            <ListProducts products={bagBalo} images={images} col='col-3'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HoboBag);
