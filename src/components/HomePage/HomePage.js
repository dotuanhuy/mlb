import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar/Navbar'
import SliderHomePage from './Slider/SliderHomePage';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Intro from './Intro/Intro';
import NewShoes from './NewShoes/NewShoes';
import MLBBag from './MLBBag/MLBBag';
import MLBOutfit from './MLBOutfit/MLBOutfit';
import MLBBackPack from './MLBBackPack/MLBBackPack';
import HomeFooter from './HomeFooter/HomeFooter';
import * as actions from '../../store/actions'

function HomePage({ accessToken, products, getAllProductsRedux, getAllProductPublicRedux, fetchAllImageProductRedux }) {
  useEffect(() => {
    getAllProductPublicRedux(accessToken)
    fetchAllImageProductRedux(accessToken)
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
        <div>
            <Navbar />
            <SliderHomePage settings={settings}/>
            <Intro />
            <NewShoes />
            <MLBBag />
            <MLBOutfit />
            <MLBBackPack />
            <HomeFooter />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        products: state.product.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getAllProductsRedux: (type, accessToken) => dispatch(actions.getAllProducts(type, accessToken)),
      getAllProductPublicRedux: (accessToken) => dispatch(actions.getAllProductPublic(accessToken)),
      fetchAllImageProductRedux: (accessToken) => dispatch(actions.fetchAllImageProduct('', accessToken))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(HomePage));
