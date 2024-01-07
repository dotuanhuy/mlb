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

function HomePage({ 
    accessToken, 
    productFavourites,
    isLoading,
    getAllProductPublicRedux, 
    fetchAllImageProductRedux,
    getAllProductsFavouriteRedux, 
    refreshIsloadingStateProductRedux
}) {

    useEffect(() => {
        refreshIsloadingStateProductRedux()
        getAllProductPublicRedux(accessToken)
        fetchAllImageProductRedux(accessToken)

        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        if (userId) {
            getAllProductsFavouriteRedux(accessToken, userId)
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
            {
                isLoading ? 
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
        accessToken: state.auth.token,
        images: state.product.images,
        productFavourites: state.product.productFavourtie,
        isLoading: state.product.isLoadingProduct,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProductPublicRedux: (accessToken) => dispatch(actions.getAllProductPublic(accessToken)),
        fetchAllImageProductRedux: (accessToken) => dispatch(actions.fetchAllImageProduct('', accessToken)),
        getAllProductsFavouriteRedux: (accessToken, userId) => dispatch(actions.getAllProductsFavourite(accessToken, userId)),
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(HomePage));
