import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import ListProducts from '../../../../components/clients/listProducts/ListProducts';

function MLBOutfitChild({ productTypeName }) {
    const { products } = useSelector(state => state.product)
    const [outfit, setOutfit] = useState([])

    useEffect(() => {
        if (products && products?.clothes?.length > 0) {
            const arr = products?.clothes?.filter(item => item?.dataProductType?.name === productTypeName)
            setOutfit(arr)
        }
    }, [productTypeName, products])

    return (
        <div className='menu-product row'>
            <ListProducts products={outfit} col='col-3' />
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

export default connect(mapStateToProps, mapDispatchToProps)(MLBOutfitChild);
