import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './NewShoes.scss'
import { Link } from 'react-router-dom';
import { path, categorieType, LIMIT_HOME_SHOES, limit_page } from '../../../utils';
import { useState } from 'react';
import ListProducts from '../../common/listProducts/ListProducts'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '../../common/Loading/Loading';

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

function NewShoes() {
    const dispatch = useDispatch()
    const { products, isLoading } = useSelector(state => state.product)
    const [shoes, setShoes] = useState([])

    // useEffect(() => {
    //     if (products && products.length > 0) {
    //         let arr = products.filter(item => item?.dataCategoryDetail?.dataCategory?.type === categorieType.SHOES_SANDAL)
    //         setShoes(arr)
    //     }
    // }, [products])

    useEffect(() => {
        dispatch(actions.getLimitProductByOption({ optionType: categorieType.SHOES_SANDAL }, 1, 'default', LIMIT_HOME_SHOES))
    }, [])

    // const fetchMoreData = () => {
    //     console.log('check');
    //     dispatch(actions.getLimitProductByOption({ optionType: 'GS' }, 1, 'default', 4))

    // }

    return (
        <div className='newShoes'>
            <div className='newShoes-container px-4'>
                <div className='title text-center'>
                    <h2 className='title-newshoes mb-4'>
                        <a href='#'>NEW SHOES</a>
                    </h2>
                    <p>Những phiên bản <Link to={path.GIAY_MLB}>Giày MLB</Link> mới nhất tại Việt Nam</p>
                </div>
                <div className='menu-box'>
                    <div className='menu-product row'>
                        {
                            isLoading ? 
                            <Loading />
                            :
                            <ListProducts products={products} col='col-3' />
                        }
                    </div>
                    <div className='view-all text-center'>
                        <Link to={path.GIAY_MLB}>Xem tất cả</Link>
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
