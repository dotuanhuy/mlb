import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar/Navbar'
import SliderHomePage from './Slider/SliderHomePage';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage({isURLLogin}) {
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
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isURLLogin: state.isURLLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
