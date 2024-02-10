import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './MLBBackPack.scss'
import { Link } from 'react-router-dom';
// import * as actions from '../../../store/actions'
import { path, typeBagBalo } from '../../../utils';
import { categorieType } from '../../../utils';
import ListProducts from '../../common/listProducts/ListProducts';


function MLBBackPack({products}) {
    const [backPack, setbackPack] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            let arr = products.filter(item => item?.dataCategoryDetail?.dataCategory?.type === categorieType.BAG_BALO)
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
                        <ListProducts products={backPack} col='col-3'/>
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
