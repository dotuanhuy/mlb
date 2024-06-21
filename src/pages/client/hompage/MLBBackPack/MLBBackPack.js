import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../styles/mlb.scss'
import { Link } from 'react-router-dom';
import { path, typeBagBalo } from '../../../../utils';
import ListProducts from '../../../../components/clients/listProducts/ListProducts';

function MLBBackPack({ products }) {
    const [backPack, setbackPack] = useState([])

    useEffect(() => {
        if (products) {
            setbackPack(products?.bags)
        }
    }, [products])

    return (
        <div className='mlbbackpack pb-5 mb-5' style={{ background: '#f6f6f6' }}>
            <div className='mlbbackpack-container px-4'>
                <div className='text-center py-5'>
                    <h2 className='title-option-homepage mb-4'>
                        <Link className='position-relative' to={path.BACKPACK} state={{ typeName: typeBagBalo.BACKPACK }}>MLB BAG</Link>
                    </h2>
                    <p className='fw-bolder fs-16 text-muted'>Túi-balo mới nhất tại <Link className='text-decoration-underline text-color-root-dark' to={path.BACKPACK} state={{ typeName: typeBagBalo.BACKPACK }}>MLB Việt Nam</Link></p>
                </div>
                <div className='menu-box'>
                    <div className='menu-product row'>
                        <ListProducts products={backPack} col='col-3' />
                    </div>
                    <div className='text-center mt-5'>
                        <Link
                            to={path.TUI_MLB}
                            className='btn btn-root py-3 px-5 fw-500 fs-16'
                        >Xem tất cả</Link>
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
