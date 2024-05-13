import React, { useEffect, memo } from 'react';
import { connect, useSelector } from 'react-redux';
import Navbar from './Navbar/Navbar'
import SliderHomePage from './Slider/SliderHomePage';
import Intro from './Intro/Intro';
import NewShoes from './NewShoes/NewShoes';
import MLBBag from './MLBBag/MLBBag';
import MLBOutfit from './MLBOutfit/MLBOutfit';
import MLBBackPack from './MLBBackPack/MLBBackPack';
import HomeFooter from './HomeFooter/HomeFooter';
import * as actions from '../../store/actions'
import { useDispatch } from 'react-redux';
import { AES, enc } from 'crypto-js';
import { KEY_ORDERID } from '../../utils';
import Loading from '../common/Loading/Loading'

function HomePage({ titlePage }) {
    const dispatch = useDispatch()
    const { listId } = useSelector(state => state.order)
    const { products } = useSelector(state => state.product)
    
    useEffect(() => {
        document.title = titlePage
        dispatch(actions.getListOrderId())
        dispatch(actions.getAllProductPublic())
    }, [])

    useEffect(() => {
        if (listId) {
            const encrypted  = AES.encrypt(listId.toString(), KEY_ORDERID)
            window.localStorage.setItem('orderId', encrypted)
        }
    }, [listId])

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div
                style={{
                borderRadius: "10px",
                padding: "10px",
                transform: "translateY(10px)"
                }}
            >
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
    }

    return (
        <>
            {
                !products ? 
                <Loading />
                :
                <div>
                    <Navbar />
                    <SliderHomePage settings={settings} />
                    <Intro />
                    <NewShoes />
                    <MLBBag />
                    <MLBOutfit />
                    <MLBBackPack />
                    <HomeFooter />
                </div>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLoading: state.product.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
        getAllProductPublicRedux: () => dispatch(actions.getAllProductPublic()),
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(HomePage));
