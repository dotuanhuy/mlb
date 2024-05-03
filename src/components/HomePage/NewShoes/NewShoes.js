import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../styles/mlb.scss'
import { Link } from 'react-router-dom';
import { path } from '../../../utils';
import ListProducts from '../../common/listProducts/ListProducts'
import { useSelector } from 'react-redux';

function NewShoes() {
    const { products } = useSelector(state => state.product)
    const [shoes, setShoes] = useState([])

    useEffect(() => {
        if (products) {
            setShoes(products?.shoes)
        }
    }, [products])

    return (
        <div className='mb-5'>
            <div className='px-4'>
                <div className='text-center'>
                    <h2 className='title-option-homepage mb-4'>
                        <Link className='position-relative' to={path.GIAY_MLB}>NEW SHOES</Link>
                    </h2>
                    <p className='fw-bold fs-16 text-muted'>Những phiên bản <Link className='text-decoration-underline text-color-root-dark' to={path.GIAY_MLB}>Giày MLB</Link> mới nhất tại Việt Nam</p>
                </div>
                <div className='menu-box'>
                    <div className='menu-product row'>
                        <ListProducts products={shoes} col='col-3' />
                    </div>
                    <div className='text-center mt-5'>
                        <Link 
                            to={path.GIAY_MLB}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewShoes);
