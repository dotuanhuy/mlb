import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar/Navbar'
import SliderHomePage from './Slider/SliderHomePage';
import './HomePage.scss'
import Intro from './Intro/Intro';
import NewShoes from './NewShoes/NewShoes';
import MLBBag from './MLBBag/MLBBag';
import MLBOutfit from './MLBOutfit/MLBOutfit';
import MLBBackPack from './MLBBackPack/MLBBackPack';
import HomeFooter from './HomeFooter/HomeFooter';
import * as actions from '../../store/actions'
import jwt_decode from 'jwt-decode';
import Loading from '../common/Loading/Loading';
import { useDispatch } from 'react-redux';

function HomePage({ 
    titlePage,
    isLoading,
    refreshIsloadingStateProductRedux,
    getAllProductPublicRedux, 
}) {
    const accessToken = window.localStorage.getItem('accessToken')
    const dispatch = useDispatch()
    
    useEffect(() => {
        document.title = titlePage
        // refreshIsloadingStateProductRedux()
        // getAllProductPublicRedux(accessToken)
        // dispatch(actions.refreshIsloadingStateProduct())
        // dispatch(actions.getAllProductPublic())
        
        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
    }, [])
    
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
            {/* {
                isLoading ? 
                <Loading />
                : */}
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
            {/* } */}
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
