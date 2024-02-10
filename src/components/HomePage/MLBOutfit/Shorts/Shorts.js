import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { categorieType } from '../../../../utils';
import ListProducts from '../../../common/listProducts/ListProducts';

function Shorts({products}) {
    const [tShirt, settShirt] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            let arr = products.filter(item => item?.dataCategoryDetail?.dataCategory?.type === categorieType.CLOTHES)
            let newArr = arr.filter(item => item.name.includes('Quần Shorts'))
            settShirt(newArr)
        }
    }, [products])
    
    return (
        <div className='menu-product row'>
            <ListProducts products={tShirt} col='col-3'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Shorts);
