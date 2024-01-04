import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { categorieType } from '../../../../utils';
import ListProducts from '../../../common/listProducts/ListProducts';

function TShirt({products, images}) {
    const [tShirt, settShirt] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            let arr = products.filter(item => item.dataCategory.type === categorieType.CLOTHES)
            let newArr = arr.filter(item => item.name.includes('Áo'))
            settShirt(newArr)
        }
    }, [products])

    return (
        <div className='menu-product row'>
            <ListProducts products={tShirt} images={images} col='col-3'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(TShirt);
