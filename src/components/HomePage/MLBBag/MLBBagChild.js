import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import ListProducts from '../../common/listProducts/ListProducts';

function MLBBagChild({productTypeName}) {
    const { products } = useSelector(state => state.product)
    const [bagBalo, setbagBalo] = useState([])
    
    useEffect(() => {
        if (products && products?.bags?.length > 0) {
            const arr = products?.bags?.filter(item => item?.dataProductType?.name === productTypeName)
            setbagBalo(arr)
        }
    }, [productTypeName, products])
    
    return (
        <div className='menu-product row'>
            <ListProducts products={bagBalo} col='col-3'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MLBBagChild);
